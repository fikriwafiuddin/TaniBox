import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./utils/connectDB.js"
import router from "./router.js"
import http from "http"
import { Server } from "socket.io"
import { initSocket } from "./utils/socket.js"
import { deleteSocketToken, verifySocketToken } from "./memory/socketToken.js"

const app = express()
const port = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("images/products"))
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
)
connectDB()
app.use(router)

const server = http.createServer(app)

// Socket.io Initialization
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
})

// Connect Socket.io
initSocket(io)

io.use((socket, next) => {
  const token = socket.handshake.auth?.socketToken
  const valid = verifySocketToken(token)

  if (!valid) {
    return next(new Error("Not authorized for socket connection"))
  }

  socket.userId = valid.userId
  next()
})

io.on("connection", (socket) => {
  console.log("Client connected", socket.userId)

  socket.on("disconnect", () => {
    setTimeout(() => {
      // jika belum reconnect
      deleteSocketToken(socket.handshake.auth?.socketToken)
    }, 10000) // 10 detik grace period
  })

  socket.on("error", (error) => {
    console.error(`Socket error: ${error}`)
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
