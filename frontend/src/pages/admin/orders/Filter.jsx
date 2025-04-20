import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilterStatus, sortByDate } from "../../../store/slice/orderSlice"
import { getOrders } from "../../../store/thunk/orderThunk"

function Filter() {
  const { filterStatus } = useSelector((state) => state.order)
  const [sortOrder, setSortOrder] = useState("oldest")
  const dispatch = useDispatch()

  const statusOptions = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
    "undelivered",
  ]
  const handleSort = (type) => {
    setSortOrder(type)
    dispatch(sortByDate(type))
  }
  const handleFilter = (status) => {
    dispatch(setFilterStatus(status))
    dispatch(getOrders(status))
  }

  return (
    <div className="flex gap-4">
      <select
        value={filterStatus}
        onChange={(e) => handleFilter(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="all">Semua Status</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => handleSort(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="oldest">Terlama</option>
        <option value="latest">Terbaru</option>
      </select>
    </div>
  )
}

export default Filter
