import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    lockedStock: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model("Product", productSchema)
export default Product
