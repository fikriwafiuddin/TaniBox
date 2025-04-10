import express from "express"
import { getMe, login, register } from "./controllers/userController.js"
import verifyToken from "./middlewares/verifyToken.js"
import verifyAdmin from "./middlewares/verifyAdmin.js"
import verifyUser from "./middlewares/verifyUser.js"
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducstByAdmin,
  getProducstByUser,
} from "./controllers/productController.js"
import uploadeFile from "./middlewares/uploadFile.js"
import {
  addProductCart,
  editProductCart,
  getCart,
} from "./controllers/cartController.js"
import {
  createAddress,
  getAllKecamatan,
  getDusunByKelurahan,
  getKelurahanByKecamatan,
} from "./controllers/addressController.js"
import { callBackPayment, createOrder } from "./controllers/orderController.js"

const router = express.Router()

// callback payment
router.post("/payment/callback", callBackPayment)

// address
router.get("/kecamatan", getAllKecamatan)
router.get("/kelurahan", getKelurahanByKecamatan)
router.get("/dusun", getDusunByKelurahan)

// admin
router.get("/admin/products", verifyToken, verifyAdmin, getProducstByAdmin)
router.post(
  "/admin/createProduct",
  verifyToken,
  verifyAdmin,
  uploadeFile,
  createProduct
)
router.put(
  "/admin/editProduct/:id",
  verifyToken,
  verifyAdmin,
  uploadeFile,
  editProduct
)
router.delete(
  "/admin/deleteProduct/:id",
  verifyToken,
  verifyAdmin,
  deleteProduct
)
router.post("/admin/createAddress", verifyToken, verifyAdmin, createAddress)

// user
router.get("/products", getProducstByUser)
router.post(
  "/cart/addProduct/:productId",
  verifyToken,
  verifyUser,
  addProductCart
)
router.put(
  "/cart/editProduct/:productId",
  verifyToken,
  verifyUser,
  editProductCart
)
router.post("/createOrder", verifyToken, verifyUser, createOrder)
router.get("/cart/getCart", verifyToken, verifyUser, getCart)

// auth
router.post("/register", register)
router.post("/login", login)
router.get("/getMe", verifyToken, getMe)

router.all(/.*/, (req, res) => {
  return res.status(404).json({ message: "Route not found", errors: [] })
})

export default router
