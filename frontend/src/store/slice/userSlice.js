import { createSlice } from "@reduxjs/toolkit"
import { getUsers } from "../thunk/userThunk"

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoadingGetUsers: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoadingGetUsers = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoadingGetUsers = false
        state.users = action.payload.data.users
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoadingGetUsers = false
      })
  },
})

export default userSlice.reducer
