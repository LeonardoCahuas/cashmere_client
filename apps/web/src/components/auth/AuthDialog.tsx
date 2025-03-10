"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../Dialog"
import { Button } from "../Button"
import { UserIcon } from "../icons/User"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { GoogleSignInButton } from "../GoogleSignInButton"
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth"
import { useUserStore } from "@/store/user-store"

export function AuthDialog() {
  const [view, setView] = useState<"login" | "register">("login")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const { login } = useAuth()
  const router = useRouter()
  const { signInWithGoogle, loading: googleLoading } = useSupabaseAuth()
  const { setUser } = useUserStore()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("ciao")
    const response = await login(formData)
    if (response?.user.role) {
      setUser({ ...response.user })
      router.push("/dashboard")
    }
  }
  const handleGoogleSignIn = async () => {
    console.log("provo")
    await signInWithGoogle()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" color="black">
          <UserIcon /> Accedi o registrati
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
              <span className="bg-white px-2 text-gray-500">
                O continua con
              </span>
            </div>
          </div>

          <GoogleSignInButton onClick={handleGoogleSignIn} isLoading={googleLoading} />

          <div className="text-center text-sm">
            {view === "login" ? (
              <>
                Non hai un account?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setView("register")}
                >
                  Registrati
                </button>
              </>
            ) : (
              <>
                Hai già un account?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setView("login")}
                >
                  Accedi
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
