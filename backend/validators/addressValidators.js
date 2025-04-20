import { z } from "zod"

export const addressSchema = z.object({
  kecamatan: z.object({
    name: z
      .string({
        required_error: "Nama kecamatan harus diisi",
        invalid_type_error: "Nama kecamatan harus berupa string",
      })
      .min(3, { message: "Nama kecamatan minimal 3 karakter" }),
    desa: z
      .array(
        z.object({
          name: z
            .string({
              required_error: "Nama kelurahan harus diisi",
              invalid_type_error: "Nama kelurahan harus berupa string",
            })
            .min(3, { message: "Nama kelurahan minimal 3 karakter" }),
          dusun: z
            .array(
              z.string({
                required_error: "Nama dusun harus diisi",
                invalid_type_error: "Nama dusun harus berupa string",
              })
            )
            .min(1, { message: "Minimal ada 1 dusun" }),
        }),
        {
          required_error: "Daftar kelurahan harus diisi",
          invalid_type_error: "Daftar kelurahan harus berupa array",
        }
      )
      .min(1, { message: "Minimal ada 1 kelurahan" }),
  }),
})
