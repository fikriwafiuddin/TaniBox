import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { axiosInstance } from "../../../lib/axios"
import addressSchema from "../../../validations/addressSchema"
import { createOrder } from "../../../store/thunk/orderThunk"
import { useDispatch, useSelector } from "react-redux"

export default function AddressForm() {
  const {
    handleSubmit,
    control,
    watch,
    resetField,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      email: "",
      noHp: "",
      kecamatan: "",
      desa: "",
      dusun: "",
      rt: "",
      rw: "",
      description: "",
    },
  })
  const { isLoadingCreateOrder } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  const kecamatan = watch("kecamatan")
  const desa = watch("desa")

  const [kecamatanList, setKecamatanList] = useState([])
  const [desaList, setDesaList] = useState([])
  const [dusunList, setDusunList] = useState([])

  const [isLoadingKecamatan, setIsLoadingKecamatan] = useState(false)
  const [isLoadingDesa, setIsLoadingDesa] = useState(false)
  const [isLoadingDusun, setIsLoadingDusun] = useState(false)

  const onSubmit = (data) => {
    dispatch(createOrder(data))
      .unwrap()
      .catch((backendErrors) => {
        for (const key in backendErrors?.errors) {
          setError(key, { message: backendErrors.errors[key][0] })
        }
      })
  }

  useEffect(() => {
    setIsLoadingKecamatan(true)
    setIsLoadingDesa(true)
    setIsLoadingDusun(true)
    axiosInstance.get("/address/kecamatan").then((res) => {
      setKecamatanList(res.data.data)
      setIsLoadingKecamatan(false)
    })
  }, [])

  useEffect(() => {
    if (kecamatan) {
      axiosInstance
        .get("/address/desa", { params: { kecamatan } })
        .then((res) => {
          setDesaList(res.data.data.desaList)
          resetField("desa")
          resetField("dusun")
          setDusunList([])
          setIsLoadingDesa(false)
        })
    }
  }, [kecamatan, resetField])

  useEffect(() => {
    if (kecamatan && desa) {
      axiosInstance
        .get("/address/dusun", { params: { kecamatan, desa } })
        .then((res) => {
          setDusunList(res.data.data.dusunList)
          resetField("dusun")
          setIsLoadingDusun(false)
        })
    }
  }, [desa, kecamatan, resetField])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nama */}
      <div>
        <label className="block mb-1">Nama</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="border px-3 py-2 rounded w-full"
              placeholder="Nama lengkap"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              className="border px-3 py-2 rounded w-full"
              placeholder="email@example.com"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* No HP */}
      <div>
        <label className="block mb-1">Nomor HP</label>
        <Controller
          name="noHp"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="tel"
              className="border px-3 py-2 rounded w-full"
              placeholder="08xxxxxxxxxx"
            />
          )}
        />
        {errors.noHp && (
          <p className="text-red-500 text-sm">{errors.noHp.message}</p>
        )}
      </div>

      {/* Kecamatan */}
      <div>
        <label className="flex items-center gap-2 mb-1">
          Kecamatan{" "}
          {isLoadingKecamatan && (
            <div className="">
              <div className="w-4 h-4 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </label>
        <Controller
          name="kecamatan"
          control={control}
          render={({ field }) => (
            <select
              disabled={isLoadingKecamatan}
              {...field}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Pilih Kecamatan</option>
              {kecamatanList.map((kec) => (
                <option key={kec} value={kec}>
                  {kec}
                </option>
              ))}
            </select>
          )}
        />
        {errors.kecamatan && (
          <p className="text-red-500 text-sm">{errors.kecamatan.message}</p>
        )}
      </div>

      {/* Desa */}
      <div>
        <label className="mb-1 flex items-center gap-2">
          Desa{" "}
          {isLoadingDesa && (
            <div className="">
              <div className="w-4 h-4 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </label>
        <Controller
          name="desa"
          control={control}
          render={({ field }) => (
            <select
              disabled={isLoadingDesa}
              {...field}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Pilih Desa</option>
              {desaList.map((des) => (
                <option key={des} value={des}>
                  {des}
                </option>
              ))}
            </select>
          )}
        />
        {errors.desa && (
          <p className="text-red-500 text-sm">{errors.desa.message}</p>
        )}
      </div>

      {/* Dusun */}
      <div>
        <label className="flex items-center gap-2 mb-1">
          Dusun{" "}
          {isLoadingDusun && (
            <div className="">
              <div className="w-4 h-4 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </label>
        <Controller
          name="dusun"
          control={control}
          render={({ field }) => (
            <select
              disabled={isLoadingDusun}
              {...field}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Pilih Dusun</option>
              {dusunList.map((dus) => (
                <option key={dus} value={dus}>
                  {dus}
                </option>
              ))}
            </select>
          )}
        />
        {errors.dusun && (
          <p className="text-red-500 text-sm">{errors.dusun.message}</p>
        )}
      </div>

      {/* RT */}
      <div>
        <label className="block mb-1">RT</label>
        <Controller
          name="rt"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              inputMode="numeric"
              maxLength={3}
              className="border px-3 py-2 rounded w-full"
              placeholder="001"
            />
          )}
        />
        {errors.rt && (
          <p className="text-red-500 text-sm">{errors.rt.message}</p>
        )}
      </div>

      {/* RW */}
      <div>
        <label className="block mb-1">RW</label>
        <Controller
          name="rw"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              inputMode="numeric"
              maxLength={3}
              className="border px-3 py-2 rounded w-full"
              placeholder="001"
            />
          )}
        />
        {errors.rw && (
          <p className="text-red-500 text-sm">{errors.rw.message}</p>
        )}
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block mb-1">Deskripsi Alamat (opsional)</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="border px-3 py-2 rounded w-full"
              placeholder="Contoh: Sebelah masjid, dekat gang, lantai 2, dll."
            />
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isLoadingCreateOrder}
        className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600 transition"
      >
        {isLoadingCreateOrder ? "Loading..." : "Konfirmasi Pesanan"}
      </button>
    </form>
  )
}
