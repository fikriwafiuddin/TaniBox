import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../lib/axios"

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/admin/getUsers")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
