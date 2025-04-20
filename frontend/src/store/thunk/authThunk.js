import { createAsyncThunk } from "@reduxjs/toolkit"
import { KEY_TOKEN } from "../../constant"
import { axiosAuthInstance, axiosInstance } from "../../lib/axios"

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", data)
      localStorage.setItem(KEY_TOKEN, response.data.data.token)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/register", data)
      localStorage.setItem(KEY_TOKEN, response.data.data.token)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(KEY_TOKEN)
      if (!token) return rejectWithValue({ message: "Unauthorized" })

      const response = await axiosAuthInstance.get("/getMe")
      localStorage.setItem(KEY_TOKEN, response.data.data.token)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const logout = createAsyncThunk("user/logout", () =>
  localStorage.removeItem(KEY_TOKEN)
)
