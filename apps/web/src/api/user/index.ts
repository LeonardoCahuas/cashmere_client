import api from "@/lib/axios"
import axios from "axios"

export class UserApi {
  private static instance: UserApi
  private readonly BASE_PATH = "/users"

  private constructor() { }

  public static getInstance(): UserApi {
    if (!UserApi.instance) {
        UserApi.instance = new UserApi()
    }
    return UserApi.instance
  }

  async getEngineers(): Promise<any> {
    try {
      const response = await api.get<any>(`${this.BASE_PATH}/role/engineer`, {
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
          message: error.response?.data?.message || "Get engineers failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    }
  }

  async getUsers(): Promise<any> {
    try {
      const response = await api.get<any>(`${this.BASE_PATH}/role/user`, {
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
          message: error.response?.data?.message || "Get engineers failed",
          statusCode: error.response?.status || 500,
        }
      }
      throw error
    }
  }
  
}

export const userApi = UserApi.getInstance()