import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateCartItem } from "../../../store/thunk/cartThunk"
import { useDebounce } from "../../../helpers/useDebounce"
import AddressForm from "./AddressForm"

function Cart({ onClose }) {
  const { cart, isLoadingEditProductCart } = useSelector((state) => state.cart)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [quantities, setQuantities] = useState({})
  const debouncedQuantities = useDebounce(quantities, 600)
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    for (const productId in debouncedQuantities) {
      const newQty = parseInt(debouncedQuantities[productId])
      const originalItem = cart.find((item) => item.product._id === productId)

      if (originalItem && !isNaN(newQty) && newQty !== originalItem.quantity) {
        dispatch(updateCartItem({ id: productId, quantity: newQty }))
      }
    }
  }, [debouncedQuantities, cart, dispatch])

  const increaseQty = (id, currentQty) => {
    dispatch(updateCartItem({ id, quantity: currentQty + 1 }))
  }

  const decreaseQty = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateCartItem({ id, quantity: currentQty - 1 }))
    } else {
      dispatch(updateCartItem({ id, quantity: 0 }))
    }
  }

  const removeItem = (id) => {
    dispatch(updateCartItem({ id, quantity: 0 }))
  }

  const totalHarga = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 400)
  }

  const handleCheckout = () => {
    setShowAddressForm(true)
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
            <AddressForm />
          ) : cart.length === 0 ? (
            <p className="text-center text-gray-500">Keranjang masih kosong.</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="relative bg-gray-50 shadow rounded-lg p-4"
                >
                  <button
                    type="button"
                    onClick={() => removeItem(item.product._id)}
                    className="absolute top-0 right-1 text-lg cursor-pointer"
                    title="Hapus produk"
                  >
                    ✕
                  </button>

                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-500">
                        Rp{item.product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 relative">
                      <button
                        onClick={() =>
                          decreaseQty(item.product._id, item.quantity)
                        }
                        disabled={isLoadingEditProductCart}
                        className="bg-gray-200 px-3 py-1 rounded text-lg"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        disabled={isLoadingEditProductCart}
                        className="w-16 text-center border rounded"
                        value={quantities[item.product._id] ?? item.quantity}
                        onChange={(e) => {
                          const val = e.target.value
                          if (/^\d*$/.test(val)) {
                            setQuantities((prev) => ({
                              ...prev,
                              [item.product._id]: val,
                            }))
                          }
                        }}
                      />
                      <button
                        onClick={() =>
                          increaseQty(item.product._id, item.quantity)
                        }
                        disabled={isLoadingEditProductCart}
                        className="bg-gray-200 px-3 py-1 rounded text-lg"
                      >
                        +
                      </button>

                      {isLoadingEditProductCart && (
                        <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>

                    <div className="text-right font-medium text-gray-700">
                      Rp{(item.product.price * item.quantity).toLocaleString()}
                    </div>
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
