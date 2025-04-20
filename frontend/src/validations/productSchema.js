import { z } from "zod"

const productSchema = z.object({
  name: z
    .string({
      required_error: "Nama produk harus diisi",
      invalid_type_error: "Nama produk harus berupa string",
    })
    .min(3, { message: "Nama produk minimal 3 karakter" })
    .max(100, { message: "Nama produk maksimal 100 karakter" }),

  price: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "Harga produk harus diisi",
        invalid_type_error: "Harga produk harus berupa angka",
      })
      .positive({ message: "Harga produk harus lebih dari 0" })
      .max(1000000000, { message: "Harga produk terlalu besar" })
  ),

  stock: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "Stok produk harus diisi",
        invalid_type_error: "Stok produk harus berupa angka",
      })
      .int({ message: "Stok harus bilangan bulat" })
      .nonnegative({ message: "Stok tidak boleh negatif" })
  ),

  weight: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "Berat produk harus diisi",
        invalid_type_error: "Berat produk harus berupa angka",
      })
      .positive({ message: "Berat produk harus lebih dari 0" })
      .max(1000000000, { message: "Berat produk terlalu besar" })
  ),
})

export default productSchema
