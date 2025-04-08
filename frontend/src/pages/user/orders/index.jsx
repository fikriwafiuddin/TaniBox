import React from "react"
import { useNavigate } from "react-router-dom"
import Order from "./Order"

const orders = [
  {
    id: 1,
    nama: "Dewi Lestari",
    waktu: "2025-04-07 10:23",
    total: 23000,
    alamat: {
      kecamatan: "Jetis",
      desa: "Mulyoarjo",
      dusun: "Karanganyar",
      rt: "02/05",
      deskripsi: "Sebelah masjid Nurul Huda",
    },
    status: "Menunggu Konfirmasi",
  },
  {
    id: 2,
    nama: "Andi Pratama",
    waktu: "2025-04-06 15:10",
    total: 42000,
    alamat: {
      kecamatan: "Tegaltirto",
      desa: "Srihardono",
      dusun: "Ngadipiro",
      rt: "01/03",
      deskripsi: "Belakang SDN 2",
    },
    status: "Diproses",
  },
]

const Orders = () => {
  const navigate = useNavigate()
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
            <Order order={order} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Orders
