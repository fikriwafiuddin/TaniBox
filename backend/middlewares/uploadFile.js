import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../utils/claudinary.js"

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "TaniBox/products",
    format: async () => "webp",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ quality: "auto" }],
  },
})

const uploadFile = multer({ storage }).single("image")
export default uploadFile
