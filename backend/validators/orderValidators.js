import { z } from "zod"

export const orderSchema = z.object({
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
  kecamatan: z.string({
    required_error: "Kecamatan harus diisi",
    invalid_type_error: "Kecamatan harus berupa string",
  }),
  desa: z.string({
    required_error: "Kelurahan harus diisi",
    invalid_type_error: "Kelurahan harus berupa string",
  }),
  dusun: z.string({
    required_error: "Dusun harus diisi",
    invalid_type_error: "Dusun harus berupa string",
  }),
  rw: z.string({
    required_error: "RW harus diisi",
    invalid_type_error: "RW harus berupa string",
  }),
  rt: z.string({
    required_error: "RT harus diisi",
    invalid_type_error: "RT harus berupa string",
  }),
  description: z
    .string({
      required_error: "Deskripsi harus diisi",
      invalid_type_error: "Deskripsi harus berupa string",
    })
    .max(1000, { message: "Deskripsi maksimal 1000 karakter" }),
})
