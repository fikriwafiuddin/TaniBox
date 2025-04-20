import { Link } from "react-router-dom"
import { AlertTriangle } from "lucide-react"

function ServerError() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-lime-100 p-4 rounded-full">
            <AlertTriangle className="text-lime-600 w-10 h-10" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-lime-600 mb-4">500</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Terjadi kesalahan server
        </h2>
        <p className="text-gray-600 mb-6">
          Maaf, ada sesuatu yang salah di sisi kami. Silakan coba beberapa saat
          lagi.
        </p>
        <Link
          to="/"
          className="inline-block bg-lime-500 text-white px-6 py-2 rounded hover:bg-lime-600 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  )
}

export default ServerError
