import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  address: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    noHp: { type: String, required: true },
    kecamatan: { type: String, required: true },
    kelurahan: { type: String, required: true },
    rt: { type: String, required: true },
    rw: { type: String, required: true },
    description: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
})

const Order = mongoose.model("Order", orderSchema)
export default Order
