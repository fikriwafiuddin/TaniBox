import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
  kecamatan: {
    name: {
      type: String,
      required: true,
    },
    desa: [
      {
        name: {
          type: String,
          required: true,
        },
        dusun: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
})

const Address = mongoose.model("Address", addressSchema)
export default Address
