import ActivityLog from "../models/activityLogModel.js"
import Address from "../models/addressModel.js"
import { getSocket } from "../utils/socket.js"

export const getAddress = async (req, res) => {
  try {
    const address = await Address.find()
    if (!address) {
      return res
        .status(404)
        .json({ message: "Alamat tidak ditemukan", errors: [] })
    }

    return res
      .status(200)
      .json({ message: "Mengambil alamat berhasil", data: { address } })
  } catch (error) {
    console.log("Error in getAddress function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const getAllKecamatan = async (req, res) => {
  try {
    const addresses = await Address.find({}, "kecamatan.name")
    const kecamatanList = addresses.map((item) => item.kecamatan.name)
    return res.status(200).json({
      message: "Mengambil list kecamatan berhasil",
      data: kecamatanList,
    })
  } catch (error) {
    console.error("Error in getAllKecamatan function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Gagal mengambil kecamatan", errors: [] })
  }
}

export const getDesaByKecamatan = async (req, res) => {
  const { kecamatan } = req.query

  try {
    const address = await Address.findOne({ "kecamatan.name": kecamatan })

    if (!address) {
      return res.status(404).json({
        message: "Kecamatan tidak ditemukan",
        errors: [{ kecamatan: "Kecamatan tidak ditemukan" }],
      })
    }

    const desaList = address.kecamatan.desa.map((des) => des.name)
    return res.status(200).json({
      message: "Mengambil list desa berhasil",
      data: { desaList },
    })
  } catch (error) {
    console.error(
      "Error in getKelurahanByKecamatan function",
      new Date(),
      error
    )
    return res.status(500).json({ message: "Gagal mengambil kelurahan", error })
  }
}

export const getDusunByDesa = async (req, res) => {
  const { kecamatan, desa } = req.query

  try {
    const address = await Address.findOne({ "kecamatan.name": kecamatan })

    if (!address) {
      return res.status(404).json({
        message: "Kecamatan tidak ditemukan",
        errors: [{ kecamatan: "Kecamatan tidak ditemukan" }],
      })
    }

    const desaData = address.kecamatan.desa.find((des) => des.name === desa)

    if (!desaData) {
      return res.status(404).json({
        message: "Desa tidak ditemukan",
        errors: [{ desa: "Desa tidak ditemukan" }],
      })
    }

    return res.status(200).json({
      message: "Mengambil list dusun berhasil",
      data: { dusunList: desaData.dusun },
    })
  } catch (error) {
    console.error("Error in getDusunByDesa function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Gagal mengambil dusun", errors: [] })
  }
}

