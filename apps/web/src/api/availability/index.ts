import type { CreateBooking } from "@/types/types"
import api from "@/lib/axios"
import axios from "axios"
import { AvailabilityCreateRequest } from "@/types/availability"
import { User } from "@/types/auth"

export class AvailabilityApi {
  private static instance: AvailabilityApi
  private readonly BASE_PATH = "/availability"

  private constructor() { }

  public static getInstance(): AvailabilityApi {
    if (!AvailabilityApi.instance) {
      AvailabilityApi.instance = new AvailabilityApi()
    }
    return AvailabilityApi.instance
  }

  async create(availability: AvailabilityCreateRequest, user: User): Promise<any> {
    try {
      const response = await api.post<any>(`${this.BASE_PATH}`, availability, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Availability creation failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    }
  }
}

export const availabilityApi = AvailabilityApi.getInstance()