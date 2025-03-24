'use client'

import { useState } from "react"
import type { ApiError, User } from "@/types/auth"
import type { CreateBooking } from "@/types/types"
import { bookingApi } from "@/api/booking"
import { useUserStore } from "@/store/user-store"
import { AvailabilityCreateRequest } from "@/types/availability"
import { availabilityApi } from "@/api/availability"

export const useBooking = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const { user } = useUserStore()

  const createAvailability = async (availability: AvailabilityCreateRequest, user: User) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await availabilityApi.create(availability, user)
      return response
    } catch (err) {
      setError(err as ApiError)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createAvailability,
    isLoading,
    error,
  }
}