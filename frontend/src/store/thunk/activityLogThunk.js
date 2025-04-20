import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../lib/axios"

export const getActivityLog = createAsyncThunk(
  "activityLog/getActivityLog",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get(
        `/admin/activityLog?page=${page}&limit=${limit}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getLatestActivities = createAsyncThunk(
  "stats/getLatestActivities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/admin/latestActivities")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
