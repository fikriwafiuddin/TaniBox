import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addDesa,
  addDusun,
  addKecamatan,
  deleteDesa,
  deleteDusun,
  deleteKecamatan,
  editDesa,
  editKecamatan,
  getAddress,
} from "../../../store/thunk/addressThunk"
import { AnimatePresence, motion as Motion } from "framer-motion"
import { HiOutlineXMark } from "react-icons/hi2"

const AdminAddress = () => {
  const {
    address,
    isLoadingGetAddress,
    isLoadingAddKecamatan,
    isLoadingDeleteKecamatan,
    isLoadingAddDesa,
    isLoadingDeleteDesa,
    isLoadingDeleteDusun,
    isLoadingEditKecamatan,
  } = useSelector((state) => state.address)
  const [newKecamatan, setNewKecamatan] = useState("")
  const [selectedKecamatan, setSelectedKecamatan] = useState(null)
  const [newDesa, setNewDesa] = useState("")
  const [selectedDesaIndex, setSelectedDesaIndex] = useState(null)
  const [newDusun, setNewDusun] = useState("")
  const [openKecamatan, setOpenKecamatan] = useState(null)
  const [editingDesaIndex, setEditingDesaIndex] = useState(null)
  const [editingDesaName, setEditingDesaName] = useState("")
  const [editKecamatanId, setEditKecamatanId] = useState(null)
  const [editedKecamatanName, setEditedKecamatanName] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAddress())
  }, [dispatch])

  const handleAddKecamatan = () => {
    if (!newKecamatan) return
    dispatch(addKecamatan({ kecamatan: newKecamatan.trim() }))
    setNewKecamatan("")
  }

  const handleUpdateKecamatan = (kecamatanId) => {
    if (!editedKecamatanName) return
    dispatch(
      editKecamatan({ kecamatanId, name: editedKecamatanName.trim() })
    ).then(() => {
      setEditKecamatanId(null)
      setEditedKecamatanName("")
    })
  }

  const handleDeleteKecamatan = (kecamatanId) => {
    dispatch(deleteKecamatan(kecamatanId))
  }

  const handleAddDesa = () => {
    if (!selectedKecamatan || !newDesa) return
    dispatch(
      addDesa({ kecamatanId: selectedKecamatan, desa: newDesa.trim() })
    ).then(() => {
      setSelectedKecamatan(null)
      setNewDesa("")
    })
  }

  const handleDeleteDesa = (kecamatanId, desaIndex) => {
    dispatch(
      deleteDesa({
        kecamatanId,
        desaIndex,
      })
    )
    setSelectedDesaIndex(null)
  }

  const handleEditDesa = (kecamatanId, desaIndex, name) => {
    if (!name) return
    dispatch(
      editDesa({
        kecamatanId,
        desaIndex,
        name: name.trim(),
      })
    ).then(() => {
      setEditingDesaIndex(null)
      setEditingDesaName("")
    })
  }

  const handleAddDusun = async (kecamatanId, desaIndex, name) => {
    if (!name) return
    dispatch(
      addDusun({
        kecamatanId,
        desaIndex,
        name: name.trim(),
      })
    ).then(() => {
      setNewDusun("")
      setSelectedDesaIndex(null)
    })
  }

  const handleDeleteDusun = (kecamatanId, desaIndex, dusunIndex) => {
    dispatch(deleteDusun({ kecamatanId, desaIndex, dusunIndex }))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-lime-600">
        🌍 Kelola Wilayah
      </h1>

      {/* Tambah Kecamatan */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nama Kecamatan"
          value={newKecamatan}
          onChange={(e) => {
            setNewKecamatan(e.target.value)
          }}
          className="border p-2 mr-2"
        />
        <button
          disabled={isLoadingAddKecamatan}
          onClick={handleAddKecamatan}
          className="bg-lime-600 text-white px-4 py-2 rounded"
        >
          {isLoadingAddKecamatan ? "Loading..." : "Tambah Kecamatan"}
        </button>
      </div>

      {/* Tambah Desa & Dusun */}
      {address.map((item) => {
        const isOpen = openKecamatan === item._id

        return (
          <div key={item._id} className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center">
              {editKecamatanId === item._id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editedKecamatanName}
                    onChange={(e) => setEditedKecamatanName(e.target.value)}
                    className="border p-1 text-sm"
                  />
                  <button
                    onClick={() => handleUpdateKecamatan(item._id)}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setEditKecamatanId(null)
                      setEditedKecamatanName("")
                    }}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <h2 className="text-xl font-semibold text-gray-700">
                  {item.kecamatan.name}
                </h2>
              )}
              <div className="flex items-center gap-2">
                <button
                  disabled={isLoadingEditKecamatan}
                  onClick={() => {
                    setEditKecamatanId(item._id)
                    setEditedKecamatanName(item.kecamatan.name)
                  }}
                  className="text-sm text-yellow-500 hover:underline"
                >
                  {isLoadingEditKecamatan === item._id ? "Loading..." : "Edit"}
                </button>
                <button
                  disabled={isLoadingDeleteKecamatan === item._id}
                  onClick={() => handleDeleteKecamatan(item._id)}
                  className={`text-sm ${
                    isLoadingDeleteKecamatan === item._id
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500 hover:underline"
                  }`}
                >
                  {isLoadingDeleteKecamatan === item._id
                    ? "Loading..."
                    : "Hapus"}
                </button>
                <button
                  onClick={() =>
                    setOpenKecamatan(
                      openKecamatan === item._id ? null : item._id
                    )
                  }
                  className="text-sm text-blue-600"
                >
                  {openKecamatan === item._id ? "Tutup" : "Lihat Detail"}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <Motion.div
                  key="details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3"
                >
                  <button
                    onClick={() => setSelectedKecamatan(item._id)}
                    className="text-sm text-blue-500"
                  >
                    + Tambah Desa
                  </button>

                  {selectedKecamatan === item._id && (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Nama Desa"
                        value={newDesa}
                        onChange={(e) => {
                          setNewDesa(e.target.value)
                        }}
                        className="border p-2"
                      />
                      <button
                        disabled={isLoadingAddDesa}
                        onClick={handleAddDesa}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        {isLoadingAddDesa ? "Loading..." : "Simpan"}
                      </button>
                      <button type="button">
                        <HiOutlineXMark
                          className="size-7 text-black/50"
                          onClick={() => setSelectedKecamatan(null)}
                        />
                      </button>
                    </div>
                  )}

                  {item.kecamatan.desa.map((desa, desaIndex) => (
                    <div key={desaIndex} className="ml-6 mt-3">
                      {editingDesaIndex === desaIndex ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingDesaName}
                            onChange={(e) => setEditingDesaName(e.target.value)}
                            className="border p-1 text-sm"
                          />
                          <button
                            onClick={() =>
                              handleEditDesa(
                                item._id,
                                desaIndex,
                                editingDesaName
                              )
                            }
                            className="text-sm text-green-600"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => {
                              setEditingDesaIndex(null)
                              setEditingDesaName("")
                            }}
                            className="text-sm text-red-500"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <h3 className="text-md font-semibold text-gray-600">
                          {desa.name}
                        </h3>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingDesaIndex(desaIndex)
                            setEditingDesaName(desa.name)
                          }}
                          className="text-sm text-yellow-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          disabled={isLoadingDeleteDesa}
                          onClick={() => handleDeleteDesa(item._id, desaIndex)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          {isLoadingDeleteDesa ? "Loading..." : "Hapus"}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDesaIndex(desaIndex)
                          }}
                          className="text-sm text-green-600"
                        >
                          + Tambah Dusun
                        </button>
                      </div>

                      {selectedDesaIndex === desaIndex && (
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Nama Dusun"
                            value={newDusun}
                            onChange={(e) => setNewDusun(e.target.value)}
                            className="border p-2"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleAddDusun(item._id, desaIndex, newDusun)
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Simpan
                          </button>
                          <button type="button">
                            <HiOutlineXMark
                              className="size-7 text-black/50"
                              onClick={() => setSelectedDesaIndex(null)}
                            />
                          </button>
                        </div>
                      )}

                      <ul className="list-disc list-inside text-sm text-gray-500 ml-4">
                        {desa.dusun.map((dusun, dusunIndex) => (
                          <li
                            key={dusunIndex}
                            className="flex justify-between items-center"
                          >
                            <span>{dusun}</span>
                            <div className="flex gap-2 text-xs ml-4">
                              <button
                                disabled={isLoadingDeleteDusun}
                                onClick={() =>
                                  handleDeleteDusun(
                                    item._id,
                                    desaIndex,
                                    dusunIndex
                                  )
                                }
                                className="text-red-500 hover:underline"
                              >
                                {isLoadingDeleteDusun ? "Loading..." : "Hapus"}
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      {isLoadingGetAddress && <p className="mt-4">Memuat wilayah...</p>}
    </div>
  )
}

export default AdminAddress
