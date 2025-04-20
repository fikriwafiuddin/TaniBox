import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { register } from "../../store/thunk/authThunk"
import { useDispatch, useSelector } from "react-redux"
import { userRegistrationSchema } from "../../validations/userRegisterSchema"

function Register() {
  const { isLoadingRegister } = useSelector((state) => state.user)
  const {
    register: registerHook,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(userRegistrationSchema),
    mode: "onSubmit",
  })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(register(data))
      .unwrap()
      .catch((backendErrors) => {
        for (const key in backendErrors?.errors) {
          setError(key, { message: backendErrors.errors[key][0] })
        }
      })
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-lime-600">
          Registrasi
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm text-gray-700">
              Nama
            </label>
            <input
              id="name"
              type="text"
              name="nama"
              {...registerHook("name")}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              {...registerHook("email")}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="noHp" className="block mb-1 text-sm text-gray-700">
              Nomor HP
            </label>
            <input
              id="noHp"
              type="tel"
              name="noHp"
              {...registerHook("noHp")}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.noHp && (
              <p className="text-red-500 text-sm">{errors.noHp.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              {...registerHook("password")}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm text-gray-700"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              {...registerHook("confirmPassword")}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600 transition"
          >
            {isLoadingRegister ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Sudah punya akun?{" "}
          <Link
            to="/auth/login"
            className="text-lime-600 hover:underline font-medium"
          >
            Login di sini
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
