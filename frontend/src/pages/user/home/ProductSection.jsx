function ProductSection() {
  const products = [
    {
      id: 1,
      name: "Bayam Segar",
      price: 5000,
      image: "/Creamy Chicken Carbonara Recipe.jpg",
    },
    {
      id: 2,
      name: "Wortel Organik",
      price: 7000,
      image: "/Creamy Chicken Carbonara Recipe.jpg",
    },
    {
      id: 3,
      name: "Tomat Merah",
      price: 6000,
      image: "/Creamy Chicken Carbonara Recipe.jpg",
    },
    {
      id: 4,
      name: "Kangkung Hidroponik",
      price: 8000,
      image: "/Creamy Chicken Carbonara Recipe.jpg",
    },
  ]
  const isLoggedIn = true
  return (
    <section
      id="produk"
      className="scroll-mt-24 max-w-screen-xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-lime-600 mb-2">Produk Kami</h2>
        <p className="text-gray-600">
          Sayur segar pilihan langsung dari petani lokal untuk kebutuhan
          harianmu.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-lime-600 font-bold mt-1">
                Rp {product.price.toLocaleString()}
              </p>

              {isLoggedIn && (
                <button className="mt-3 w-full bg-lime-500 text-white py-2 px-4 rounded hover:bg-lime-600 transition">
                  Tambah ke Keranjang
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductSection
