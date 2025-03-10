import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { UserSession, Session, AuthError } from "@/types/auth"
import type { User } from '@supabase/supabase-js'

export const useSupabaseAuth = () => {
    const router = useRouter()
    const [session, setSession] = useState<UserSession | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<AuthError | null>(null)

    // Funzione helper per convertire la sessione Supabase nel nostro formato
    const formatSession = (user: User | null, supabaseSession: Session | null): UserSession => ({
        user,
        session: supabaseSession ? {
            ...supabaseSession,
            provider_token: supabaseSession.provider_token || undefined
        } : null
    })

    useEffect(() => {
        let mounted = true

        // Get initial session
        const initSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                
                if (error) throw error
                
                if (mounted) {
                    setSession(formatSession(session?.user ?? null, session))
                    setLoading(false)
                }
            } catch (err: any) {
                console.error('Error getting session:', err)
                if (mounted) {
                    setError({
                        message: err.message || 'Error initializing session',
                        status: err.status
                    })
                    setLoading(false)
                }
            }
        }

        initSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (mounted) {
                console.log('Auth state changed:', event)
                setSession(formatSession(session?.user ?? null, session))
                
                // Gestisci eventi specifici
                switch (event) {
                    case 'SIGNED_IN':
                        // Salva informazioni aggiuntive dell'utente se necessario
                        if (session?.user) {
                            try {
                                const { error } = await supabase
                                    .from('users')
                                    .upsert({
                                        id: session.user.id,
                                        email: session.user.email,
                                        updated_at: new Date().toISOString(),
                                    })
                                if (error) throw error
                            } catch (err) {
                                console.error('Error updating user data:', err)
                            }
                        }
                        break
                    case 'SIGNED_OUT':
                        router.push('/login')
                        break
                }
                
                setLoading(false)
            }
        })

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
    }, [router, formatSession]) // Added formatSession to dependencies

    const signInWithGoogle = async () => {
        console.log("Initiating Google sign in...")
        try {
            setError(null)
            setLoading(true)

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            })

            if (error) throw error

            console.log("Google sign in successful:", data)
            return data
        } catch (err: any) {
            console.error("Google sign in error:", err)
            setError({
                message: err.message || "Error signing in with Google",
                status: err.status,
            })
            return null
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => {
        try {
            setError(null)
            setLoading(true)

            const { error } = await supabase.auth.signOut()
            if (error) throw error

            setSession(null)
            router.push("/login")
        } catch (err: any) {
            console.error("Sign out error:", err)
            setError({
                message: err.message || "Error signing out",
                status: err.status,
            })
        } finally {
            setLoading(false)
        }
    }

    // Aggiungi una funzione per ottenere i dati dell'utente corrente
    const getCurrentUser = () => session?.user || null

    return {
        session,
        user: getCurrentUser(),
        loading,
        error,
        signInWithGoogle,
        signOut,
    }
}
