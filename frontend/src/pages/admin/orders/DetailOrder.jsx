import { useDispatch, useSelector } from "react-redux"
import { setSelectedOrder } from "../../../store/slice/orderSlice"
import formatDate from "../../../helpers/formatDate"
import {
  deleteOrder,
  deliveredOrder,
  rejectOrder,
  sendOrder,
  undeliveredOrder,
} from "../../../store/thunk/orderThunk"

function DetailOrder() {
  const {
    selectedOrder,
    isLoadingSendOrder,
    isLoadingRejectOrder,
    isLoadingDeliveredOrder,
    isLoadingUndeliveredOrder,
    isLoadingDeleteOrder,
  } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  const handleUnSelectOrder = () => dispatch(setSelectedOrder(null))

  const handleAccept = () => {
    dispatch(sendOrder(selectedOrder._id))
  }

  const handleReject = () => {
    dispatch(rejectOrder(selectedOrder._id))
  }

  const hanldeUndeliver = () => {
    dispatch(undeliveredOrder(selectedOrder._id))
  }

  const handleDelete = () => {
    dispatch(deleteOrder(selectedOrder._id))
  }

  const handleDelivered = () => {
    dispatch(deliveredOrder(selectedOrder._id))
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="mb-2">
        <strong>Nama:</strong> {selectedOrder.address.name}
      </p>
      <p className="mb-2">
        <strong>Waktu:</strong> {formatDate(selectedOrder.createdAt)}
      </p>
      <p className="mb-4">
        <strong>Status:</strong> {selectedOrder.status}
      </p>

      {/* Alamat */}
      <h2 className="font-semibold text-lg mb-2">Alamat Pengiriman:</h2>
      <div className="mb-4 space-y-1">
        <p>
          <strong>Nama:</strong> {selectedOrder.address.name}
        </p>
        <p>
          <strong>Email:</strong> {selectedOrder.address.email}
        </p>
        <p>
          <strong>No HP:</strong> {selectedOrder.address.noHp}
        </p>
        <p>
          <strong>Kecamatan:</strong> {selectedOrder.address.kecamatan}
        </p>
        <p>
          <strong>Desa:</strong> {selectedOrder.address.desa}
        </p>
        <p>
          <strong>Dusun:</strong> {selectedOrder.address.dusun}
        </p>
        <p>
          <strong>RT:</strong> {selectedOrder.address.rt}
        </p>
        <p>
          <strong>Deskripsi:</strong> {selectedOrder.address.description}
        </p>
      </div>

      <h2 className="font-semibold text-lg mb-2">Barang yang Dibeli:</h2>
      <ul className="mb-4 list-disc pl-5">
        {selectedOrder.orderItems.map((item, index) => (
          <li key={index}>
            {item.name} — {item.quantity}x @ Rp {item.price.toLocaleString()}
          </li>
        ))}
      </ul>

      <label className="block mb-2 font-medium">Ubah Status</label>
      <div className="flex gap-3 mb-6">
        {(selectedOrder.status === "paid" ||
          selectedOrder.status === "undelivered") && (
          <button
            onClick={handleAccept}
            disabled={isLoadingSendOrder}
            className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isLoadingSendOrder ? "Loading..." : "kirim"}
          </button>
        )}
        {selectedOrder.status === "shipped" && (
          <button
            onClick={handleDelivered}
            disabled={isLoadingDeliveredOrder}
            className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isLoadingDeliveredOrder ? "Loading..." : "Diterima"}
          </button>
        )}
        {selectedOrder.status === "shipped" && (
          <button
            onClick={hanldeUndeliver}
            disabled={isLoadingUndeliveredOrder}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {isLoadingUndeliveredOrder ? "Loading..." : "Gagal kirim"}
          </button>
        )}
        {selectedOrder.status !== "delivered" &&
          selectedOrder.status !== "cancelled" && (
            <button
              onClick={handleReject}
              disabled={isLoadingRejectOrder}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {isLoadingRejectOrder ? "Loading..." : "Tolak"}
            </button>
          )}
        {selectedOrder.status === "delivered" &&
          selectedOrder.status === "cancelled" && (
            <button
              onClick={handleDelete}
              disabled={isLoadingDeleteOrder}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {isLoadingDeleteOrder ? "Loading..." : "Hapus"}
            </button>
          )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleUnSelectOrder}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Kembali
        </button>
      </div>
    </div>
  )
}

export default DetailOrder
