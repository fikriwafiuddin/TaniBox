import { createSlice } from "@reduxjs/toolkit"
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductsByAdmin,
  getProductsByUser,
} from "../thunk/productThunk"

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoadingGetProducts: false,
    isLoadingCreateProduct: false,
    isLoadingEditProduct: false,
    isLoadingDeleteProduct: false,
    msgSuccess: null,
    msgError: null,
  },
  reducers: {
    resetMessage: (state) => {
      state.msgSuccess = null
      state.msgError = null
    },
    changeProducts: (state, action) => {
      const { action: actionType, product } = action.payload.data
      switch (actionType) {
        case "create":
          state.products.push(product)
          break
        case "edit": {
          const index = state.products.findIndex(
            (value) => value._id === product._id
          )
          state.products[index] = product
          break
        }
        case "delete":
          state.products = state.products.filter((p) => p._id !== product._id)
          break
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByUser.pending, (state) => {
        state.isLoadingGetProducts = true
      })
      .addCase(getProductsByUser.fulfilled, (state, action) => {
        state.isLoadingGetProducts = false
        state.products = action.payload.data.products
      })
      .addCase(getProductsByUser.rejected, (state) => {
        state.isLoadingGetProducts = false
        state.products = []
      })
    builder
      .addCase(getProductsByAdmin.pending, (state) => {
        state.isLoadingGetProducts = true
      })
      .addCase(getProductsByAdmin.fulfilled, (state, action) => {
        state.isLoadingGetProducts = false
        state.products = action.payload.data.products
      })
      .addCase(getProductsByAdmin.rejected, (state) => {
        state.isLoadingGetProducts = false
        state.products = []
      })
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoadingCreateProduct = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoadingCreateProduct = false
        state.products.push(action.payload.data.product)
        state.msgSuccess = action.payload.message
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoadingCreateProduct = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(editProduct.pending, (state) => {
        state.isLoadingEditProduct = true
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoadingEditProduct = false
        const index = state.products.findIndex(
          (product) => product._id === action.payload.data.product._id
        )
        state.products[index] = action.payload.data.product
        state.msgSuccess = action.payload.message
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoadingEditProduct = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoadingDeleteProduct = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoadingDeleteProduct = false
        state.products = state.products.filter(
          (product) => product._id !== action.payload.data.product._id
        )
        state.msgSuccess = action.payload.message
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoadingDeleteProduct = false
        state.msgError = action.payload.message
      })
  },
})

export const { resetMessage, changeProducts } = productSlice.actions
export default productSlice.reducer
