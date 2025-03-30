'use client'

import { useState } from "react"
import type { ApiError } from "@/types/auth"
import type { CreateBooking, StateType } from "@/types/types"
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

    const getEngineerBookings = async (id: string) => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await bookingApi.getFonicoBookings(id)
            return response
        } catch (err) {
            setError(err as ApiError)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const getUserBookings = async (id: string) => {
      try {
          setIsLoading(true)
          setError(null)
          const response = await bookingApi.getUserBookings(id)
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

    const updateBookingState = async (id: string, state: StateType) => {
        console.log(id)
        try {
            setIsLoading(true)
            setError(null)
            const response = await bookingApi.updateState(id, state)
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

    const getAvailableEngineers = async (start: Date, end: Date) => {
        try {
          setIsLoading(true)
          setError(null)
          const response = await bookingApi.getAvailableEngineers(start, end)
          return response
        } catch (err) {
          setError(err as ApiError)
          return null
        } finally {
          setIsLoading(false)
        }
      }
    
    const getCurrentBookings = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await bookingApi.getCurrentBookings()
            return response
        } catch (err) {
            setError(err as ApiError)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const getAvailableTimeSlots = async (studioId: string, fonicoId: string) => {
        try {
          setIsLoading(true)
          setError(null)
          const response = await bookingApi.getAvailableTimeSlots(studioId, fonicoId)
          return response
        } catch (err) {
          setError(err as ApiError)
          return null
        } finally {
          setIsLoading(false)
        }
      }

      const getAvailableStudios = async (start: Date, end: Date) => {
        try {
          setIsLoading(true)
          setError(null)
          const response = await bookingApi.getAvailableStudio(start, end)
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
        getAvailableEngineers,
        deleteBooking,
        getToConfirm,
        getUserBookings,
        getAvailableStudios,
        getEngineerBookings,
        getAvailableTimeSlots,
        getCurrentBookings,
        updateBookingState,
        isLoading,
        error,
    }
}