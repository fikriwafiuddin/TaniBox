import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY
  let token = req.headers.authorization
  try {
    if (!token) {
      return res.status(401).json({ message: "Tidak sah", errors: [] })
    }

    const splitToken = token.split(" ")
    if (splitToken[0] !== "Bearer" || !splitToken[1]) {
      return res.status(401).json({ message: "Tidak sah", errors: [] })
    }

    token = splitToken[1]
    const decoded = jwt.verify(token, SECRET_KEY)
    req.id = decoded.id
    next()
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token kadaluarsa atau tidak valid", errors: [] })
  }
}

export default verifyToken
