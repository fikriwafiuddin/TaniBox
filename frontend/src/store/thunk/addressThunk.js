import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../lib/axios"

export const getAddress = createAsyncThunk(
  "address/getAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/address")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const addKecamatan = createAsyncThunk(
  "address/addKecamatan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.post(
        "/address/addKecamatan",
        data
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const editKecamatan = createAsyncThunk(
  "address/editKecamatan",
  async ({ kecamatanId, name }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.put(
        `/address/editKecamatan/${kecamatanId}`,
        { name }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteKecamatan = createAsyncThunk(
  "address/deleteKecamatan",
  async (kecamatanId, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/address/deleteKecamatan/${kecamatanId}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const addDesa = createAsyncThunk(
  "address/addDesa",
  async ({ kecamatanId, desa }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.post(
        `/address/addDesa/${kecamatanId}`,
        { desa }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const editDesa = createAsyncThunk(
  "address/editDesa",
  async ({ kecamatanId, desaIndex, name }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.put(
        `/address/editDesa/${kecamatanId}/${desaIndex}`,
        { name }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteDesa = createAsyncThunk(
  "address/deleteDesa",
  async ({ kecamatanId, desaIndex }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/address/deleteDesa/${kecamatanId}/${desaIndex}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const addDusun = createAsyncThunk(
  "address/addDusun",
  async ({ kecamatanId, desaIndex, name }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.post(
        `/address/addDusun/${kecamatanId}/${desaIndex}`,
        { name }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteDusun = createAsyncThunk(
  "address/deleteDusun",
  async ({ kecamatanId, desaIndex, dusunIndex }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/address/deleteDusun/${kecamatanId}/${desaIndex}/${dusunIndex}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
