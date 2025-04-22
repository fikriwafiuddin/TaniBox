import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import userLoginSchema from "../../validations/userLoginSchema"
import { login } from "../../store/thunk/authThunk"
import { useDispatch, useSelector } from "react-redux"

function Login() {
  const { isLoadingLogin } = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(userLoginSchema),
    mode: "onSubmit",
  })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(login(data))
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
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              {...register("email")}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              {...register("password")}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoadingLogin}
            className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600 transition"
          >
            {isLoadingLogin ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Belum punya akun?{" "}
          <Link
            to="/auth/register"
            className="text-lime-600 hover:underline font-medium"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
