import Address from "../models/addressModel.js"
import Cart from "../models/cartModel.js"
import Order from "../models/orderModel.js"
import { orderSchema } from "../validators/orderValidators.js"
import { z } from "zod"
import midtransClient from "midtrans-client"
import crypto from "crypto"
import { getSocket } from "../utils/socket.js"
import ActivityLog from "../models/activityLogModel.js"

export const createOrder = async (req, res) => {
  const user = req.user
  const data = req.body
  try {
    const cart = await Cart.findOne({ userId: user._id }).populate({
      path: "products.product",
      select: "name price",
    })
    if (!cart || cart.products.length === 0) {
      return res
        .status(404)
        .json({ message: "Keranjang tidak ditemukan", errors: [] })
    }

    const validatedData = orderSchema.parse(data)
    const { name, email, noHp, kecamatan, desa, dusun, rt, rw, description } =
      validatedData

    const address = await Address.findOne({
      "kecamatan.name": kecamatan,
    })
    if (!address) {
      return res.status(400).json({
        message: "Alamat bukan dalam jangkauan kami!",
        errors: [{ kecamatan: ["Kecamatan bukan dalam jangkauan kami!"] }],
      })
    }

    const isExistKecamatan = address.kecamatan

    const isExistDesa = isExistKecamatan.desa.find((val) => val.name === desa)
    if (!isExistDesa) {
      return res.status(400).json({
        message: "Alamat bukan dalam jangkauan kami!",
        errors: [{ desa: ["Kelurahan bukan dalam jangkauan kami!"] }],
      })
    }

    const isExistDusun = isExistDesa.dusun.find((val) => val === dusun)
    if (!isExistDusun) {
      return res.status(400).json({
        message: "Alamat bukan dalam jangkauan kami!",
        errors: [{ dusun: ["Dusun bukan dalam jangkauan kami!"] }],
      })
    }

    const amount = cart.products.reduce((total, item) => {
      return total + item.quantity * item.product.price
    }, 0)
    const order = new Order({
      user: user._id,
      orderItems: cart.products.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        price: item.product.price,
      })),
      amount,
      address: {
        name,
        email,
        noHp,
        kecamatan,
        desa,
        dusun,
        rt,
        rw,
        description,
      },
    })

    const AUTH_STRING = process.env.AUTH_STRING
    const url = process.env.MIDTRANS_URL
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Basic ${AUTH_STRING}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: order._id,
          gross_amount: amount,
        },
        item_details: cart.products.map((item) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        customer_details: {
          email,
          phone: noHp,
        },
        credit_card: {
          secure: true,
        },
        callbacks: {
          finish: `${process.env.FRONTEND_URL}/order/payment-success`,
          error: `${process.env.FRONTEND_URL}/order/payment-failed`,
        },
      }),
    }

    const response = await fetch(url, options)
    const dataMidtrans = await response.json()

    order.save()
    cart.products = []
    await cart.save()

    const io = getSocket()
    io.emit("stats", {
      message: `Order ${order._id} has created`,
      data: {
        key: "totalOrders",
        value: 1,
      },
    })

    const newActivityLog = await ActivityLog.create({
      user: user._id,
      action: "create_order",
      message: `Pesanan ${order._id} telah dibuat oleh ${user.name}`,
      metadata: order,
    })

    io.emit("activity", {
      message: `Order ${order._id} has created`,
      data: newActivityLog,
    })

    io.emit("order", {
      message: `Order ${order._id} has created`,
      data: {
        status: "pending",
        order: order,
      },
    })

    return res.status(201).json({
      message: "Pesanan berhasil dibuat!",
      data: {
        payment_url: dataMidtrans.redirect_url,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res
        .status(400)
        .json({ message: "Masukkan data dengan benar", errors })
    }
    console.log("Error in createOrder function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  }
}

export const getMyOrders = async (req, res) => {
  const user = req.user
  try {
    const orders = await Order.find({ user: user._id })
    if (!orders) {
      return res
        .status(404)
        .json({ message: "Pesanan tidak ditemukan", errors: [] })
    }

    return res.status(200).json({
      message: "Mengambil pesanan berhasil",
      data: { orders },
    })
  } catch (error) {
    console.log("Error in getMyOrders function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  }
}

export const getOrders = async (req, res) => {
  const status = req.query?.status
  try {
    let orders
    if (!status || status?.toLowerCase() === "all") {
      orders = await Order.find()
    } else {
      orders = await Order.find({ status })
    }

    if (!orders) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan",
        errors: [],
      })
    }

    return res.status(200).json({
      message: "Mengambil pesanan berhasil",
      data: { orders: orders.reverse() },
    })
  } catch (error) {}
}

export const callBackPayment = async (req, res) => {
  const data = req.body
  try {
    let apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    })

    const response = await apiClient.transaction.notification(data)
    const orderId = response.order_id
    const transactionStatus = response.transaction_status
    const fraudStatus = response.fraud_status
    const grossAmount = response.gross_amount
    const statusCode = response.status_code
    const signatureKey = response.signature_key

    const generateSHA512Hash = crypto
      .createHash("sha512")
      .update(orderId + statusCode + grossAmount + process.env.SERVER_KEY)
      .digest("hex")
    if (signatureKey !== generateSHA512Hash) {
      return res.status(401).json({ message: "Invalid signature", errors: [] })
    }

    const order = await Order.findById(orderId).populate("user")
    if (!order) {
      return res
        .status(404)
        .json({ message: "Pesanan tidak ditemukan", errors: [] })
    }

    if (fraudStatus === "deny") {
      order.status = "cancelled"
    }
    if (transactionStatus === "capture" || transactionStatus === "settlement") {
      order.status = "paid"
    }
    if (
      transactionStatus === "cancel" ||
      transactionStatus === "expire" ||
      transactionStatus === "deny" ||
      transactionStatus === "failure"
    ) {
      order.status = "failed"
    }

    await order.save()

    const newActivityLog = new ActivityLog({
      user: order.user,
      action: "payment_order",
      message: `Order ${order._id} telah dibayar oleh ${order.user.name}`,
      metadata: order,
    })

    if (order.status === "paid") {
      const io = getSocket()
      io.emit("stats", {
        message: `Order ${order._id} has paid`,
        data: {
          key: "totalOrders",
          value: order.amount,
        },
      })
      newActivityLog.message = `Pesanan ${order._id} telah dibayar oleh ${order.user.name}`
    } else if (order.status === "failed") {
      newActivityLog.message = `Pesanan ${order._id} gagal dibayar oleh ${order.user.name}`
    } else if (order.status === "cancelled") {
      newActivityLog.message = `Pesanan ${order._id} telah dibatalkan oleh ${order.user.name}`
    }

    await newActivityLog.save()

    io.emit("activity", {
      message: `Order ${order._id} been completed`,
      data: newActivityLog,
    })

    io.emit("order", {
      message: `Order ${order._id} has been completed`,
      data: {
        status: order.status,
        order: order,
      },
    })

    return res.status(200).json({ message: "Success", data: {} })
  } catch (error) {
    console.log("Error in callBackPayment function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  }
}

export const sendOrder = async (req, res) => {
  const orderId = req.params?.orderId
  try {
    if (!orderId) {
      return res
        .status(400)
        .json({ message: "ID produk tidak ditemukan", errors: [] })
    }

    const order = await Order.findById(orderId)
    if (!order) {
      return res
        .status(404)
        .json({ message: "Pesanan tidak ditemukan", errors: [] })
    }

    switch (order.status) {
      case "pending":
        return res
          .status(400)
          .json({ message: "Pesanan belum dibayar", errors: [] })
      case "shipped":
        return res
          .status(400)
          .json({ message: "Pesanan sudah dikirim", errors: [] })
      case "delivered":
        return res
          .status(400)
          .json({ message: "Pesanan sudah diterima", errors: [] })
      case "cancelled":
        return res
          .status(400)
          .json({ message: "Pesanan dibatalkan", errors: [] })
    }

    order.status = "shipped"
    const upadatedOrder = await order.save()

    const io = getSocket()
    const newActivityLog = await ActivityLog.create({
      user: req.user._id,
      action: "send_order",
      message: `${upadatedOrder._id} dikirim oleh ${req.user.name}`,
      metadata: upadatedOrder,
    })

    io.emit("activity", {
      message: `Order ${upadatedOrder._id} has shipped`,
      data: newActivityLog,
    })

    io.emit("order", {
      message: `Order ${upadatedOrder._id} has shipped`,
      data: {
        status: "shipped",
        order: upadatedOrder,
      },
    })

    return res.status(200).json({
      message: "Pesanan berhasil dikirim",
      data: { order: upadatedOrder },
    })
  } catch (error) {
    console.log("Error in sendOrder function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  }
}

export const rejectOrder = async (req, res) => {
  const orderId = req.params?.orderId
  try {
    if (!orderId) {
      return res.status(400).json({
        message: "ID produk tidak ditemukan",
        errors: [],
      })
    }

    const order = await Order.findById(orderId).populate("user")
    if (!order) {
      return res
        .status(404)
        .json({ message: "Pesanan tidak ditemukan", errors: [] })
    }

    switch (order.status) {
      case "pending":
        return res
          .status(400)
          .json({ message: "Pesanan belum dibayar", errors: [] })
      case "shipped":
        return res
          .status(400)
          .json({ message: "Pesanan sudah dikirim", errors: [] })
      case "delivered":
        return res
          .status(400)
          .json({ message: "Pesanan sudah diterima", errors: [] })
      case "cancelled":
        return res
          .status(400)
          .json({ message: "Pesanan dibatalkan", errors: [] })
    }

    order.status = "cancelled"
    const upadatedOrder = await order.save()

    const newActivityLog = await ActivityLog.create({
      user: req.user._id,
      action: "reject_order",
      message: `${upadatedOrder._id} dibatalkan oleh ${req.user.name}`,
      metadata: upadatedOrder,
    })

    const io = getSocket()
    io.emit("activity", {
      message: `Order ${upadatedOrder._id} has rejected`,
      data: newActivityLog,
    })

    io.emit("order", {
      message: `Order ${upadatedOrder._id} has rejected`,
      data: {
        status: "cancelled",
        order: upadatedOrder,
      },
    })

    return res.status(200).json({
      message: "Pesanan berhasil dibatalkan",
      data: { order: upadatedOrder },
    })
  } catch (error) {
    console.log("Error in rejectOrder function", new Date(), error)
    return res.status(500).json({
      message: "Internal Server Error",
      errors: [],
    })
  }
}

export const deliveredOrder = async (req, res) => {
  const orderId = req.params?.orderId
  try {
    if (!orderId) {
      return res.status(400).json({
        message: "ID produk tidak ditemukan",
        errors: [],
      })
    }

    const order = await Order.findById(orderId).populate("user")
    if (!order) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan",
        errors: [],
      })
    }

    switch (order.status) {
      case "pending":
        return res
          .status(400)
          .json({ message: "Pesanan belum dibayar", errors: [] })
      case "delivered":
        return res
          .status(400)
          .json({ message: "Pesanan sudah diterima", errors: [] })
      case "cancelled":
        return res
          .status(400)
          .json({ message: "Pesanan dibatalkan", errors: [] })
      case ("undelivered", "paid"):
        return res.status(400).json({
          message: "Pesanan belum dikirim",
          errors: [],
        })
    }

    order.status = "delivered"
    const upadatedOrder = await order.save()

    const newActivityLog = await ActivityLog.create({
      user: req.user._id,
      action: "receive_order",
      message: `${order._id} diterima oleh ${order.user.name}`,
      metadata: upadatedOrder,
    })

    const io = getSocket()
    io.emit("activity", {
      message: `Order ${upadatedOrder._id} has delivered`,
      data: newActivityLog,
    })

    io.emit("order", {
      message: `Order ${upadatedOrder._id} has delivered`,
      data: {
        status: "delivered",
        order: upadatedOrder,
      },
    })

    return res.status(200).json({
      message: "Pesanan berhasil diterima",
      data: { order: upadatedOrder },
    })
  } catch (error) {
    console.log("Error in deliveredOrder function", new Date(), error)
    return res.status(500).json({
      message: "Internal Server Error",
      errors: [],
    })
  }
}

