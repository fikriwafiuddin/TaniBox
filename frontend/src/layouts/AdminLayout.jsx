import { useState, useEffect } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import ConfirmDialog from "../components/ConfirmDialog"

function AdminLayouts() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutConfirm, setShoLogoutConfirm] = useState(false)
  const [currentPath, setCurrentPath] = useState("")
  const location = useLocation()

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location.pathname])

  const navLinks = [
    { to: "/admin/dashboard", label: "📊 Dashboard" },
    { to: "/admin/products", label: "🛒 Kelola Produk" },
    { to: "/admin/orders", label: "📦 Kelola Pesanan" },
    { to: "/admin/users", label: "👤 Pengguna" },
  ]

  const getNavLinkClass = (path) => {
    return `block hover:text-lime-600 ${
      currentPath === path ? "text-lime-600 font-bold" : ""
    }`
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Confirm Logout */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        message="Apakah Anda yakin ingin keluar?"
        onConfirm={() => setShoLogoutConfirm(false)}
        onCancel={() => setShoLogoutConfirm(false)}
      />

      {/* Sidebar Mobile Toggle */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white p-4 shadow z-30 flex justify-between items-center">
        <h2 className="text-xl font-bold text-lime-600">TaniBox Admin</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 md:relative transform transition-transform duration-300 ease-in-out z-20 h-full w-64 bg-white shadow-md px-6 py-8 pt-16 md:pt-8 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold text-lime-600 mb-8 hidden md:block">
          TaniBox Admin
        </h2>
        <nav className="space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={getNavLinkClass(link.to)}
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="block text-gray-500 hover:text-red-500 pt-6"
            onClick={() => setShoLogoutConfirm(true)}
          >
            ⬅ Logout
          </button>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 h-screen overflow-y-auto mt-2 sm:mt-16 pb-4 md:p-10 z-0 pt-16 md:pt-0">
        <div className="mb-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayouts
