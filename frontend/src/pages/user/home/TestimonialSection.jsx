function TestimonialSection() {
  return (
    <section id="testimoni" className="scroll-mt-24 py-12 px-4 bg-lime-50">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-lime-600 mb-2">
          Apa Kata Mereka?
        </h2>
        <p className="text-gray-600 mb-10">
          Beberapa pelanggan kami yang merasakan kesegaran TaniBox 🍀
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {/* Testimoni 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 italic mb-4">
              "Sayurannya segar banget, serasa langsung dipetik dari kebun!
              Pelayanan juga cepat dan ramah."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/user1.jpeg"
                alt="User 1"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="text-sm font-semibold text-lime-600">
                  Dewi Ayu
                </h4>
                <p className="text-xs text-gray-500">Ibu Rumah Tangga</p>
              </div>
            </div>
          </div>

          {/* Testimoni 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 italic mb-4">
              "Setiap minggu saya langganan! Kualitas terjaga, harga bersaing,
              dan dukung petani lokal juga."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/user2.jpeg"
                alt="User 2"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="text-sm font-semibold text-lime-600">
                  Budi Santoso
                </h4>
                <p className="text-xs text-gray-500">Pegawai Swasta</p>
              </div>
            </div>
          </div>

          {/* Testimoni 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 italic mb-4">
              "TaniBox bikin belanja sayur jadi gampang! Gak perlu ke pasar,
              tinggal klik langsung diantar."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/user3.jpeg"
                alt="User 3"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="text-sm font-semibold text-lime-600">
                  Rina Oktaviani
                </h4>
                <p className="text-xs text-gray-500">Mahasiswi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
