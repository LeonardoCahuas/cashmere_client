"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth"
import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { session, loading } = useSupabaseAuth()

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login")
    }
  }, [session, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}

