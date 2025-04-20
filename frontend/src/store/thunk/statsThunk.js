import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../lib/axios"

export const getStats = createAsyncThunk(
  "stats/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/admin/getStats")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getSalesAnalytics = createAsyncThunk(
  "stats/getSalesAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/admin/salesAnalytics")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
