import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../lib/axios"

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.post("/createOrder", data)
      window.location.href = response.data.data.payment_url
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/getMyOrders")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (status, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/admin/orders", {
        params: { status },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const sendOrder = createAsyncThunk(
  "order/sendOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.put(`/admin/sendOrder/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const rejectOrder = createAsyncThunk(
  "order/cancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.put(`/admin/rejectOrder/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deliveredOrder = createAsyncThunk(
  "order/deliveredOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.put(
        `/admin/deliveredOrder/${id}`
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const undeliveredOrder = createAsyncThunk(
  "order/undeliveredOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.put(
        `/admin/undeliveredOrder/${id}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/admin/deleteOrder/${id}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
