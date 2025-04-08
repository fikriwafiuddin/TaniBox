function Order({ order }) {
  return (
    <div
      key={order.id}
      className="bg-white rounded-lg shadow p-6 border-l-4 border-lime-500"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">
          Pemesan: {order.nama}
        </h3>
        <span className="text-sm text-gray-500">{order.waktu}</span>
      </div>

      <p className="text-gray-700 font-medium">
        Total: Rp{order.total.toLocaleString()}
      </p>

      <div className="mt-2 text-sm text-gray-600">
        <p>
          <strong>Alamat:</strong> {order.alamat.dusun}, RT {order.alamat.rt},{" "}
          {order.alamat.desa}, {order.alamat.kecamatan}
        </p>
        <p>
          <strong>Deskripsi:</strong> {order.alamat.deskripsi}
        </p>
      </div>

      <div className="mt-4">
        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
          {order.status}
        </span>
      </div>
    </div>
  )
}

export default Order
