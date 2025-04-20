import User from "../models/userModel.js"

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users) {
      return res.status(404).json({
        message: "User tidak ditemukan",
        errors: [],
      })
    }

    return res
      .status(200)
      .json({ message: "Mengambil user berhasil", data: { users } })
  } catch (error) {
    console.log("Error in getUsers function", new Date(), error)
    return res.status(500).json({
      message: "Internal Server Error",
      errors: [],
    })
  }
}
