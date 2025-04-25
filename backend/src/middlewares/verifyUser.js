import User from "../models/userModel.js"

const verifyUser = async (req, res, next) => {
  const id = req.id
  try {
    const user = await User.findById(id)
    if (!user) {
      return res
        .status(404)
        .json({ message: "User tidak ditemukan", errors: [] })
    }
    if (user.role !== "user") {
      return res
        .status(403)
        .json({ message: "Anda tidak memiliki akses", errors: [] })
    }
    req.user = user
    next()
  } catch (error) {
    console.log("Error in verifyUser function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export default verifyUser
