'use client'

import { useState } from "react"
import { authApi } from "@/api/auth"
import type { LoginRequest, LoginResponse, ApiError, GooGleLoginDTO } from "@/types/auth"
import { useRouter } from "next/navigation"

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const router = useRouter()

  const login = async (credentials: LoginRequest): Promise<LoginResponse | null> => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await authApi.login(credentials)

      if (response?.user.role) {
        if (!response.user.id) {
          router.push("/auth/callback/1")
        }
      }

      return response
    } catch (err) {
      setError(err as ApiError)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const googleLogin = async (data: GooGleLoginDTO): Promise<LoginResponse | null> => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await authApi.googleLogin(data)
      return response
    } catch (err) {
      setError(err as ApiError)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    googleLogin,
    isLoading,
    error,
  }
}