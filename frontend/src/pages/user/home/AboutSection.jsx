function AboutSection() {
  return (
    <section id="tentang" className="scroll-mt-24 bg-lime-50 py-12 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Gambar */}
        <div className="w-full md:w-1/2">
          <img
            src="./about.jpeg"
            alt="Tentang TaniBox"
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Teks */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-lime-600 mb-4">
            Tentang TaniBox
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold">TaniBox</span> adalah platform
            e-commerce yang menyediakan sayur segar berkualitas langsung dari
            petani lokal ke tangan konsumen. Kami percaya bahwa makanan sehat
            dimulai dari bahan baku terbaik, dan kami berkomitmen untuk
            memberikan yang terbaik bagi keluarga Indonesia.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Dengan proses pengemasan yang higienis dan pengiriman yang cepat,
            kami memastikan kesegaran produk sampai di rumah Anda. Bersama
            TaniBox, mari dukung pertanian lokal dan hidup lebih sehat setiap
            hari!
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
