import Product from "../models/productModel.js"
import { z } from "zod"
import fs from "fs"
import createProductSchema from "../schema/createProductSchema.js"
import editProductSchema from "../schema/editProductSchema.js"
import { getSocket } from "../utils/socket.js"
import ActivityLog from "../models/activityLogModel.js"
import cloudinary from "../utils/claudinary.js"

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
  const user = req.user
  try {
    const validatedData = createProductSchema.parse({
      ...data,
      image: image?.path.toString(),
    })
    const { name, price, stock, weight } = validatedData

    const existingProduct = await Product.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    })
    if (existingProduct) {
      if (image) {
        await cloudinary.uploader.destroy(image.filename)
      }
      return res.status(400).json({
        message: "Masukkan data dengan benar",
        errors: [{ name: ["nama sudah digunakan"] }],
      })
    }

    const newProduct = await Product.create({
      name,
      price,
      stock,
      weight,
      image: image.path,
      cloudinary_id: image.filename,
    })

    const io = getSocket()
    io.emit("stats", {
      message: `Product ${newProduct.name} has created.`,
      data: {
        key: "totalProducts",
        value: 1,
      },
    })

    const activityLog = await ActivityLog.create({
      user: user._id,
      action: "create_product",
      message: `${newProduct.name} ditambahkan oleh ${user.name}`,
      metadata: newProduct,
    })

    io.emit("activity", {
      message: `Product ${newProduct.name} has created.`,
      data: activityLog,
    })

    io.emit("product", {
      message: `Product ${newProduct.name} has created.`,
      data: {
        action: "create",
        product: newProduct,
      },
    })

    return res.status(201).json({
      message: "Produk berhasil ditambahkan",
      data: { product: newProduct },
    })
  } catch (error) {
    if (image) {
      await cloudinary.uploader.destroy(image.filename)
    }
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res
        .status(400)
        .json({ message: "Masukkan data dengan benar", errors })
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
  console.log(image)
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "ID produk tidak ditemukan", errors: [] })
    }

    const product = await Product.findById(id)
    if (!product) {
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan", errors: [] })
    }

    const validatedData = editProductSchema.parse(data)
    const { name, price, stock, weight } = validatedData

    const existingProduct = await Product.findOne({ name })
    if (existingProduct && product.name !== existingProduct.name) {
      return res.status(400).json({
        message: "Produk sudah ada",
        errors: [{ name: ["nama sudah digunakan"] }],
      })
    }

    const editedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        stock,
        weight,
        image: image ? image.filename : product.image,
      },
      { new: true }
    )

    if (image) {
      fs.unlinkSync(`images/products/${product.image}`)
    }

    const newActivityLog = await ActivityLog.create({
      user: req.user._id,
      action: "update_product",
      message: `${editedProduct.name} diubah oleh ${req.user.name}`,
      metadata: editedProduct,
    })

    const io = getSocket()
    io.emit("activity", {
      message: `Product ${editedProduct.name} has updated.`,
      data: newActivityLog,
    })

    io.emit("product", {
      message: `Product ${editedProduct.name} has updated.`,
      data: {
        action: "edit",
        product: editedProduct,
      },
    })

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
      return res
        .status(400)
        .json({ message: "Masukkan data dengan benar", errors })
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

    const io = getSocket()
    io.emit("stats", {
      message: `Product ${deletedProduct.name} has deleted.`,
      data: {
        key: "totalProducts",
        value: -1,
      },
    })

    const newActivityLog = await ActivityLog.create({
      user: req.user._id,
      action: "delete_product",
      message: `${deletedProduct.name} dihapus oleh ${req.user.name}`,
      metadata: deletedProduct,
    })

    io.emit("activity", {
      message: `Product ${deletedProduct.name} has deleted.`,
      data: newActivityLog,
    })

    io.emit("product", {
      message: `Product ${deletedProduct.name} has deleted.`,
      data: {
        action: "delete",
        product: deletedProduct,
      },
    })

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
