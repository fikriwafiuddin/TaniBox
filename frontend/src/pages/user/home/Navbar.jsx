import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Navbar({ onCartClick, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { user } = useSelector((state) => state.user)

  const sections = [
    "beranda",
    "produk",
    "tentang",
    "pesan",
    "testimoni",
    "kontak",
  ]

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const id of sections) {
        const section = document.getElementById(id)
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(id)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const linkStyle = (id) =>
    `hover:text-lime-600 transition relative ${
      activeSection === id
        ? "text-lime-600 font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-lime-600 after:bottom-[-4px] after:left-0 after:rounded-full after:animate-fadeIn"
        : ""
    }`

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a className="block" href="#">
            <h1 className="text-[#4CAF50] text-2xl font-bold font-poppins">
              TaniBox
            </h1>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a className={linkStyle("beranda")} href="#beranda">
              Beranda
            </a>
            <a className={linkStyle("produk")} href="#produk">
              Produk
            </a>
            <a className={linkStyle("tentang")} href="#tentang">
              Tentang Kami
            </a>
            <a className={linkStyle("pesan")} href="#pesan">
              Cara Pemesanan
            </a>
            <a className={linkStyle("testimoni")} href="#testimoni">
              Testimoni
            </a>
            <a className={linkStyle("kontak")} href="#kontak">
              Kontak
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  className="text-sm text-gray-700 hover:text-lime-600"
                  to="/auth/login"
                >
                  Login
                </Link>
                <Link
                  className="hidden sm:inline-block text-sm text-white bg-lime-500 px-4 py-1.5 rounded-full hover:bg-lime-600"
                  to="/auth/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="text-sm text-gray-700 hover:text-lime-600"
                  to="/orders"
                >
                  Order
                </Link>
                <button
                  onClick={onCartClick}
                  className="relative text-gray-700 hover:text-lime-600"
                >
                  🛒
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    3
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {/* Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-gray-600 hover:text-lime-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
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
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col px-4 py-4 space-y-2 text-sm font-medium text-gray-700">
            {sections.map((id) => (
              <a key={id} className={linkStyle(id)} href={`#${id}`}>
                {id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ")}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
