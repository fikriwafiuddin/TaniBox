import { z } from "zod"

const addProductCartSchema = z.object({
  quantity: z
    .number({
      required_error: "Jumlah produk harus diisi",
      invalid_type_error: "Jumlah produk harus berupa angka",
    })
    .int({ message: "Jumlah harus bilangan bulat" })
    .nonnegative({ message: "Jumlah tidak boleh negatif" }),
})

export default addProductCartSchema
