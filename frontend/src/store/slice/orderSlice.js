import { createSlice } from "@reduxjs/toolkit"
import {
  createOrder,
  deleteOrder,
  deliveredOrder,
  getMyOrders,
  getOrders,
  rejectOrder,
  sendOrder,
  undeliveredOrder,
} from "../thunk/orderThunk"

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    filteredOrders: [],
    selectedOrder: null,
    msgError: null,
    msgSuccess: null,
    isLoadingCreateOrder: false,
    isLoadingGetMyOrders: false,
    isLoadingGetOrders: false,
    isLoadingSendOrder: false,
    isLoadingRejectOrder: false,
    isLoadingDeliveredOrder: false,
    isLoadingUndeliveredOrder: false,
    isLoadingDeleteOrder: false,
    filterStatus: "paid",
  },
  reducers: {
    resetMessage: (state) => {
      state.msgSuccess = null
      state.msgError = null
    },
    sortByDate: (state, action) => {
      const sortType = action.payload // "latest" atau "oldest"
      const sorted = [...state.orders].sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return sortType === "latest" ? dateB - dateA : dateA - dateB
      })
      state.orders = sorted
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload
    },
    changeOrders: (state, action) => {
      const { status, order } = action.payload
      if (state.filterStatus === "all") {
        state.orders.unshift(order)
      } else if (status === state.filterStatus) {
        state.orders.unshift(order)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoadingCreateOrder = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoadingCreateOrder = false
        state.msgSuccess = action.payload.message
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoadingCreateOrder = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.isLoadingGetMyOrders = true
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoadingGetMyOrders = false
        state.orders = action.payload.data.orders
      })
      .addCase(getMyOrders.rejected, (state) => {
        state.isLoadingGetMyOrders = false
      })
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoadingGetOrders = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoadingGetOrders = false
        state.orders = action.payload.data.orders
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoadingGetOrders = false
      })
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isLoadingCreateOrder = true
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.isLoadingSendOrder = false
        state.msgSuccess = action.payload.message
        state.selectedOrder = null
        if (state.filterStatus === "all") {
          const findIndex = state.orders.findIndex(
            (order) => order._id === action.payload.data.order._id
          )
          state.orders[findIndex] = action.payload.data.order
        } else {
          state.orders = state.orders.filter(
            (order) => order._id !== action.payload.data.order._id
          )
        }
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isLoadingSendOrder = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(rejectOrder.pending, (state) => {
        state.isLoadingRejectOrder = true
      })
      .addCase(rejectOrder.fulfilled, (state, action) => {
        state.isLoadingRejectOrder = false
        state.msgSuccess = action.payload.message
        state.selectedOrder = null
        if (state.filterStatus === "all") {
          const findIndex = state.orders.findIndex(
            (order) => order._id === action.payload.data.order._id
          )
          state.orders[findIndex] = action.payload.data.order
        } else {
          state.orders = state.orders.filter(
            (order) => order._id !== action.payload.data.order._id
          )
        }
      })
      .addCase(rejectOrder.rejected, (state, action) => {
        state.isLoadingRejectOrder = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(deliveredOrder.pending, (state) => {
        state.isLoadingDeliveredOrder = true
      })
      .addCase(deliveredOrder.fulfilled, (state, action) => {
        state.isLoadingDeliveredOrder = false
        state.selectedOrder = null
        state.msgSuccess = action.payload.message
        if (state.filterStatus === "all") {
          const findIndex = state.orders.findIndex(
            (order) => order._id === action.payload.data.order._id
          )
          state.orders[findIndex] = action.payload.data.order
        } else {
          state.orders = state.orders.filter(
            (order) => order._id !== action.payload.data.order._id
          )
        }
      })
      .addCase(deliveredOrder.rejected, (state, action) => {
        state.isLoadingDeliveredOrder = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(undeliveredOrder.pending, (state) => {
        state.isLoadingUndeliveredOrder = true
      })
      .addCase(undeliveredOrder.fulfilled, (state, action) => {
        state.isLoadingUndeliveredOrder = false
        state.selectedOrder = null
        state.msgSuccess = action.payload.message
        if (state.filterStatus === "all") {
          const findIndex = state.orders.findIndex(
            (order) => order._id === action.payload.data.order._id
          )
          state.orders[findIndex] = action.payload.data.order
        } else {
          state.orders = state.orders.filter(
            (order) => order._id !== action.payload.data.order._id
          )
        }
      })
      .addCase(undeliveredOrder.rejected, (state, action) => {
        state.isLoadingUndeliveredOrder = false
        state.msgError = action.payload.message
      })
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoadingDeleteOrder = true
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoadingDeleteOrder = false
        state.msgSuccess = action.payload.message
        if (state.filterStatus === "all") {
          const findIndex = state.orders.findIndex(
            (order) => order._id === action.payload.data.order._id
          )
          state.orders[findIndex] = action.payload.data.order
        } else {
          state.orders = state.orders.filter(
            (order) => order._id !== action.payload.data.order._id
          )
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoadingDeleteOrder = false
        state.msgError = action.payload.message
      })
  },
})

export const {
  resetMessage,
  sortByDate,
  setSelectedOrder,
  setFilterStatus,
  changeOrders,
} = orderSlice.actions
export default orderSlice.reducer
