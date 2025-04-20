function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative max-w-5xl mx-auto md:mt-2 h-80 md:h-96 overflow-hidden bg-cover bg-center bg-[url(./hero.jpeg)]"
    >
      {/* Overlay Gelap untuk Kontras */}
      <div className="absolute inset-0 bg-opacity-40 z-0" />

      {/* Konten */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold drop-shadow-md">
          Sayur Segar Langsung dari Kebun ke Rumahmu!
        </h1>
        <p className="text-white mt-3 text-sm md:text-base max-w-md drop-shadow-sm">
          Temukan beragam sayuran segar berkualitas, langsung dari petani lokal.
        </p>
        <a
          href="#produk"
          className="mt-6 bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-5 rounded-full transition duration-300 shadow-lg"
        >
          Belanja Sekarang
        </a>
      </div>
    </section>
  )
}

export default HeroSection
