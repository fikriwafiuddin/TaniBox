import { useDispatch, useSelector } from "react-redux"
import { setSelectedOrder } from "../../../store/slice/orderSlice"
import formatDate from "../../../helpers/formatDate"

function TableOrders() {
  const { orders } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  const handleViewDetail = (order) => dispatch(setSelectedOrder(order))

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-lime-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left hidden sm:block">
              Nama Pemesan
            </th>
            <th className="px-4 py-3 text-left">Waktu Order</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="px-4 py-3 text-sm">#{order._id}</td>
              <td className="px-4 py-3 hidden sm:block">
                {order.address.name}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </td>
              <td className="px-4 py-3">{order.status}</td>
              <td className="px-4 py-3 text-center space-x-2">
                <button
                  className="text-lime-600 hover:underline"
                  onClick={() => handleViewDetail(order)}
                >
                  Lihat Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableOrders
