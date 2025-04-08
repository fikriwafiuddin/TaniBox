import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      role: "admin",
    },
  },
})

export default userSlice.reducer
