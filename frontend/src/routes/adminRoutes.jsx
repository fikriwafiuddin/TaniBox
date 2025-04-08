import AdminLayout from "../layouts/AdminLayout"
import AdminRoute from "../middleware/AdminRoute"
import AdminDashboard from "../pages/admin/dashboard"
import AdminOrders from "../pages/admin/orders"
import AdminProducts from "../pages/admin/products"
import AdminUsers from "../pages/admin/users"

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
  ],
}

export default adminRoutes
