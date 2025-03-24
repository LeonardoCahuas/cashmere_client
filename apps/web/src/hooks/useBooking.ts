'use client'

import { useState } from "react"
import type { ApiError } from "@/types/auth"
import type { CreateBooking } from "@/types/types"
import { bookingApi } from "@/api/booking"
import { useUserStore } from "@/store/user-store"

export const useBooking = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const { user } = useUserStore()
    
    const createBooking = async (booking: CreateBooking) => {
        try {
            setIsLoading(true)
            setError(null)
            console.log(user)
            const response = await bookingApi.create(booking, user)
            return response
        } catch (err) {
            setError(err as ApiError)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const getAll = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await bookingApi.getAll()
            return response
        } catch (err) {
            setError(err as ApiError)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const updateBooking = async (id: string, updatedData: Partial<CreateBooking>) => {
        console.log(id)
        try {
            setIsLoading(true)
            setError(null)
            const response = await bookingApi.update(id, updatedData)
            return response
        } catch (err) {
            setError(err as ApiError)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const deleteBooking = async (id: string) => {
        try {
          setIsLoading(true);
          setError(null);
          const response = await bookingApi.delete(id);
          return response;
        } catch (err) {
          setError(err as ApiError);
          return null;
        } finally {
          setIsLoading(false);
        }
      };

      const getToConfirm = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await bookingApi.getToConfirm()
            return response
        } catch (err) {
            setError(err as ApiError)
            return null
        } finally {
            setIsLoading(false)
        }
    }
    

    return {
        getAll,
        createBooking,
        updateBooking,
        deleteBooking,
        getToConfirm,
        isLoading,
        error,
    }
}