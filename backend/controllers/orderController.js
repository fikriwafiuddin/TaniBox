import Address from "../models/addressModel.js"
import Cart from "../models/cartModel.js"
import Order from "../models/orderModel.js"
import { orderSchema } from "../validators/orderValidators.js"
import { z } from "zod"
import midtransClient from "midtrans-client"
import crypto from "crypto"

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
    const {
      name,
      email,
      noHp,
      kecamatan,
      kelurahan,
      dusun,
      rt,
      rw,
      description,
    } = validatedData

    const address = await Address.findOne({
      "kecamatan.name": kecamatan,
    })
    if (!address) {
      return res.status(400).json({
        message: "Alamat bukan dalam jangkauan kami!",
        errors: [{ kecamatan: "Kecamatan bukan dalam jangkauan kami!" }],
      })
    }

    const isExistKecamtan = address.kecamatan

    const isExistKelurahan = isExistKecamtan.kelurahan.find(
      (val) => val.name === kelurahan
    )
    if (!isExistKelurahan) {
      return res.status(400).json({
        message: "Alamat bukan dalam jangkauan kami!",
        errors: [{ kelurahan: "Kelurahan bukan dalam jangkauan kami!" }],
      })
    }

    const isExistDusun = isExistKelurahan.dusun.find((val) => val === dusun)
    if (!isExistDusun) {
      return res.status(400).json({
        message: "Alamat bukan dalam jangkauan kami!",
        errors: [{ dusun: "Dusun bukan dalam jangkauan kami!" }],
      })
    }

    const amount = cart.products.reduce((total, item) => {
      return total + item.quantity * item.product.price
    }, 0)
    const order = new Order({
      user: user._id,
      orderItems: cart.products.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      amount,
      address: {
        name,
        email,
        noHp,
        kecamatan,
        kelurahan,
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

    return res.status(201).json({
      message: "Pesanan berhasil dibuat!",
      data: {
        payment_url: dataMidtrans.redirect_url,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res.status(400).json({ message: "Error validasi data", errors })
    }
    console.log("Error in createOrder function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  }
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

    const order = await Order.findById(orderId)
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
      order.status = "cancelled"
    }

    await order.save()

    return res.status(200).json({ message: "Success", data: {} })
  } catch (error) {
    console.log("Error in callBackPayment function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  }
}
