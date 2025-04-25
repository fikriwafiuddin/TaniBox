import Address from "../models/addressModel.js"
import Cart from "../models/cartModel.js"
import Order from "../models/orderModel.js"
import { z } from "zod"
import midtransClient from "midtrans-client"
import crypto from "crypto"
import { getSocket } from "../utils/socket.js"
import ActivityLog from "../models/activityLogModel.js"
import mongoose from "mongoose"
import Product from "../models/productModel.js"
import createOrderSchema from "../schema/createOrderSchema.js"

export const createOrder = async (req, res) => {
  const user = req.user
  const data = req.body
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const cart = await Cart.findOne({ userId: user._id }).populate({
      path: "products.product",
    })
    if (!cart || cart.products.length === 0) {
      await session.abortTransaction()
      return res
        .status(404)
        .json({ message: "Keranjang tidak ditemukan", errors: [] })
    }

    const validatedData = createOrderSchema.parse(data)
    const { name, email, noHp, kecamatan, desa, dusun, rt, rw, description } =
      validatedData

    const address = await Address.findOne({
      "kecamatan.name": kecamatan,
    })
    if (!address) {
      await session.abortTransaction()
      return res.status(400).json({
        message: "Alamat bukan dalam jangkauan kami!",
        errors: [{ kecamatan: ["Kecamatan bukan dalam jangkauan kami!"] }],
      })
    }

    const isExistKecamatan = address.kecamatan
    const isExistDesa = isExistKecamatan.desa.find((val) => val.name === desa)
    if (!isExistDesa) {
      await session.abortTransaction()
      return res.status(400).json({
        message: "Alamat bukan dalam jangkauan kami!",
        errors: [{ desa: ["Kelurahan bukan dalam jangkauan kami!"] }],
      })
    }

    const isExistDusun = isExistDesa.dusun.find((val) => val === dusun)
    if (!isExistDusun) {
      await session.abortTransaction()
      return res.status(400).json({
        message: "Alamat bukan dalam jangkauan kami!",
        errors: [{ dusun: ["Dusun bukan dalam jangkauan kami!"] }],
      })
    }

    let amount = 0
    const orderItems = []
    for (const item of cart.products) {
      const product = item.product
      const quantity = item.quantity

      const available = product.stock - product.lockedStock
      if (quantity > available) {
        await session.abortTransaction()
        return res.status(400).json({
          message:
            "Ada produk yang jumlahnya melebihi stok, tolong refresh halaman ini!",
          errors: {},
        })
      }

      product.lockedStock += quantity
      await product.save({ session })

      orderItems.push({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        price: product.price,
      })
      amount += product.price * quantity
    }

    const order = new Order({
      user: user._id,
      orderItems,
      amount,
      status: "pending",
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
        expiry: {
          unit: "minutes",
          duration: 1,
        },
        item_details: orderItems,
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

    await order.save({ session })
    cart.products = []
    await cart.save({ session })

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

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
      message: "Pesanan berhasil dibuat!",
      data: {
        payment_url: dataMidtrans.redirect_url,
      },
    })
  } catch (error) {
    await session.abortTransaction()
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res
        .status(400)
        .json({ message: "Masukkan data dengan benar", errors })
    }
    console.log("Error in createOrder function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: {} })
  } finally {
    session.endSession()
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
  } catch (error) {
    console.log("Error in getOrders function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: {} })
  }
}

export const callBackPayment = async (req, res) => {
  const data = req.body
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    let apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    })

    const response = await apiClient.transaction.notification(data)
    console.log(response)
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
      await session.abortTransaction()
      return res.status(401).json({ message: "Invalid signature", errors: [] })
    }

    const order = await Order.findById(orderId).populate("user")
    if (!order) {
      await session.abortTransaction()
      return res
        .status(404)
        .json({ message: "Pesanan tidak ditemukan", errors: [] })
    }

    if (fraudStatus === "deny") {
      order.status = "cancelled"
    }
    if (["capture", "settlement"].includes(transactionStatus)) {
      order.status = "paid"
      const products = order.orderItems
      for (const product of products) {
        await Product.findByIdAndUpdate(product.id, {
          $inc: {
            stock: -product.quantity,
            lockedStock: -product.quantity,
          },
        })
      }
    }
    if (["cancel", "expire", "deny", "failure"].includes(transactionStatus)) {
      order.status = "failed"
      const products = order.orderItems
      for (const product of products) {
        await Product.findByIdAndUpdate(product.id, {
          $inc: {
            lockedStock: -product.quantity,
          },
        })
      }
    }

    await order.save()

    const newActivityLog = new ActivityLog({
      user: order.user,
      action: "payment_order",
      message: `Order ${order._id} telah dibayar oleh ${order.user.name}`,
      metadata: order,
    })

    const io = getSocket()
    if (order.status === "paid") {
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

    await session.commitTransaction()

    return res.status(200).json({ message: "Success", data: {} })
  } catch (error) {
    await session.abortTransaction()
    console.log("Error in callBackPayment function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  } finally {
    session.endSession()
  }
}

export const checkExpiredOrders = async (req, res) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const now = new Date()
    const orders = await Order.find({
      status: "pending",
      expiredAt: { $lt: now },
    })
    for (const order of orders) {
      const response = await fetch(
        `https://api.sandbox.midtrans.com/v2/${order._id}/status`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Basic ${process.env.AUTH_STRING}`,
          },
        }
      )
      const data = await response.json()
      if (
        data.transaction_status === "expire" ||
        data.status_message === "Transaction doesn't exist."
      ) {
        order.status = "failed"
        await order.save()
        const products = order.orderItems
        for (const product of products) {
          await Product.findByIdAndUpdate(product.id, {
            $inc: {
              lockedStock: -product.quantity,
            },
          })
        }
      }
    }
    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.log("Error in checkExpiredOrders function", new Date(), error)
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
