import type { BookingState, CreateBooking, StateType } from "@/types/types"
import api from "@/lib/axios"
import axios from "axios"
import { User } from "@/store/user-store"

export class BookingApi {
  private static instance: BookingApi
  private readonly BASE_PATH = "/booking"

  private constructor() { }

  public static getInstance(): BookingApi {
    if (!BookingApi.instance) {
      BookingApi.instance = new BookingApi()
    }
    return BookingApi.instance
  }

  async create(booking: CreateBooking, user: User): Promise<any> {
    console.log(booking)
     try {
      const response = await api.post<any>(`${this.BASE_PATH}`, booking, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Booking creation failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    } 
  }

  async getAll(): Promise<any> {
     try {
      const response = await api.get<any>(`${this.BASE_PATH}`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || " get Booking failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    } 
  }

  async getAvailableEngineers(start: Date, end: Date): Promise<any> {
    try {
      const response = await api.get<any>(`${this.BASE_PATH}/available-engineers`, {
        params: { start, end },
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Get available engineers failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    }
  }

  async getFonicoBookings(id: string): Promise<any> {
    try {
     const response = await api.get<any>(`${this.BASE_PATH}/fonico/${id}`, {
       headers: {
         "Cache-Control": "no-cache",
       },
     })
     console.log(response.data)
     return response.data
   } catch (error) {
     console.log(error)
     if (axios.isAxiosError(error)) {
       throw {
         message: error.response?.data?.message || " get Booking failed",
         statusCode: error.response?.status || 500,
       }
     }
     throw error
   } 
 }

 async getUserBookings(id: string): Promise<any> {
  try {
   const response = await api.get<any>(`${this.BASE_PATH}/user/${id}`, {
     headers: {
       "Cache-Control": "no-cache",
     },
   })
   console.log(response.data)
   return response.data
 } catch (error) {
   console.log(error)
   if (axios.isAxiosError(error)) {
     throw {
       message: error.response?.data?.message || " get Booking failed",
       statusCode: error.response?.status || 500,
     }
   }
   throw error
 } 
}
  async getAvailableTimeSlots(studioId: string, fonicoId: string): Promise<any> {
    try {
      const response = await api.get<any>(`${this.BASE_PATH}/available-slots`, {
        params: { studioId, fonicoId },
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Get available time slots failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    }
  }

  async getAvailableStudio(start: Date, end: Date): Promise<any> {
    try {
      const response = await api.get<any>(`${this.BASE_PATH}/available-studios`, {
        params: { start, end },
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Get available time slots failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    }
  }

  async getCurrentBookings(): Promise<any> {
    try {
      const response = await api.get<any>(`${this.BASE_PATH}/current`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Get current bookings failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    }
  }

  async update(id: string, updatedBooking: Partial<CreateBooking>): Promise<any> {
    console.log(id)
    try {
      const response = await api.put<any>(`${this.BASE_PATH}/${id}`, updatedBooking, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Booking update failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const response = await api.delete<any>(`${this.BASE_PATH}/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Booking deletion failed",
          statusCode: error.response?.status || 500,
        };
      }
      throw error;
    }
  }

 async getToConfirm(): Promise<any> {
  try {
   const response = await api.get<any>(`${this.BASE_PATH}/confirm`, {
     headers: {
       "Cache-Control": "no-cache",
     },
   })
   console.log(response.data)
   return response.data
 } catch (error) {
   console.log(error)
   if (axios.isAxiosError(error)) {
     throw {
       message: error.response?.data?.message || " get Booking failed",
       statusCode: error.response?.status || 500,
     }
   }
   throw error
 } 
}

async updateState(id: string, state: StateType): Promise<any> {
  console.log(id)
  try {
    const response = await api.put<any>(`${this.BASE_PATH}/${id}/${state}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Booking update failed",
        statusCode: error.response?.status || 500,
      }
    }
    throw error
  }
}
}

export const bookingApi = BookingApi.getInstance()