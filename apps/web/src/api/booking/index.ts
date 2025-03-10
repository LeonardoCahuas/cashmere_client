import type { CreateBooking } from "@/types/types"
import api from "@/lib/axios"
import axios from "axios"
import { User } from "@/store/user-store"

export class BookingApi {
  private static instance: BookingApi
  private readonly BASE_PATH = "/booking"

  private constructor() {}

  public static getInstance(): BookingApi {
    if (!BookingApi.instance) {
      BookingApi.instance = new BookingApi()
    }
    return BookingApi.instance
  }

  async create(booking: CreateBooking, user: User): Promise<any> {
    console.log(booking)
    console.log(user)
    try {
      const response = await api.post<any>(`${this.BASE_PATH}`, booking, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      console.log(response)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Booking creation failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    }
  }
}

export const bookingApi = BookingApi.getInstance()