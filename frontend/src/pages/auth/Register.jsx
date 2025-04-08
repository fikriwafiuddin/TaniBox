import { useState } from "react"
import { Link } from "react-router-dom"

function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    hp: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert("Password dan konfirmasi tidak cocok")
      return
    }
    // Kirim data ke backend untuk registrasi
    console.log("Register:", form)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-lime-600">
          Registrasi
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700">Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Nomor HP</label>
            <input
              type="tel"
              name="hp"
              value={form.hp}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600 transition"
          >
            Daftar
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
