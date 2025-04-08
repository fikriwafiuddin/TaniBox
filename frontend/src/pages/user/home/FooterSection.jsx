function FooterSection() {
  return (
    <footer className="bg-lime-600 text-white py-10 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Deskripsi */}
        <div>
          <h2 className="text-2xl font-bold mb-2">TaniBox</h2>
          <p className="text-sm leading-relaxed">
            Solusi belanja sayur segar langsung dari kebun ke rumah Anda. Dukung
            petani lokal & hidup lebih sehat bersama TaniBox!
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Beranda
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Produk
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Testimoni
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Kontak Kami</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Jl. Sehat No.123, Kediri</li>
            <li>📞 +62 812-3456-7890</li>
            <li>✉️ hello@tanibox.id</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-white/30 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} TaniBox. Semua Hak Dilindungi.
      </div>
    </footer>
  )
}

export default FooterSection
