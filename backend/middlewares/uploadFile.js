import multer from "multer"
import cloudinary from "../utils/claudinary.js"
import { Readable } from "stream"

// Config multer untuk menyimpan file di memory
const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })

// Middleware untuk menangani upload
const uploadFile = (req, res, next) => {
  // Gunakan multer untuk memproses file
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return next(err)
    }

    if (!req.file) {
      return next()
    }

    try {
      // Konversi buffer ke readable stream (yang dibutuhkan oleh Cloudinary)
      const stream = new Readable()
      stream.push(req.file.buffer)
      stream.push(null) // Tanda akhir stream

      // Konfigurasi upload Cloudinary
      const uploadOptions = {
        folder: "TaniBox/products",
        format: "webp",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        transformation: [{ quality: "auto", format: "webp" }],
        filename_override: `${req.file.originalname.split(".")[0]}.webp`,
      }

      // Upload ke Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              reject(error)
            } else {
              resolve(result)
            }
          }
        )

        stream.pipe(uploadStream)
      })

      console.log(result)
      // Simpan informasi file ke request untuk digunakan di controller
      req.file = result
      next()
    } catch (error) {
      next(error)
    }
  })
}

export default uploadFile
