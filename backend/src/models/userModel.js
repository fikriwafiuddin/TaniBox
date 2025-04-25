import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    noHp: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      enum: ["admin", "user"],
      default: "user",
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)
export default User
