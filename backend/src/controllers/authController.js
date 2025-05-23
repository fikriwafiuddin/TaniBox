import User from "../models/userModel.js"
import { z } from "zod"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"
import Cart from "../models/cartModel.js"
import { getSocket } from "../utils/socket.js"
import { generateSocketToken } from "../memory/socketToken.js"
import ActivityLog from "../models/activityLogModel.js"
import userRegistrationSchema from "../schema/userRegisterSchema.js"
import userLoginSchema from "../schema/userLoginSchema.js"

export const register = async (req, res) => {
  const data = req.body // name, email, noHP, password, confirmPassword
  try {
    const validatedData = userRegistrationSchema.parse(data)
    const { name, email, noHp, password } = validatedData

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: "Masukkan data dengan benar",
        errors: { email: ["Email sudah digunakan"] },
      })
    }

    const genSalt = 10
    const hashPassword = await bcrypt.hash(password, genSalt)

    const newUser = await User.create({
      name,
      email,
      noHp,
      password: hashPassword,
    })
    await Cart.create({
      userId: newUser._id,
    })

    const io = getSocket()
    io.emit("stats", {
      message: `User ${newUser.name} has registered.`,
      data: {
        key: "totalUsers",
        value: 1,
      },
    })

    const newActivityLog = await ActivityLog.create({
      user: newUser._id,
      action: "register",
      message: `${newUser.name} telah mendaftar`,
      metadata: newUser,
    })
    io.emit("activity", {
      message: `User ${newUser.name} has registered.`,
      data: newActivityLog,
    })

    const token = generateToken(newUser._id)
    const user = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      noHp: newUser.noHp,
      role: newUser.role,
      cart: newUser.cart,
    }
    return res.status(201).json({
      message: "Registrasi success",
      data: { user, token },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res
        .status(400)
        .json({ message: "Masukkan data dengan benar", errors })
    }
    console.log("Error in register function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const login = async (req, res) => {
  const data = req.body
  try {
    const validatedData = userLoginSchema.parse(data)
    const { email, password } = validatedData

    const user = await User.findOne({ email })
    if (!user)
      return res
        .status(404)
        .json({ message: "Email atau password salah", errors: [] })

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword)
      return res
        .status(404)
        .json({ message: "Email atau password salah", errors: [] })

    const token = generateToken(user._id)
    const socketToken =
      user.role === "admin" ? generateSocketToken(user._id) : null
    return res.status(200).json({
      message: "Login success",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          noHp: user.noHp,
          role: user.role,
          cart: user.cart,
        },
        token,
        socketToken,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res
        .status(400)
        .json({ message: "Masukkan data dengan benar", errors })
    }
    console.log("Error in login function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const getMe = async (req, res) => {
  const id = req.id
  try {
    const user = await User.findById(id)
    if (!user)
      return res
        .status(404)
        .json({ message: "User tidak ditemukan", errors: [] })

    const socketToken =
      user.role === "admin" ? generateSocketToken(user._id) : null
    const token = generateToken(user._id)
    return res.status(200).json({
      message: "Get me success",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          noHp: user.noHp,
          role: user.role,
          cart: user.cart,
        },
        token,
        socketToken,
      },
    })
  } catch (error) {
    console.log("Error in getMe function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}
