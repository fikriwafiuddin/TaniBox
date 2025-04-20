import { useNavigate } from "react-router-dom"
import Order from "./Order"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getMyOrders } from "../../../store/thunk/orderThunk"

const Orders = () => {
  const { orders, isLoadingGetMyOrders } = useSelector((state) => state.order)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  if (isLoadingGetMyOrders) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-lime-600 hover:underline"
      >
        ← Kembali
      </button>
      <h2 className="text-3xl font-bold text-lime-600 mb-8 text-center">
        Riwayat Pesanan
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada pesanan.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Order key={order._id} order={order} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Orders
