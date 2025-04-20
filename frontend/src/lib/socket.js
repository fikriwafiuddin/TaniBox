import { io } from "socket.io-client"
import { BASE_URL } from "../constant"

const socket = io("http://localhost:3000", {
  withCredentials: true,
  autoConnect: true, // Ubah ke true untuk otomatis connect
  transports: ["websocket", "polling"], // Fallback ke polling jika websocket blocked
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
})

// Event listeners untuk debugging
socket.on("connect", () => {
  console.log("Connected to server:", socket.id)
})

socket.on("connect_error", (err) => {
  console.error("Connection error:", err)
})

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason)
})

export default socket
