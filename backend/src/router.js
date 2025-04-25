import express from "express"
import { getMe, login, register } from "./controllers/authController.js"
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
  addDesa,
  addDusun,
  addKecamatan,
  deleteDesa,
  deleteDusun,
  deleteKecamatan,
  editDesa,
  editKecamatan,
  getAddress,
  getAllKecamatan,
  getDesaByKecamatan,
  getDusunByDesa,
} from "./controllers/addressController.js"
import {
  callBackPayment,
  createOrder,
  deleteOrder,
  deliveredOrder,
  getMyOrders,
  getOrders,
  rejectOrder,
  sendOrder,
  undeliveredOrder,
} from "./controllers/orderController.js"
import { getUsers } from "./controllers/userController.js"
import { getOrderStats, getStats } from "./controllers/statsController.js"
import {
  getActivityLog,
  getLatestActivities,
} from "./controllers/activityLogController.js"

const router = express.Router()

// callback payment
router.post("/payment/callback", callBackPayment)

// address
router.get("/address/kecamatan", getAllKecamatan)
router.get("/address/desa", getDesaByKecamatan)
router.get("/address/dusun", getDusunByDesa)
router.post("/address/addKecamatan", verifyToken, verifyAdmin, addKecamatan)
router.put(
  "/address/editKecamatan/:kecamatanId",
  verifyToken,
  verifyAdmin,
  editKecamatan
)
router.delete(
  "/address/deleteKecamatan/:kecamatanId",
  verifyToken,
  verifyAdmin,
  deleteKecamatan
)
router.post("/address/addDesa/:kecamatanId", verifyToken, verifyAdmin, addDesa)
router.put(
  "/address/editDesa/:kecamatanId/:desaIndex",
  verifyToken,
  verifyAdmin,
  editDesa
)
router.delete(
  "/address/deleteDesa/:kecamatanId/:desaIndex",
  verifyToken,
  verifyAdmin,
  deleteDesa
)
router.post(
  "/address/addDusun/:kecamatanId/:desaIndex",
  verifyToken,
  verifyAdmin,
  addDusun
)
router.delete(
  "/address/deleteDusun/:kecamatanId/:desaIndex/:dusunIndex",
  verifyToken,
  verifyAdmin,
  deleteDusun
)
router.get("/address", getAddress)

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
router.get("/admin/orders", verifyToken, verifyAdmin, getOrders)
router.put("/admin/sendOrder/:orderId", verifyToken, verifyAdmin, sendOrder)
router.put("/admin/rejectOrder/:orderId", verifyToken, verifyAdmin, rejectOrder)
router.put(
  "/admin/deliveredOrder/:orderId",
  verifyToken,
  verifyAdmin,
  deliveredOrder
)
router.put(
  "/admin/undeliveredOrder/:orderId",
  verifyToken,
  verifyAdmin,
  undeliveredOrder
)
router.put("/admin/deleteOrder/:orderId", verifyToken, verifyAdmin, deleteOrder)
router.get("/admin/getUsers", verifyToken, verifyAdmin, getUsers)
router.get("/admin/getStats", verifyToken, verifyAdmin, getStats)
router.get("/admin/salesAnalytics", verifyToken, verifyAdmin, getOrderStats)
router.get(
  "/admin/latestActivities",
  verifyToken,
  verifyAdmin,
  getLatestActivities
)
router.get("/admin/activityLog", verifyToken, verifyAdmin, getActivityLog)

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
router.get("/getMyOrders", verifyToken, verifyUser, getMyOrders)

// auth
router.post("/register", register)
router.post("/login", login)
router.get("/getMe", verifyToken, getMe)

router.all(/.*/, (req, res) => {
  return res.status(404).json({ message: "Route not found", errors: [] })
})

export default router
