import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"
import { addProductCartSchema } from "../utils/schema.js"
import { z } from "zod"

export const getCart = async (req, res) => {
  const user = req.user
  try {
    let cart = await Cart.findOne({ userId: user._id }).populate({
      path: "products.product",
      select: "name price",
    })
    if (!cart) {
      cart = await Cart.create({
        userId: user._id,
      })
    }

    return res.status(200).json({
      message: "Mengambil keranjang berhasil",
      data: { cart: cart.products },
    })
  } catch (error) {
    console.log("Error in getCart function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  }
}

export const addProductCart = async (req, res) => {
  const user = req.user
  const data = req.body // quantity
  const productId = req.params.productId

  try {
    const validatedData = addProductCartSchema.parse(data)
    const { quantity } = validatedData

    const product = await Product.findById(productId)
    if (!product) {
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan", errors: [] })
    }

    let cart = await Cart.findOne({ userId: user._id })

    if (!cart) {
      // Buat keranjang baru jika belum ada
      cart = new Cart({
        userId: user._id,
        products: [{ product: productId, quantity }],
      })
    } else {
      // Tambah atau update produk jika keranjang sudah ada
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      )

      if (productIndex === -1) {
        cart.products.push({ product: productId, quantity })
      } else {
        cart.products[productIndex].quantity += quantity
      }
    }

    await cart.save()
    const populatedCart = await cart.populate({
      path: "products.product",
      select: "name price",
    })
    return res.status(200).json({
      message: "Produk berhasil ditambahkan ke keranjang",
      data: { cart: populatedCart.products },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res.status(400).json({ message: "Error validasi data", errors })
    }

    console.log("Error in addProductCart function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const editProductCart = async (req, res) => {
  const user = req.user
  const data = req.body // quantity
  const productId = req.params.productId
  try {
    const validatedData = addProductCartSchema.parse(data)
    const { quantity } = validatedData

    const cart = await Cart.findOne({ userId: user._id })
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Keranjang tidak ditemukan", errors: [] })
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    )
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan di keranjang", errors: [] })
    }

    if (quantity === 0) {
      cart.products.splice(productIndex, 1)
    } else {
      cart.products[productIndex].quantity = quantity
    }

    await cart.save()
    const populatedCart = await cart.populate({
      path: "products.product",
      select: "name price",
    })
    return res.status(200).json({
      message: "Produk pada keranjang berhasil diubah di keranjang",
      data: { cart: populatedCart.products },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res.status(400).json({ message: "Error validasi data", errors })
    }
    console.log("Error in editProductCart function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}
