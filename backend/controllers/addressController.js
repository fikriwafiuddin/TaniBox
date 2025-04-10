import Address from "../models/addressModel.js"
import { addressSchema } from "../validators/addressValidators.js"
import { z } from "zod"

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
      .json({ message: "Mengambil alamat berhasil", data: address })
  } catch (error) {
    console.log("Error in getAddress function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const createAddress = async (req, res) => {
  const data = req.body
  try {
    const validatedData = addressSchema.parse(data)

    const newAddress = await Address.create(validatedData)
    return res.status(201).json({
      message: "Alamat berhasil ditambahkan",
      data: newAddress,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors
      return res.status(400).json({ message: "Error validasi data", errors })
    }
    console.log("Error in createAddress function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const getAllKecamatan = async (req, res) => {
  try {
    const addresses = await Address.find({}, "kecamatan.name")
    const kecamatanList = addresses.map((item) => item.kecamatan.name)
    return res
      .status(200)
      .json({
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

export const getKelurahanByKecamatan = async (req, res) => {
  const { kecamatan } = req.query

  try {
    const address = await Address.findOne({ "kecamatan.name": kecamatan })

    if (!address) {
      return res
        .status(404)
        .json({
          message: "Kecamatan tidak ditemukan",
          errors: [{ kecamatan: "Kecamatan tidak ditemukan" }],
        })
    }

    const kelurahanList = address.kecamatan.kelurahan.map((kel) => kel.name)
    return res
      .status(200)
      .json({
        message: "Mengambil list kelurahan berhasil",
        data: { kelurahanList },
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

export const getDusunByKelurahan = async (req, res) => {
  const { kecamatan, kelurahan } = req.query

  try {
    const address = await Address.findOne({ "kecamatan.name": kecamatan })

    if (!address) {
      return res
        .status(404)
        .json({
          message: "Kecamatan tidak ditemukan",
          errors: [{ kecamatan: "Kecamatan tidak ditemukan" }],
        })
    }

    const kelurahanData = address.kecamatan.kelurahan.find(
      (kel) => kel.name === kelurahan
    )

    if (!kelurahanData) {
      return res
        .status(404)
        .json({
          message: "Kelurahan tidak ditemukan",
          errors: [{ kelurahan: "Kelurahan tidak ditemukan" }],
        })
    }

    return res.status(200).json(kelurahanData.dusun)
  } catch (error) {
    console.error("Error in getDusunByKelurahan function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Gagal mengambil dusun", errors: [] })
  }
}
