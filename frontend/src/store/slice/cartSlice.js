import { createSlice } from "@reduxjs/toolkit"
import { addProductCart, getCart, updateCartItem } from "../thunk/cartThunk"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    msgSuccess: null,
    msgError: null,
    isLoadingGetCart: false,
    isLoadingAddProductCart: false,
    isLoadingEditProductCart: false,
  },
  reducers: {
    resetMessage: (state) => {
      state.msgSuccess = null
      state.msgError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoadingGetCart = true
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoadingGetCart = false
        state.cart = action.payload.data.cart
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoadingGetCart = false
      })
    builder
      .addCase(addProductCart.pending, (state) => {
        state.isLoadingAddProductCart = true
      })
      .addCase(addProductCart.fulfilled, (state, action) => {
        state.isLoadingAddProductCart = false
        state.cart = action.payload.data.cart
        state.msgSuccess = action.payload.message
      })
      .addCase(addProductCart.rejected, (state, action) => {
        state.isLoadingAddProductCart = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(updateCartItem.pending, (state) => {
        state.isLoadingEditProductCart = true
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoadingEditProductCart = false
        state.cart = action.payload.data.cart
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoadingEditProductCart = false
        state.msgError = action.payload.message
      })
  },
})

export const { resetMessage } = cartSlice.actions
export default cartSlice.reducer
