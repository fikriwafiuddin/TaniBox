function ContactSection() {
  return (
    <section id="kontak" className="scroll-mt-24 py-12 px-4 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-lime-600 mb-2">Kontak Kami</h2>
          <p className="text-gray-600">
            Ada pertanyaan atau ingin bekerja sama? Kirimkan pesan ke tim
            TaniBox!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Kontak */}
          <div className="bg-lime-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-lime-600 mb-4">
              Informasi Kontak
            </h3>
            <p className="text-gray-700 mb-2">
              📍 Alamat: Jl. Sehat No. 123, Kediri, Indonesia
            </p>
            <p className="text-gray-700 mb-2">
              📞 WhatsApp:{" "}
              <a
                href="https://wa.me/6281234567890"
                className="text-lime-600 hover:underline"
              >
                +62 812-3456-7890
              </a>
            </p>
            <p className="text-gray-700">
              ✉️ Email:{" "}
              <a
                href="mailto:hello@tanibox.id"
                className="text-lime-600 hover:underline"
              >
                hello@tanibox.id
              </a>
            </p>
          </div>

          {/* Form Kontak */}
          <form className="bg-lime-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-lime-600 mb-4">
              Kirim Pesan
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Nama kamu"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Email aktif kamu"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pesan
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                rows="4"
                placeholder="Tulis pesan kamu di sini..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-lime-600 text-white py-2 px-4 rounded hover:bg-lime-700 transition"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
