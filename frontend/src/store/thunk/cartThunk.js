import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../lib/axios"

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/cart/getCart")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const addProductCart = createAsyncThunk(
  "cart/addProductCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.post(`/cart/addProduct/${id}`, {
        quantity: 1,
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.put(`/cart/editProduct/${id}`, {
        quantity,
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
