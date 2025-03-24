'use client'

import { useState } from "react"
import type { ApiError } from "@/types/auth"
import { userApi } from "@/api/user"

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [engineers, setEngineers] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])

  const getEngineers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await userApi.getEngineers()
      setEngineers(response)
      return response
    } catch (err) {
      setError(err as ApiError)  // Handle any errors
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const getUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await userApi.getUsers()  // Call to the API to get engineers
      setUsers(response)  // Store the fetched engineers data
      return response
    } catch (err) {
      setError(err as ApiError)  // Handle any errors
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    engineers,  // Expose engineers data to the components that use this hook
    getEngineers,
    getUsers,
    isLoading,
    error,
  }
}
