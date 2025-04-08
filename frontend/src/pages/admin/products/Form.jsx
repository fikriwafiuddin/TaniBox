import { useState } from "react"

function Form({ showFormEdit, showFormAdd, setShowFormAdd }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Semua field wajib diisi!")
      return
    }
    setNewProduct({ name: "", price: "", stock: "", description: "" })
    // setShowFormAdd(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Form {showFormEdit && "Edit"} {showFormAdd && "Tambah"} Produk
      </h2>
      <div>
        <label className="block mb-1 text-sm font-medium">Nama Produk</label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Harga</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Stok</label>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 text-gray-700 font-medium">
          Gambar Produk
        </label>
        <input
          type="file"
          name="gambar"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="bg-lime-500 text-white px-6 py-2 rounded hover:bg-lime-600 transition"
        >
          Simpan Produk
        </button>
      </div>
    </form>
  )
}

export default Form
