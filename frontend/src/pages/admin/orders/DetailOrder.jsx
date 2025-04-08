function DetailOrder({
  selectedOrder,
  setSelectedOrder,
  newStatus,
  setNewStatus,
  handleConfirmStatusUpdate,
  statusOptions,
}) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="mb-2">
        <strong>Nama:</strong> {selectedOrder.customer}
      </p>
      <p className="mb-2">
        <strong>Waktu:</strong> {selectedOrder.time}
      </p>
      <p className="mb-4">
        <strong>Status:</strong> {selectedOrder.status}
      </p>

      {/* Alamat */}
      <h2 className="font-semibold text-lg mb-2">Alamat Pengiriman:</h2>
      <div className="mb-4 space-y-1">
        <p>
          <strong>Nama:</strong> {"selectedOrder.address?.name"}
        </p>
        <p>
          <strong>Email:</strong> {"selectedOrder.address?.email"}
        </p>
        <p>
          <strong>No HP:</strong> {"selectedOrder.address?.phone"}
        </p>
        <p>
          <strong>Kecamatan:</strong> {"selectedOrder.address?.kecamatan"}
        </p>
        <p>
          <strong>Desa:</strong> {"selectedOrder.address?.desa"}
        </p>
        <p>
          <strong>Dusun:</strong> {"selectedOrder.address?.dusun"}
        </p>
        <p>
          <strong>RT:</strong> {"selectedOrder.address?.rt"}
        </p>
        <p>
          <strong>Deskripsi:</strong> {"selectedOrder.address?.description"}
        </p>
      </div>

      <h2 className="font-semibold text-lg mb-2">Barang yang Dibeli:</h2>
      <ul className="mb-4 list-disc pl-5">
        {selectedOrder.items.map((item, index) => (
          <li key={index}>
            {item.name} — {item.quantity}x @ Rp {item.price.toLocaleString()}
          </li>
        ))}
      </ul>

      <label className="block mb-2 font-medium">Ubah Status</label>
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setSelectedOrder(null)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Kembali
        </button>
        <button
          onClick={handleConfirmStatusUpdate}
          className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700"
        >
          Simpan
        </button>
      </div>
    </div>
  )
}

export default DetailOrder
