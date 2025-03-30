"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/Dialog"
import { Button } from "@/components/Button"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth"
import { useUserStore } from "@/store/user-store"
import { useBookingStore } from "@/store/booking-store"
import type { CreateBooking } from "@/types/types"
import { combineDateAndTime } from "@/lib/date-time"
import { useBooking } from "@/hooks/useBooking"

interface ButtonProps {
  disabled: boolean
}

export function BookButton({ disabled }: ButtonProps) {
  const [view, setView] = useState<"login" | "register">("login")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const { login } = useAuth()
  const router = useRouter()
  const { signInWithGoogle, loading: googleLoading, user: supabaseUser } = useSupabaseAuth()
  const { setUser, user } = useUserStore()
  const {
    selectedDate,
    selectedEngineer,
    selectedStudio,
    selectedServices,
    timeFrom,
    timeTo,
    saveBookingToLocalStorage,
  } = useBookingStore()
  const { createBooking } = useBooking()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await login(formData)
    if (response?.user.role) {
      setUser({ ...response.user })
      await handleSubmitBooking()
      router.push("/dashboard")
    }
  }

  const handleGoogleSignIn = async () => {
    // Save booking data to localStorage before redirecting
    saveBookingToLocalStorage()

    // Pass true to indicate we should create a booking after successful login
    await signInWithGoogle(true)
    // Note: The code execution will stop here as the user is redirected to Google
  }

  const handleButtonClick = async () => {
    if (user.id) {
      await handleSubmitBooking()
      router.push("/dashboard")
    }
  }

  const handleSubmitBooking = async () => {
    const userId = user.id || supabaseUser?.id || ""
    if (!userId) {
      console.error("No user ID available for booking")
      return null
    }

    const booking: CreateBooking = {
      userId,
      fonicoId: selectedEngineer || "",
      studioId: selectedStudio,
      start: combineDateAndTime(selectedDate, timeFrom),
      end: combineDateAndTime(selectedDate, timeTo),
      services: selectedServices,
    }

    console.log("Creating booking:", booking)
    return await createBooking(booking)
  }

  const handleSubmitAnonymousBooking = async () => {
    await handleSubmitBooking()
    router.push("/")
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="gradient" onClick={handleButtonClick} disabled={disabled}>
            Richiedi prenotazione
          </Button>
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <div className="grid gap-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {view === "login" ? "Accedi al tuo account" : "Crea un account"}
              </h1>
              <p className="text-sm text-gray-500">
                {view === "login"
                  ? "Inserisci le tue credenziali per accedere"
                  : "Inserisci i tuoi dati per registrarti"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {view === "register" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Nome
                  </label>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="username"
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="nome@esempio.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" variant="gradient" color="black" className="w-full">
                {view === "login" ? "Accedi" : "Registrati"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">O continua con</span>
              </div>
            </div>

            <GoogleSignInButton onClick={handleGoogleSignIn} isLoading={googleLoading} />

            <div className="text-center text-sm">
              {view === "login" ? (
                <>
                  Non hai un account?{" "}
                  <button className="text-blue-600 hover:underline" onClick={() => setView("register")}>
                    Registrati
                  </button>
                </>
              ) : (
                <>
                  Hai già un account?{" "}
                  <button className="text-blue-600 hover:underline" onClick={() => setView("login")}>
                    Accedi
                  </button>
                </>
              )}
            </div>
          </div>
          <DialogClose className="w-full flex flex-col items-center" onClick={handleSubmitAnonymousBooking}>
            <p className="underline">Continua senza accedere</p>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

