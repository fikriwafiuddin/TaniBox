import { createSlice } from "@reduxjs/toolkit"
import { getSalesAnalytics, getStats } from "../thunk/statsThunk"

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    stats: null,
    dailySales: [],
    monthlySales: [],
    isLoadingGetStats: false,
    isLoadingGetSalesAnalytics: false,
  },
  reducers: {
    changeStats: (state, action) => {
      const { key, value } = action.payload
      if (state.stats) {
        state.stats[key] = state.stats[key] + value
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.isLoadingGetStats = true
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload.data.stats
        state.isLoadingGetStats = false
      })
      .addCase(getStats.rejected, (state) => {
        state.isLoadingGetStats = false
      })
    builder
      .addCase(getSalesAnalytics.pending, (state) => {
        state.isLoadingGetSalesAnalytics = true
      })
      .addCase(getSalesAnalytics.fulfilled, (state, action) => {
        state.dailySales = action.payload.data.salesLast7Days
        state.monthlySales = action.payload.data.salesLast12Months
        state.isLoadingGetSalesAnalytics = false
      })
      .addCase(getSalesAnalytics.rejected, (state) => {
        state.isLoadingGetSalesAnalytics = false
      })
  },
})

export const { changeStats } = statsSlice.actions
export default statsSlice.reducer
