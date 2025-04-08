function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <h2 className="text-gray-600 text-sm mb-1">Total Produk</h2>
        <p className="text-3xl font-bold text-lime-600">24</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <h2 className="text-gray-600 text-sm mb-1">Total Pesanan</h2>
        <p className="text-3xl font-bold text-lime-600">152</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <h2 className="text-gray-600 text-sm mb-1">Pengguna Terdaftar</h2>
        <p className="text-3xl font-bold text-lime-600">87</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <h2 className="text-gray-600 text-sm mb-1">Total Penjualan</h2>
        <p className="text-3xl font-bold text-lime-600">Rp 3.240.000</p>
      </div>
    </div>
  )
}

export default Stats
