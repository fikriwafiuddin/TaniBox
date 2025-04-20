import { useState } from "react"
import { motion as Motion, AnimatePresence } from "framer-motion"

function Order({ order }) {
  const [showItems, setShowItems] = useState(false)

  const toggleItems = () => {
    setShowItems((prev) => !prev)
  }

  return (
    <div
      key={order.id}
      className="bg-white rounded-lg shadow p-6 border-l-4 border-lime-500"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">
          Pemesan: {order.address.name}
        </h3>
        <span className="text-sm text-gray-500">{order.waktu}</span>
      </div>

      <p className="text-gray-700 font-medium">
        Total: Rp {order.amount.toLocaleString()}
      </p>

      <div className="mt-2 text-sm text-gray-600">
        <p>
          <strong>Nomor HP:</strong> {order.address.noHp}
        </p>
        <p>
          <strong>Email:</strong> {order.address.email}
        </p>
        <p>
          <strong>Alamat:</strong> {order.address.dusun}, RT {order.address.rt},
          RW {order.address.rw}, {order.address.desa}, {order.address.kecamatan}
        </p>
        <p>
          <strong>Deskripsi:</strong> {order.address.description || "-"}
        </p>
      </div>

      <div className="mt-4">
        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
          {order.status}
        </span>
      </div>

      {/* Tombol Toggle */}
      <div className="mt-6">
        <button
          onClick={toggleItems}
          className="text-sm text-lime-600 hover:underline"
        >
          {showItems ? "Tutup Detail Produk" : "Lihat Detail Produk"}
        </button>
      </div>

      {/* Animasi Produk */}
      <AnimatePresence>
        {showItems && (
          <Motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Produk yang Dibeli:
            </h4>
            <ul className="space-y-2">
              {order.orderItems.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center text-sm border-b pb-2"
                >
                  <div>
                    <p className="font-medium text-gray-700">{item.name}</p>
                    <p className="text-gray-500">Jumlah: {item.quantity}</p>
                  </div>
                  <p className="text-gray-700 font-semibold">
                    Rp {item.price.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Order
