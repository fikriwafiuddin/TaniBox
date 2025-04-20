import { z } from "zod"

const userLoginSchema = z.object({
  email: z.string({ required_error: "Email harus diisi" }),
  // .min(1, { message: "Email harus diisi" })
  // .email({ message: "Email tidak valid" }),

  password: z
    .string({ required_error: "Password harus diisi" })
    .min(1, { message: "Password harus diisi" }),
})

export default userLoginSchema
