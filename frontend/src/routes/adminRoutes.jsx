import AdminLayout from "../layouts/AdminLayout"
import AdminRoute from "../middleware/AdminRoute"
import AdminDashboard from "../pages/admin/dashboard"
import AdminOrders from "../pages/admin/orders"
import AdminProducts from "../pages/admin/products"
import AdminUsers from "../pages/admin/users"
import AdminActivityLogs from "../pages/log"
import AdminAddress from "../pages/admin/address"

const adminRoutes = {
  path: "/admin",
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "products", element: <AdminProducts /> },
    { path: "orders", element: <AdminOrders /> },
    { path: "users", element: <AdminUsers /> },
    { path: "activity-logs", element: <AdminActivityLogs /> },
    { path: "address", element: <AdminAddress /> },
  ],
}

export default adminRoutes