export const addKecamatan = async (req, res) => {
  const kecamatan = req.body?.kecamatan
  const user = req.user
  try {
    if (!kecamatan) {
      return res.status(400).json({
        message: "Nama kecamatan tidak boleh kosong",
        errors: { kecamatan: ["Nama kecamatan tidak boleh kosong"] },
      })
    }
    const newKecamatan = await Address.create({
      kecamatan: {
        name: kecamatan,
        desa: [],
      },
    })

    const newActivityLog = await ActivityLog.create({
      user: user._id,
      action: "add_address",
      message: `Kecamatan baru berhasil ditambahkan oleh ${user.name}`,
      metadata: newKecamatan,
    })

    const io = getSocket()
    io.emit("activity", {
      message: "Subdistrict successfully added",
      data: newActivityLog,
    })

    return res.status(201).json({
      message: "Kecamatan berhasil ditambahkan",
      data: { address: newKecamatan },
    })
  } catch (error) {
    console.log("Error in addKecamatan function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const editKecamatan = async (req, res) => {
  const kecamatanId = req.params?.kecamatanId
  const name = req.body?.name
  const user = req.user
  try {
    if (!kecamatanId) {
      return res
        .status(400)
        .json({ message: "ID kecamatan tidak ditemukan", errors: {} })
    }

    if (!name) {
      return res.status(400).json({
        message: "Nama kecamatan tidak boleh kosong",
        errors: { name: ["Nama kecamatan tidak boleh kosong"] },
      })
    }

    const address = await Address.findById(kecamatanId)
    if (!address)
      return res
        .status(404)
        .json({ message: "Kecamatan tidak ditemukan", errors: {} })

    address.kecamatan.name = name
    await address.save()

    const newActivityLog = await ActivityLog.create({
      user: user._id,
      action: "update_address",
      message: `Kecamatan berhasil diubah oleh ${user.name}`,
      metadata: address,
    })

    const io = getSocket()
    io.emit("activity", {
      message: "Subdistrict successfully edited",
      data: newActivityLog,
    })

    return res.status(200).json({
      message: "Kecamatan berhasil diubah",
      data: { address },
    })
  } catch (error) {
    console.log("Error in editKecamatan function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const deleteKecamatan = async (req, res) => {
  const kecamatanId = req.params?.kecamatanId
  const user = req.user
  try {
    if (!kecamatanId) {
      return res
        .status(400)
        .json({ message: "ID kecamatan tidak ditemukan", errors: {} })
    }

    const address = await Address.findById(kecamatanId)
    if (!address)
      return res
        .status(404)
        .json({ message: "Kecamatan tidak ditemukan", errors: {} })

    const newActivityLog = await ActivityLog.create({
      user: user._id,
      action: "delete_address",
      message: `Kecamatan berhasil dihapus oleh ${user.name}`,
      metadata: address,
    })

    const io = getSocket()
    io.emit("activity", {
      message: "Subdistrict successfully deleted",
      data: newActivityLog,
    })

    const deletedAddress = await Address.findByIdAndDelete(kecamatanId)
    return res.status(200).json({
      message: "Kecamatan berhasil dihapus",
      data: { address: deletedAddress },
    })
  } catch (error) {
    console.log("Error in deleteKecamatan function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const addDesa = async (req, res) => {
  const kecamatanId = req.params?.kecamatanId
  const desa = req.body?.desa
  const user = req.user
  try {
    if (!desa) {
      return res.status(400).json({
        message: "Nama desa tidak boleh kosong",
        errors: { desa: ["Nama desa tidak boleh kosong"] },
      })
    }

    if (!kecamatanId) {
      return res.status(400).json({
        message: "ID kecamatan tidak ditemukan",
        errors: { kecamatan: ["ID kecamatan tidak ditemukan"] },
      })
    }

    const address = await Address.findById(kecamatanId)
    if (!address)
      return res
        .status(404)
        .json({ message: "Kecamatan tidak ditemukan", errors: {} })

    address.kecamatan.desa.push({ name: desa, dusun: [] })
    const updatedAddress = await address.save()

    const newActivityLog = await ActivityLog.create({
      user: user._id,
      action: "add_address",
      message: `Desa baru berhasil ditambahkan oleh ${user.name}`,
      metadata: updatedAddress,
    })

    const io = getSocket()
    io.emit("activity", {
      message: "Subdistrict successfully added",
      data: newActivityLog,
    })

    res
      .status(201)
      .json({ message: "Desa berhasil ditambahkan", data: { address } })
  } catch (error) {
    console.log("Error in addDesa function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const editDesa = async (req, res) => {
  const { kecamatanId, desaIndex } = req.params || {}
  const { name } = req.body
  const user = req.user
  try {
    if (!kecamatanId)
      return res
        .status(400)
        .json({ message: "ID kecamatan tidak ditemukan", errors: [] })

    if (!desaIndex)
      return res
        .status(400)
        .json({ message: "Indeks desa tidak ditemukan", errors: [] })

    if (!name)
      return res.status(400).json({
        message: "Nama desa tidak boleh kosong",
        errors: { desa: ["Nama desa tidak boleh kosong"] },
      })

    const address = await Address.findById(kecamatanId)
    if (!address)
      return res.status(404).json({ message: "Kecamatan tidak ditemukan" })

    if (!address.kecamatan.desa[desaIndex])
      return res.status(404).json({ message: "Desa tidak ditemukan" })

    address.kecamatan.desa[desaIndex].name = name
    await address.save()

    const newActivityLog = await ActivityLog.create({
      user: user._id,
      action: "update_address",
      message: `Desa berhasil diubah oleh ${user.name}`,
      metadata: address,
    })

    const io = getSocket()
    io.emit("activity", {
      message: "Subdistrict successfully edited",
      data: newActivityLog,
    })

    return res
      .status(200)
      .json({ message: "Nama desa berhasil diubah", data: { address } })
  } catch (error) {
    console.log("Error in editDesa function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const deleteDesa = async (req, res) => {
  const { kecamatanId, desaIndex } = req.params || {}
  const user = req.user

  try {
    if (!kecamatanId)
      return res
        .status(400)
        .json({ message: "ID kecamatan tidak ditemukan", errors: [] })

    if (!desaIndex)
      return res
        .status(400)
        .json({ message: "Indeks desa tidak ditemukan", errors: [] })

    const address = await Address.findById(kecamatanId)
    if (!address)
      return res
        .status(404)
        .json({ message: "Kecamatan tidak ditemukan", errors: [] })

    if (!address.kecamatan.desa[desaIndex])
      return res
        .status(404)
        .json({ message: "Desa tidak ditemukan", errors: [] })

    address.kecamatan.desa.splice(desaIndex, 1)
    await address.save()

    const newActivityLog = await ActivityLog.create({
      user: user._id,
      action: "delete_address",
      message: `Desa berhasil dihapus oleh ${user.name}`,
      metadata: address,
    })

    const io = getSocket()
    io.emit("activity", {
      message: "Subdistrict successfully deleted",
      data: newActivityLog,
    })

    return res
      .status(200)
      .json({ message: "Desa berhasil dihapus", data: { address } })
  } catch (error) {
    console.log("Error in deleteDesa function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const addDusun = async (req, res) => {
  const { kecamatanId, desaIndex } = req.params || {}
  const { name } = req.body

  try {
    if (!kecamatanId)
      return res.status(400).json({
        message: "ID kecamatan tidak ditemukan",
        errors: {},
      })

    if (!desaIndex)
      return res.status(400).json({
        message: "Indeks desa tidak ditemukan",
        errors: {},
      })

    if (!name)
      return res.status(400).json({
        message: "Nama dusun tidak boleh kosong",
        errors: { dusun: ["Nama dusun tidak boleh kosong"] },
      })

    const address = await Address.findById(kecamatanId)
    if (!address)
      return res.status(404).json({ message: "Kecamatan tidak ditemukan" })

    address.kecamatan.desa[desaIndex].dusun.push(name)
    await address.save()

    const newActivityLog = await ActivityLog.create({
      user: req.user._id,
      action: "add_address",
      message: `Dusun baru berhasil ditambahkan oleh ${req.user.name}`,
      metadata: address,
    })

    const io = getSocket()
    io.emit("activity", {
      message: "Subdistrict successfully added",
      data: newActivityLog,
    })

    return res.status(200).json({
      message: "Dusun berhasil ditambahkan",
      data: { address, desaIndex },
    })
  } catch (error) {
    console.log("Error in addDusun function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const deleteDusun = async (req, res) => {
  const { kecamatanId, desaIndex, dusunIndex } = req.params || {}
  try {
    if (!kecamatanId)
      return res
        .status(400)
        .json({ message: "ID kecamatan tidak ditemukan", errors: {} })
    if (!desaIndex)
      return res
        .status(400)
        .json({ message: "Indeks desa tidak ditemukan", errors: {} })
    if (!dusunIndex)
      return res
        .status(400)
        .json({ message: "Indeks dusun tidak ditemukan", errors: {} })

    const address = await Address.findById(kecamatanId)
    if (!address)
      return res.status(404).json({ message: "Kecamatan tidak ditemukan" })

    address.kecamatan.desa[desaIndex].dusun.splice(dusunIndex, 1)
    await address.save()

    const newActivityLog = await ActivityLog.create({
      user: req.user._id,
      action: "delete_address",
      message: `Dusun berhasil dihapus oleh ${req.user.name}`,
      metadata: address,
    })

    const io = getSocket()
    io.emit("activity", {
      message: "Subdistrict successfully deleted",
      data: newActivityLog,
    })

    return res.status(200).json({
      message: "Dusun berhasil dihapus",
      data: { address, desaIndex, dusunIndex },
    })
  } catch (error) {
    console.log("Error in deleteDusun function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}
