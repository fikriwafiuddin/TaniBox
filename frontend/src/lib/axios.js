import axios from "axios"
import { BASE_URL, KEY_TOKEN } from "../constant"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

export const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
})

axiosAuthInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(KEY_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response.status
    if (status === 401) {
      console.error("Unauthorized! Redirecting to login...")
      localStorage.removeItem(KEY_TOKEN)
    } else if (status === 500) {
      console.error("Internal Server Error (500)! Redirecting...")
      window.location.href = "/error-500"
    }
    return Promise.reject(error)
  }
)
