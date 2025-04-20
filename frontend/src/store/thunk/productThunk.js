import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance, axiosInstance } from "../../lib/axios"

export const getProductsByUser = createAsyncThunk(
  "product/getProductsByUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getProductsByAdmin = createAsyncThunk(
  "product/getProductsByAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/admin/products")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      for (const key in data) {
        formData.append(key, data[key])
      }
      const response = await axiosAuthInstance.post(
        "/admin/createProduct",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      for (const key in data) {
        formData.append(key, data[key])
      }
      const response = await axiosAuthInstance.put(
        `/admin/editProduct/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/admin/deleteProduct/${id}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
