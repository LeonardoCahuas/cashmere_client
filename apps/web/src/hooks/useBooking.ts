'use client'

import { useState } from "react"
import type { ApiError } from "@/types/auth"
import type { CreateBooking } from "@/types/types"
import { bookingApi } from "@/api/booking"
import { useUserStore } from "@/store/user-store"

export const useBooking = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const { user} = useUserStore()
    
    const createBooking = async (booking: CreateBooking) => {
        try {
            setIsLoading(true)
            setError(null)
            console.log(user)
            const response = await bookingApi.create(booking, user.id)
            return response
        } catch (err) {
            setError(err as ApiError)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    return {
        createBooking,
        isLoading,
        error,
    }
}