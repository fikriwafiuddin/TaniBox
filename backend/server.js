import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./utils/connectDB.js"
import router from "./router.js"

const app = express()
const port = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("images/products"))
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
)
connectDB()
app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
