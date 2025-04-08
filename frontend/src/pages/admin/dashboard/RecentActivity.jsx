function RecentActivity() {
  return (
    <div className="mt-10 bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Aktivitas Terbaru
      </h2>
      <ul className="space-y-3 text-sm text-gray-700">
        <li>
          📦 Pesanan baru dari <strong>Rina</strong>
        </li>
        <li>
          👤 Pengguna baru: <strong>user123@gmail.com</strong>
        </li>
        <li>
          🛒 Produk <strong>Kangkung Segar</strong> ditambahkan
        </li>
        <li>✅ Pesanan ID #1023 diselesaikan</li>
      </ul>
    </div>
  )
}

export default RecentActivity
