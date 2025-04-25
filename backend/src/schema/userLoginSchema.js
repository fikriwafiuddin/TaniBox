import { z } from "zod"

const userLoginSchema = z.object({
  email: z
    .string({
      required_error: "Email harus diisi",
      invalid_type_error: "Email harus berupa string",
    })
    .email({ message: "Email tidak valid" }),
  password: z.string({
    required_error: "Password harus diisi",
    invalid_type_error: "Password harus berupa string",
  }),
})

export default userLoginSchema
