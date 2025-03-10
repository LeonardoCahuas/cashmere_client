'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthCallback } from "@/hooks/useAuthCallback"
import { useUserStore } from "@/store/user-store"
import { useBookingStore } from "@/store/booking-store"
import { useBooking } from "@/hooks/useBooking"
import { CreateBooking } from "@/types/types"
import { combineDateAndTime } from "@/lib/date-time"

export default function AuthCallbackPage() {
    const router = useRouter()
    const { processAuthCallback } = useAuthCallback()
    const { setUser } = useUserStore()
    const { selectedEngineer, selectedDate, selectedServices, selectedStudio, timeFrom, timeTo } = useBookingStore()
    const { createBooking} = useBooking()

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const { user } = await processAuthCallback()

                if (user) {
                    setUser(user)
                }

                // Gestisci il redirect basato su selectedEngineer
                if (selectedEngineer) {
                    const booking: CreateBooking = {
                        userId: user?.id,
                        start: combineDateAndTime(selectedDate, timeFrom),
                        end: combineDateAndTime(selectedDate, timeTo),
                        studioId:selectedStudio,
                        fonicoId: selectedEngineer,
                        services: selectedServices
                    }
                    createBooking(booking)
                    router.push(user ? "/book/dashboard" : "/")
                } else {
                    router.push(("/dashboard"))
                }
            } catch (error) {
                console.error("Callback error:", error)
                router.push("/login?error=auth-error")
            }
        }

        handleCallback()
    }, [processAuthCallback, router, setUser, selectedEngineer])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
    )
}