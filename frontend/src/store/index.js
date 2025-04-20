import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../store/slice/authSlice"
import productReducer from "../store/slice/productSlice"
import cartReducer from "../store/slice/cartSlice"
import orderReducer from "../store/slice/orderSlice"
import userReducer from "../store/slice/userSlice"
import statsReducer from "../store/slice/statsSlice"
import activityLogReducer from "../store/slice/activityLogSlice"
import addressReducer from "../store/slice/addressSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    stats: statsReducer,
    activityLog: activityLogReducer,
    address: addressReducer,
  },
})

export default store
