import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import TableProducts from "./TableProducts"
import Form from "./Form"

function Products() {
  const [showFormAdd, setShowFormAdd] = useState(false)
  const [showFormEdit, setShowFormEdit] = useState(false)

  useEffect(() => {
    document.title = "Kelola Produk - Admin"
  }, [])

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-lime-600">
          Kelola Produk {showFormAdd && "/ Tambah Produk"}
          {showFormEdit && "/ Edit Produk"}
        </h1>
        {showFormAdd || showFormEdit ? (
          <button
            onClick={() => {
              setShowFormAdd(false)
              setShowFormEdit(false)
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
      {(showFormAdd || showFormEdit) && (
        <Form
          showFormEdit={showFormEdit}
          showFormAdd={showFormAdd}
          // setShowFormAdd={setShowFormAdd}
        />
      )}

      {/* Tabel Produk */}
      {!showFormAdd && !showFormEdit && (
        <TableProducts showEdit={() => setShowFormEdit(true)} />
      )}
    </>
  )
}

export default Products
