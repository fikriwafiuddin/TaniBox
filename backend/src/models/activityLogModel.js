import mongoose from "mongoose"

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  action: {
    type: String,
    enum: [
      "create_order",
      "payment_order",
      "send_order",
      "receive_order",
      "cancel_order",
      "register",
      "create_product",
      "update_product",
      "delete_product",
      "add_address",
      "update_address",
      "delete_address",
    ],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  metadata: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30,
  },
})

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema)
export default ActivityLog
