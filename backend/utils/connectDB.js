import mongoose from "mongoose"

const MONGO_URL = process.env.MONGO_URL
const connectDB = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB")
    })
    .catch((err) => {
      console.log(err)
    })
}

export default connectDB
