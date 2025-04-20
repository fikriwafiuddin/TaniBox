import { useState, useEffect } from "react"
import TableProducts from "./TableProducts"
import FormAdd from "./FormAdd"
import FormEdit from "./FormEdit"
import { useDispatch } from "react-redux"
import { getProductsByAdmin } from "../../../store/thunk/productThunk"

function Products() {
  const [showFormAdd, setShowFormAdd] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Kelola Produk - Admin"
  }, [])

  useEffect(() => {
    dispatch(getProductsByAdmin())
  }, [dispatch])

  return (
    <>
      <div className="flex sm:flex-col sm:items-start sm:gap-2 lg:flex-row lg:items-center lg:gap-0 justify-between mb-6">
        <h1 className="text-3xl font-bold text-lime-600">
          Kelola Produk {showFormAdd && "/ Tambah Produk"}
          {selectedProduct && "/ Edit Produk"}
        </h1>
        {showFormAdd || selectedProduct ? (
          <button
            onClick={() => {
              setShowFormAdd(false)
              setSelectedProduct(null)
            }}
            className="text-sm text-lime-600 hover:underline"
          >
            ← Kembali
          </button>
        ) : (
          <button
            onClick={() => setShowFormAdd(true)}
            className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 transition"
          >
            Tambah Produk
          </button>
        )}
      </div>

      {/* Form Tambah Produk */}
      {showFormAdd && <FormAdd setShowFormAdd={setShowFormAdd} />}
      {selectedProduct && (
        <FormEdit
          setSelectedProduct={setSelectedProduct}
          initialData={selectedProduct}
        />
      )}

      {/* Tabel Produk */}
      {!showFormAdd && !selectedProduct && (
        <TableProducts setSeletedProduct={setSelectedProduct} />
      )}
    </>
  )
}

export default Products
