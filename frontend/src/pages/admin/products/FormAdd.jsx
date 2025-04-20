import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import productSchema from "../../../validations/productSchema"
import { useDispatch, useSelector } from "react-redux"
import { createProduct } from "../../../store/thunk/productThunk"

function FormAdd({ setShowFormAdd }) {
  const [image, setImage] = useState(null)
  const { isLoadingCreateProduct } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(productSchema),
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const onSubmit = (data) => {
    data.image = image // push image to data
    if (!image) {
      setError("image", { message: "Gambar produk harus diisi" })
    } else {
      dispatch(createProduct(data))
        .unwrap()
        .then(() => {
          reset()
          setImage(null)
          setShowFormAdd(false)
        })
        .catch((backendErrors) => {
          for (const key in backendErrors?.errors) {
            setError(key, { message: backendErrors.errors[key][0] })
          }
        })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Form Tambah Produk
      </h2>

      <div>
        <label className="block mb-1 text-sm font-medium">Nama Produk</label>
        <input
          type="text"
          {...register("name")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Harga</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Stok</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Bobot per gram</label>
        <input
          type="number"
          {...register("weight", { valueAsNumber: true })}
          className="w-full border rounded px-3 py-2"
          placeholder="Contoh: 100 (gram)"
        />
        {errors.weight && (
          <p className="text-red-500 text-sm">{errors.weight.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Gambar Produk</label>
        <input
          type="file"
          {...register("image")}
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="h-40 object-contain border rounded"
        />
      )}

      <div className="text-right">
        <button
          type="submit"
          disabled={isLoadingCreateProduct}
          className="bg-lime-500 text-white px-6 py-2 rounded hover:bg-lime-600 transition"
        >
          {isLoadingCreateProduct ? "Loading..." : "Simpan Produk"}
        </button>
      </div>
    </form>
  )
}

export default FormAdd
