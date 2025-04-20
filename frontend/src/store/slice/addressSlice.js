import { createSlice } from "@reduxjs/toolkit"
import {
  addDesa,
  addDusun,
  addKecamatan,
  deleteDesa,
  deleteDusun,
  deleteKecamatan,
  editDesa,
  editKecamatan,
  getAddress,
} from "../thunk/addressThunk"

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    isLoadingGetAddress: false,
    isLoadingAddKecamatan: false,
    isLoadingEditKecamatan: false,
    isLoadingDeleteKecamatan: false,
    isLoadingAddDesa: false,
    isLoadingEditDesa: false,
    isLoadingDeleteDesa: false,
    isLoadingAddDusun: false,
    isLoadingDeleteDusun: false,
    msgSuccess: null,
    msgError: null,
  },
  reducers: {
    resetMessage: (state) => {
      state.msgSuccess = null
      state.msgError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.isLoadingGetAddress = true
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.isLoadingGetAddress = false
        state.address = action.payload.data.address
      })
      .addCase(getAddress.rejected, (state) => {
        state.isLoadingGetAddress = false
      })
    builder
      .addCase(addKecamatan.pending, (state) => {
        state.isLoadingAddKecamatan = true
      })
      .addCase(addKecamatan.fulfilled, (state, action) => {
        state.isLoadingAddKecamatan = false
        state.address.push(action.payload.data.address)
        state.msgSuccess = action.payload.message
      })
      .addCase(addKecamatan.rejected, (state, action) => {
        state.isLoadingAddKecamatan = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(editKecamatan.pending, (state) => {
        state.isLoadingEditKecamatan = true
      })
      .addCase(editKecamatan.fulfilled, (state, action) => {
        state.isLoadingEditKecamatan = false
        const findIndex = state.address.findIndex(
          (item) => item._id === action.payload.data.address._id
        )
        state.address[findIndex].kecamatan.name =
          action.payload.data.address.kecamatan.name
        state.msgSuccess = action.payload.message
      })
      .addCase(editKecamatan.rejected, (state, action) => {
        state.isLoadingEditKecamatan = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(deleteKecamatan.pending, (state) => {
        state.isLoadingDeleteKecamatan = true
      })
      .addCase(deleteKecamatan.fulfilled, (state, action) => {
        state.isLoadingDeleteKecamatan = false
        state.address = state.address.filter(
          (item) => item._id !== action.payload.data.address._id
        )
        state.msgSuccess = action.payload.message
      })
      .addCase(deleteKecamatan.rejected, (state, action) => {
        state.isLoadingDeleteKecamatan = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(addDesa.pending, (state) => {
        state.isLoadingAddDesa = true
      })
      .addCase(addDesa.fulfilled, (state, action) => {
        state.isLoadingAddDesa = false
        const kecamatanIndex = state.address.findIndex(
          (kecamatan) => kecamatan._id === action.payload.data.address._id
        )
        const desa = action.payload.data.address.kecamatan.desa
        state.address[kecamatanIndex].kecamatan.desa.push(desa[desa.length - 1])
        state.msgSuccess = action.payload.message
      })
      .addCase(addDesa.rejected, (state, action) => {
        state.isLoadingAddDesa = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(editDesa.pending, (state) => {
        state.isLoadingEditDesa = true
      })
      .addCase(editDesa.fulfilled, (state, action) => {
        state.isLoadingEditDesa = false
        state.isLoadingEditDesa = false

        const updatedAddress = action.payload.data.address
        const kecamatanIndex = state.address.findIndex(
          (item) => item._id === updatedAddress._id
        )

        if (kecamatanIndex !== -1) {
          state.address[kecamatanIndex].kecamatan.desa =
            updatedAddress.kecamatan.desa
        }
        state.msgSuccess = action.payload.message
      })
      .addCase(editDesa.rejected, (state, action) => {
        state.isLoadingEditDesa = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(deleteDesa.pending, (state) => {
        state.isLoadingDeleteDesa = true
      })
      .addCase(deleteDesa.fulfilled, (state, action) => {
        state.isLoadingDeleteDesa = false

        const updatedAddress = action.payload.data.address
        const kecamatanIndex = state.address.findIndex(
          (item) => item._id === updatedAddress._id
        )

        if (kecamatanIndex !== -1) {
          state.address[kecamatanIndex].kecamatan.desa =
            updatedAddress.kecamatan.desa
        }
        state.msgSuccess = action.payload.message
      })
      .addCase(deleteDesa.rejected, (state, action) => {
        state.isLoadingDeleteDesa = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(addDusun.pending, (state) => {
        state.isLoadingAddDusun = true
      })
      .addCase(addDusun.fulfilled, (state, action) => {
        state.isLoadingAddDusun = false
        const { address, desaIndex } = action.payload.data
        const kecamatanIndex = state.address.findIndex(
          (k) => k._id === address._id
        )
        state.address[kecamatanIndex].kecamatan.desa[desaIndex].dusun =
          address.kecamatan.desa[desaIndex].dusun
      })
      .addCase(addDusun.rejected, (state) => {
        state.isLoadingAddDusun = false
      })
    builder
      .addCase(deleteDusun.pending, (state) => {
        state.isLoadingDeleteDusun = true
      })
      .addCase(deleteDusun.fulfilled, (state, action) => {
        state.isLoadingDeleteDusun = false
        const { address, desaIndex, dusunIndex } = action.payload.data
        const kecamatanIndex = state.address.findIndex(
          (k) => k._id === address._id
        )
        state.address[kecamatanIndex].kecamatan.desa[desaIndex].dusun.splice(
          dusunIndex,
          1
        )
      })
      .addCase(deleteDusun.rejected, (state) => {
        state.isLoadingDeleteDusun = false
      })
  },
})

export const { resetMessage } = addressSlice.actions
export default addressSlice.reducer
