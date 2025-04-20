let io

export const initSocket = (serverInstance) => {
  io = serverInstance
}

export const getSocket = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!")
  }
  return io
}
