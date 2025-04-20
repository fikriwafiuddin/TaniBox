import { useEffect } from "react"
import TableOrders from "./TableOrders"
import DetailOrder from "./DetailOrder"
import Filter from "./Filter"
import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "../../../store/thunk/orderThunk"

function AdminOrders() {
  const { isLoadingGetOrders, selectedOrder, orders } = useSelector(
    (state) => state.order
  )
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Kelola Pesanan"
  }, [])

  useEffect(() => {
    dispatch(getOrders("paid"))
  }, [dispatch])

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-lime-600">
          Kelola Pesanan {selectedOrder && `/ #${selectedOrder._id}`}
        </h1>

        {!selectedOrder && <Filter />}
      </div>

      {isLoadingGetOrders ? (
        <div className="w-full flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-lime-600 border-t-transparent"></div>
        </div>
      ) : !selectedOrder && orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10">
          Tidak ada pesanan yang ditemukan.
        </div>
      ) : !selectedOrder ? (
        <TableOrders />
      ) : (
        <DetailOrder />
      )}
    </>
  )
}

export default AdminOrders
