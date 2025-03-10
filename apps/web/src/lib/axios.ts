import axios from "axios"

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "Content-Type": "application/json",
  },
  // Importante: abilita la gestione dei cookie
  withCredentials: true,
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Redirect to login page or handle session expiration
      // You might want to dispatch a logout action or redirect to login
      //window.location.href = '/login'

      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export default api