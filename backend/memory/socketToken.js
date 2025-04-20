const socketTokens = new Map()
import crypto from "crypto"

export const generateSocketToken = (userId) => {
  const token = crypto.randomUUID()
  socketTokens.set(token, { userId, createdAt: Date.now() })
  return token
}

export const verifySocketToken = (token) => {
  return socketTokens.get(token)
}

export const deleteSocketToken = (token) => {
  socketTokens.delete(token)
}
