import { Link } from "react-router-dom"
import { XCircle } from "lucide-react"

function PaymentError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center space-y-4">
        <XCircle className="text-red-600 mx-auto" size={60} />
        <h1 className="text-2xl font-bold text-gray-800">Pembayaran Gagal</h1>
        <p className="text-gray-600">
          Maaf, terjadi kesalahan saat memproses pembayaran Anda. Silakan coba
          lagi.
        </p>
        <Link
          to="/checkout"
          className="inline-block bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
        >
          Kembali ke Checkout
        </Link>
      </div>
    </div>
  )
}

export default PaymentError
