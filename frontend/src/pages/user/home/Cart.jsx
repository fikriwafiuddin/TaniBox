import { useEffect, useState } from "react"

function Cart({ onClose }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Bayam Segar", price: 5000, quantity: 2 },
    { id: 2, name: "Tomat Merah", price: 4000, quantity: 1 },
  ])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [alamatData, setAlamatData] = useState({
    nama: "",
    email: "",
    telepon: "",
    kecamatan: "",
    desa: "",
    dusun: "",
    rt: "",
    deskripsi: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const totalHarga = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 400)
  }

  const handleCheckout = () => {
    setCartItems([]) // Hapus isi keranjang
    setShowAddressForm(true)
  }

  const handleAlamatChange = (e) => {
    const { name, value } = e.target
    setAlamatData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitAlamat = (e) => {
    e.preventDefault()
    alert("Pesanan akan dikirim ke:\n" + JSON.stringify(alamatData, null, 2))
    setShowAddressForm(false)
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div
        className={`w-full max-w-md bg-white shadow-lg h-full overflow-y-auto transform transition-transform duration-500 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-bold text-lime-600">Keranjang Belanja</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          {showAddressForm ? (
            <form onSubmit={handleSubmitAlamat} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Alamat Pengiriman
              </h3>
              <input
                type="text"
                name="nama"
                placeholder="Nama Pemesan"
                required
                onChange={handleAlamatChange}
                className="w-full border rounded p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleAlamatChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="telepon"
                placeholder="Nomor Telepon"
                required
                onChange={handleAlamatChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="kecamatan"
                placeholder="Kecamatan"
                required
                onChange={handleAlamatChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="desa"
                placeholder="Desa"
                required
                onChange={handleAlamatChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="dusun"
                placeholder="Dusun"
                required
                onChange={handleAlamatChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="rt"
                placeholder="RT"
                required
                onChange={handleAlamatChange}
                className="w-full border rounded p-2"
              />
              <textarea
                name="deskripsi"
                placeholder="Deskripsi Alamat Lengkap"
                rows={3}
                required
                onChange={handleAlamatChange}
                className="w-full border rounded p-2"
              />
              <button
                type="submit"
                className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600 transition"
              >
                Konfirmasi Pesanan
              </button>
            </form>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Keranjang masih kosong.</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 shadow rounded-lg p-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-500">
                      Rp{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-gray-200 px-3 py-1 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="bg-gray-200 px-3 py-1 rounded text-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right font-medium text-gray-700">
                    Rp{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
              <div className="text-right mt-6">
                <p className="text-lg font-semibold text-lime-700">
                  Total: Rp{totalHarga.toLocaleString()}
                </p>
                <button
                  onClick={handleCheckout}
                  className="mt-4 bg-lime-500 text-white px-6 py-2 rounded hover:bg-lime-600 transition"
                >
                  Checkout Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
