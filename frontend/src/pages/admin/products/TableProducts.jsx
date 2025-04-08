import { useState } from "react"

function TableProducts({ showEdit }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Bayam Segar",
      price: 5000,
      stock: 50,
      description: "Sayur hijau segar dari petani lokal",
    },
    {
      id: 2,
      name: "Tomat Merah",
      price: 4000,
      stock: 30,
      description: "Tomat merah segar untuk masakan Anda",
    },
  ])

  const handleDelete = (id) => {
    const confirm = window.confirm("Yakin ingin menghapus produk ini?")
    if (confirm) {
      setProducts(products.filter((product) => product.id !== id))
    }
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
        <thead>
          <tr className="bg-lime-100 text-left text-gray-700 text-sm">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Nama Produk</th>
            <th className="py-3 px-4">Harga</th>
            <th className="py-3 px-4">Stok</th>
            <th className="py-3 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr
              key={item.id}
              className="border-t text-sm hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{item.name}</td>
              <td className="py-3 px-4">Rp{item.price.toLocaleString()}</td>
              <td className="py-3 px-4">{item.stock}</td>
              <td className="py-3 px-4 space-x-2">
                <button
                  onClick={showEdit}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                Tidak ada produk.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableProducts
