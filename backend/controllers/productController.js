import Product from "../models/productModel.js"
import { createProductSchema, editProductSchema } from "../utils/schema.js"
import { z } from "zod"
import fs from "fs"

export const getProducstByUser = async (req, res) => {
  try {
    const products = await Product.find().select("-createdAt -updatedAt")
    if (!products) {
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan", errors: [] })
    }

    return res
      .status(200)
      .json({ message: "Mengambil produk berhasil", data: { products } })
  } catch (error) {
    console.log("Error in getProducstByUser function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const getProducstByAdmin = async (req, res) => {
  try {
    const products = await Product.find()
    if (!products) {
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan", errors: [] })
    }

    return res
      .status(200)
      .json({ message: "Mengambil produk berhasil", data: { products } })
  } catch (error) {
    console.log("Error in getProducstByAdmin function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const createProduct = async (req, res) => {
  const data = req.body
  const image = req.file
  try {
    const validatedData = createProductSchema.parse({
      ...data,
      image: image?.filename,
    })
    const { name, price, stock } = validatedData

    const existingProduct = await Product.findOne({ name })
    if (existingProduct) {
      if (image) {
        fs.unlinkSync(`images/products/${image.filename}`)
      }
      return res.status(400).json({ message: "Produk sudah ada", errors: [] })
    }

    const newProduct = await Product.create({
      name,
      price,
      stock,
      image: image.filename,
    })
    return res.status(201).json({
      message: "Produk berhasil ditambahkan",
      data: { product: newProduct },
    })
  } catch (error) {
    if (image) {
      fs.unlinkSync(`images/products/${image.filename}`)
    }
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res.status(400).json({ message: "Error validasi data", errors })
    }
    console.log("Error in createProduct function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const editProduct = async (req, res) => {
  const id = req.params.id
  const data = req.body
  const image = req.file
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan", errors: [] })
    }

    const validatedData = editProductSchema.parse(data)
    const { name, price, stock } = validatedData

    const existingProduct = await Product.findOne({ name })
    if (existingProduct) {
      return res.status(400).json({ message: "Produk sudah ada", errors: [] })
    }

    const editedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        stock,
        image: image ? image.filename : product.image,
      },
      { new: true }
    )

    if (image) {
      fs.unlinkSync(`images/products/${product.image}`)
    }

    return res.status(200).json({
      message: "Produk berhasil diubah",
      data: { product: editedProduct },
    })
  } catch (error) {
    if (image) {
      fs.unlinkSync(`images/products/${image.filename}`)
    }
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res.status(400).json({ message: "Error validasi data", errors })
    }
    console.log("Error in editProduct function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const deleteProduct = async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan", errors: [] })
    }

    const deletedProduct = await Product.findByIdAndDelete(id)

    if (product.image) {
      fs.unlinkSync(`images/products/${product.image}`)
    }

    return res.status(200).json({
      message: "Produk berhasil dihapus",
      data: { product: deletedProduct },
    })
  } catch (error) {
    console.log("Error in deleteProduct function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}
