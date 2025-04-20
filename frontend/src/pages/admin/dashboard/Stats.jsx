import { useSelector } from "react-redux"

function Stats() {
  const { stats, isLoadingGetStats } = useSelector((state) => state.stats)

  if (isLoadingGetStats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <h2 className="text-gray-600 text-sm mb-1">Total Produk</h2>
        <p className="text-3xl font-bold text-lime-600">
          {stats?.totalProducts}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <h2 className="text-gray-600 text-sm mb-1">Total Pesanan</h2>
        <p className="text-3xl font-bold text-lime-600">{stats?.totalOrders}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <h2 className="text-gray-600 text-sm mb-1">Pengguna Terdaftar</h2>
        <p className="text-3xl font-bold text-lime-600">{stats?.totalUsers}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <h2 className="text-gray-600 text-sm mb-1">Total Penjualan</h2>
        <p className="text-3xl font-bold text-lime-600">
          Rp {stats?.totalRevenue.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default Stats
