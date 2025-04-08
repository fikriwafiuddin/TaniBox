import { FaUser, FaShoppingCart, FaCheckCircle } from "react-icons/fa"

function OrderStepsSection() {
  return (
    <section id="pesan" className="scroll-mt-24 py-12 px-4 bg-white">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-lime-600 mb-2">
          Cara Pemesanan
        </h2>
        <p className="text-gray-600 mb-10">
          Ikuti langkah mudah berikut untuk memesan sayur segar favoritmu di
          TaniBox 🌿
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {/* Step 1: Login */}
          <div className="flex flex-col items-center text-center p-6 bg-lime-50 rounded-md shadow-md">
            <FaUser className="text-lime-600 text-4xl mb-4" />
            <h4 className="text-lg font-semibold mb-2">1. Login / Daftar</h4>
            <p className="text-sm text-gray-600">
              Masuk ke akun kamu atau daftar jika belum punya akun.
            </p>
          </div>

          {/* Step 2: Pilih Produk */}
          <div className="flex flex-col items-center text-center p-6 bg-lime-50 rounded-md shadow-md">
            <FaShoppingCart className="text-lime-600 text-4xl mb-4" />
            <h4 className="text-lg font-semibold mb-2">2. Pilih Produk</h4>
            <p className="text-sm text-gray-600">
              Telusuri katalog sayuran kami dan masukkan ke keranjang.
            </p>
          </div>

          {/* Step 3: Konfirmasi Pesanan */}
          <div className="flex flex-col items-center text-center p-6 bg-lime-50 rounded-md shadow-md">
            <FaCheckCircle className="text-lime-600 text-4xl mb-4" />
            <h4 className="text-lg font-semibold mb-2">
              3. Konfirmasi & Bayar
            </h4>
            <p className="text-sm text-gray-600">
              Cek kembali pesanan, pilih metode pembayaran, dan konfirmasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderStepsSection
