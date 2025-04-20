import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ConfirmDialog from "../../../components/ConfirmDialog"
import { deleteProduct } from "../../../store/thunk/productThunk"

function TableProducts({ setSeletedProduct }) {
  const { products, isLoadingDeleteProduct } = useSelector(
    (state) => state.product
  )
  const [selectedProductId, setSelectedProductId] = useState(null)
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteProduct(selectedProductId))
      .unwrap()
      .then(() => {
        setSelectedProductId(null)
      })
  }
  return (
    <div className="overflow-x-auto">
      <ConfirmDialog
        message="Yakin ingin menghapus produk ini?"
        isOpen={!!selectedProductId}
        isLoading={isLoadingDeleteProduct}
        onConfirm={handleDelete}
        onCancel={() => setSelectedProductId(null)}
      />
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
          {products.map((product, index) => (
            <tr
              key={product._id}
              className="border-t text-sm hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4">Rp{product.price.toLocaleString()}</td>
              <td className="py-3 px-4">{product.stock}</td>
              <td className="py-3 px-4 space-x-2">
                <button
                  onClick={() => setSeletedProduct(product)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => setSelectedProductId(product._id)}
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
