import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import productSchema from "../../../validations/productSchema"
import { useDispatch } from "react-redux"
import { editProduct } from "../../../store/thunk/productThunk"
import { toast } from "react-toastify"
import { BASE_URL } from "../../../constant"

function FormEdit({ initialData, setSelectedProduct }) {
  const [image, setImage] = useState(null)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(productSchema),
  })

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name)
      setValue("price", initialData.price)
      setValue("stock", initialData.stock)
      setValue("weight", initialData.weight)
    }
  }, [initialData, setValue])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleEdit = (data) => {
    image && data.image.push(image) // push image to data
    if (
      data.name === initialData.name &&
      data.price === initialData.price &&
      data.stock === initialData.stock &&
      data.weight === initialData.weight &&
      !image
    ) {
      return toast.error("Tidak ada perubahan yang dilakukan")
    }
    dispatch(editProduct({ data, id: initialData._id }))
      .unwrap()
      .then(() => {
        reset()
        setImage(null)
        setSelectedProduct(null)
      })
      .catch((backendErrors) => {
        for (const key in backendErrors?.errors) {
          setError(key, { message: backendErrors.errors[key][0] })
        }
      })
  }

  return (
    <form
      onSubmit={handleSubmit(handleEdit)}
      className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Form Edit Produk</h2>

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
        <label className="block mb-1 text-sm font-medium">
          Ubah Gambar Produk
        </label>
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

      <img
        src={
          image
            ? URL.createObjectURL(image)
            : `${BASE_URL}/${initialData.image}`
        }
        alt="Preview"
        className="h-40 object-contain border rounded"
      />

      <div className="text-right">
        <button
          type="submit"
          className="bg-lime-500 text-white px-6 py-2 rounded hover:bg-lime-600 transition"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  )
}

export default FormEdit
