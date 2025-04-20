import { z } from "zod"

const addressSchema = z.object({
  name: z
    .string({
      required_error: "Nama harus diisi",
      invalid_type_error: "Nama harus berupa string",
    })
    .min(3, { message: "Nama minimal 3 karakter" })
    .max(100, { message: "Nama maksimal 100 karakter" }),
  email: z
    .string({
      required_error: "Email harus diisi",
      invalid_type_error: "Email harus berupa string",
    })
    .email({ message: "Email tidak valid" })
    .max(100, { message: "Email maksimal 100 karakter" }),
  noHp: z
    .string({
      required_error: "Nomor HP harus diisi",
      invalid_type_error: "Nomor HP harus berupa string",
    })
    .min(10, { message: "Nomor HP minimal 10 karakter" })
    .max(15, { message: "Nomor HP maksimal 15 karakter" })
    .regex(/^[0-9]+$/, { message: "Nomor HP hanya boleh berisi angka" }),
  kecamatan: z
    .string({
      required_error: "Kecamatan harus diisi",
      invalid_type_error: "Kecamatan harus berupa string",
    })
    .min(1, { message: "Kecamatan harus diisi" }),
  desa: z
    .string({
      required_error: "Desa harus diisi",
      invalid_type_error: "Desa harus berupa string",
    })
    .min(1, { message: "Desa harus diisi" }),
  dusun: z
    .string({
      required_error: "Dusun harus diisi",
      invalid_type_error: "Dusun harus berupa string",
    })
    .min(1, { message: "Dusun harus diisi" }),
  rt: z
    .string()
    .regex(/^\d{3}$/, "RT harus terdiri dari 3 digit angka (contoh: 001)"),
  rw: z
    .string()
    .regex(/^\d{3}$/, "RW harus terdiri dari 3 digit angka (contoh: 001)"),
  description: z
    .string({
      required_error: "Deskripsi harus diisi",
      invalid_type_error: "Deskripsi harus berupa string",
    })
    .max(1000, { message: "Deskripsi maksimal 1000 karakter" }),
})

export default addressSchema