export const undeliveredOrder = async (req, res) => {
  const orderId = req.params?.orderId
  try {
    if (!orderId) {
      return res.status(400).json({
        message: "ID produk tidak ditemukan",
        errors: [],
      })
    }

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan",
        errors: [],
      })
    }

    switch (order.status) {
      case "pending":
        return res.status(400).json({
          message: "Pesanan belum dibayar",
          errors: [],
        })
      case "delivered":
        return res.status(400).json({
          message: "Pesanan sudah diterima",
          errors: [],
        })
      case "cancelled":
        return res.status(400).json({
          message: "Pesanan dibatalkan",
          errors: [],
        })
      case ("undelivered", "paid"):
        return res.status(400).json({
          message: "Pesanan belum dikirim",
          errors: [],
        })
    }

    order.status = "undelivered"
    const upadatedOrder = await order.save()

    const newActivityLog = await ActivityLog.create({
      user: req.user._id,
      action: "undelivered_order",
      message: `${order._id} gagal dikirim`,
      metadata: upadatedOrder,
    })

    const io = getSocket()
    io.emit("activity", {
      message: `Order ${upadatedOrder._id} has undelivered`,
      data: newActivityLog,
    })

    io.emit("order", {
      message: `Order ${upadatedOrder._id} has undelivered`,
      data: {
        status: "undelivered",
        order: upadatedOrder,
      },
    })

    return res.status(200).json({
      message: "Pesanan berhasil dikembalikan",
      data: { order: upadatedOrder },
    })
  } catch (error) {
    console.log("Error in undeliveredOrder function", new Date(), error)
    return res.status(500).json({
      message: "Internal Server Error",
      errors: [],
    })
  }
}

export const deleteOrder = async (req, res) => {
  const orderId = req.params?.orderId
  try {
    if (!orderId) {
      return res.status(400).json({
        message: "ID produk tidak ditemukan",
        errors: [],
      })
    }

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan",
        errors: [],
      })
    }

    if (order.status !== "delivered" || order.status !== "cancelled") {
      return res.status(400).json({
        message: "Pesanan belum bisa dihapus",
        errors: [],
      })
    }

    const deletedOrder = await order.deleteOne()

    return res.status(200).json({
      message: "Pesanan berhasil dihapus",
      data: { order: deletedOrder },
    })
  } catch (error) {
    console.log("Error in deleteOrder function", new Date(), error)
    return res.status(500).json({
      message: "Internal Server Error",
      errors: [],
    })
  }
}
