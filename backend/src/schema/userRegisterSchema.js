import { z } from "zod"

const userRegistrationSchema = z
  .object({
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
    password: z
      .string({
        required_error: "Password harus diisi",
        invalid_type_error: "Password harus berupa string",
      })
      .min(6, { message: "Password minimal 6 karakter" })
      .max(50, { message: "Password maksimal 50 karakter" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password harus mengandung minimal 1 huruf kapital",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password harus mengandung minimal 1 angka",
      }),
    confirmPassword: z.string({
      required_error: "Konfirmasi password harus diisi",
      invalid_type_error: "Konfirmasi password harus berupa string",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  })

export default userRegistrationSchema
