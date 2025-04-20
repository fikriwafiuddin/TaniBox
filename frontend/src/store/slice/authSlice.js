import { createSlice } from "@reduxjs/toolkit"
import { getMe, login, logout, register } from "../thunk/authThunk"

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    msgSuccess: null,
    msgError: null,
    isLoadingLogin: false,
    isLoadingRegister: false,
    isLoadingGetMe: true,
    errorFormLogin: null,
    errorFormRegister: null,
    socketToken: null,
  },
  reducers: {
    resetMessage: (state) => {
      state.msgSuccess = null
      state.msgError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoadingLogin = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingLogin = false
        state.user = action.payload.data.user
        state.msgSuccess = action.payload.message
        state.socketToken = action.payload.data.socketToken
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingLogin = false
        state.msgError = action.payload.message
        state.errorFormLogin = action.payload.errors
      })
    builder
      .addCase(register.pending, (state) => {
        state.isLoadingRegister = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoadingRegister = false
        state.msgSuccess = action.payload.message
        state.user = action.payload.data.user
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoadingRegister = false
        state.msgError = action.payload.message
        state.errorFormRegister = action.payload.errors
      })
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoadingGetMe = true
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoadingGetMe = false
        state.user = action.payload.data.user
        state.socketToken = action.payload.data.socketToken
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoadingGetMe = false
      })
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null
      state.msgSuccess = "Logout berhasil!"
    })
  },
})

export const { resetMessage } = userSlice.actions
export default userSlice.reducer
