import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import { BASE_URL } from "../constant"
import { changeStats } from "../store/slice/statsSlice"
import { changeProducts } from "../store/slice/productSlice"
import { changeOrders } from "../store/slice/orderSlice"
import {
  changeActivity,
  changeLatestActivity,
} from "../store/slice/activityLogSlice"

function useGetNotification() {
  const { socketToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const socketRef = useRef(null)

  useEffect(() => {
    if (!socketToken) return

    socketRef.current = io(BASE_URL, {
      auth: { socketToken },
      withCredentials: true,
      autoConnect: true,
      transports: ["websocket", "polling"],
    })

    const socket = socketRef.current

    socket.on("stats", (response) => {
      dispatch(changeStats(response.data))
    })

    socket.on("activity", (response) => {
      dispatch(changeLatestActivity(response.data))
      dispatch(changeActivity(response.data))
    })

    socket.on("product", (response) => {
      dispatch(changeProducts(response.data))
    })

    socket.on("order", (response) => {
      dispatch(changeOrders(response.data))
    })

    // Cleanup saat unmount
    return () => {
      socket.off("stats")
      socket.off("activity")
      socket.off("product")
      socket.off("order")
      socket.disconnect()
    }
  }, [dispatch, socketToken])
}

export default useGetNotification
