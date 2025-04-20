import { createSlice } from "@reduxjs/toolkit"
import { getActivityLog, getLatestActivities } from "../thunk/activityLogThunk"

const activityLogSlice = createSlice({
  name: "activityLog",
  initialState: {
    activities: [],
    latestActivities: [],
    isLoadingGetActivityLog: false,
    isLoadingGetLatestActivities: false,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
    },
  },
  reducers: {
    changeLatestActivity: (state, action) => {
      state.latestActivities.unshift(action.payload)
      if (state.latestActivities.length > 4) {
        state.latestActivities.pop()
      }
    },
    changeActivity: (state, action) => {
      state.activities.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActivityLog.pending, (state) => {
        state.isLoadingGetActivityLog = true
      })
      .addCase(getActivityLog.fulfilled, (state, action) => {
        state.isLoadingGetActivityLog = false
        state.activities = action.payload.data.activityLog
        state.pagination = action.payload.data.pagination
      })
      .addCase(getActivityLog.rejected, (state) => {
        state.isLoadingGetActivityLog = false
      })
    builder
      .addCase(getLatestActivities.pending, (state) => {
        state.isLoadingGetLatestActivities = true
      })
      .addCase(getLatestActivities.fulfilled, (state, action) => {
        state.latestActivities = action.payload.data.activities
        state.isLoadingGetLatestActivities = false
      })
      .addCase(getLatestActivities.rejected, (state) => {
        state.isLoadingGetLatestActivities = false
      })
  },
})

export const { changeLatestActivity, changeActivity } = activityLogSlice.actions
export default activityLogSlice.reducer
