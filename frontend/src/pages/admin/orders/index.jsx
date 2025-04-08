import { useEffect, useState } from "react"
import TableOrders from "./TableOrders"
import DetailOrder from "./DetailOrder"
import Filter from "./Filter"

function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Rina",
      status: "Diproses",
      time: "2025-04-07 09:30",
      items: [
        { name: "Kangkung", quantity: 2, price: 5000 },
        { name: "Bayam", quantity: 1, price: 4000 },
      ],
    },
    {
      id: 2,
      customer: "Budi",
      status: "Dikirim",
      time: "2025-04-06 14:10",
      items: [{ name: "Cabai Merah", quantity: 1, price: 10000 }],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
    {
      id: 3,
      customer: "Siti",
      status: "Selesai",
      time: "2025-04-05 10:15",
      items: [
        { name: "Tomat", quantity: 3, price: 3000 },
        { name: "Bawang Putih", quantity: 2, price: 8000 },
      ],
    },
  ])

  const [filterStatus, setFilterStatus] = useState("Semua")
  const [sortOrder, setSortOrder] = useState("terbaru")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newStatus, setNewStatus] = useState("")

  useEffect(() => {
    document.title = "Kelola Pesanan"
  }, [])

  const handleViewDetail = (order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
  }

  const handleConfirmStatusUpdate = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    )
    setSelectedOrder(null)
  }

  const filteredOrders = orders.filter((order) =>
    filterStatus === "Semua" ? true : order.status === filterStatus
  )

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.time)
    const dateB = new Date(b.time)
    return sortOrder === "terbaru" ? dateB - dateA : dateA - dateB
  })

  const statusOptions = [
    "Menunggu Pembayaran",
    "Pembayaran Gagal",
    "Diproses",
    "Dikirim",
    "Selesai",
    "Ditolak",
  ]

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-lime-600">
          Kelola Pesanan {selectedOrder && `/ #${selectedOrder.id}`}
        </h1>

        {!selectedOrder && (
          <Filter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            statusOptions={statusOptions}
          />
        )}
      </div>

      {!selectedOrder ? (
        <TableOrders
          sortedOrders={sortedOrders}
          handleViewDetail={handleViewDetail}
        />
      ) : (
        <DetailOrder
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          handleConfirmStatusUpdate={handleConfirmStatusUpdate}
          statusOptions={statusOptions}
        />
      )}
    </>
  )
}

export default AdminOrders
