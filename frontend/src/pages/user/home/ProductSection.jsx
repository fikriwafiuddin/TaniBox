import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../../../constant"
import { addProductCart } from "../../../store/thunk/cartThunk"

function ProductSection({ isLoggedIn }) {
  const { products, isLoadingGetProducts } = useSelector(
    (state) => state.product
  )
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleAddProductToCart = (id) => {
    dispatch(addProductCart(id))
  }

  const renderSkeletons = (count = 8) => {
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse"
      >
        <div className="w-full h-40 bg-gray-200" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          {isLoggedIn && (
            <div className="h-10 bg-gray-300 rounded w-full mt-3" />
          )}
        </div>
      </div>
    ))
  }

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
        {isLoadingGetProducts
          ? renderSkeletons()
          : products?.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg"
              >
                <img
                  src={`${product.image}`}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-lime-600 font-bold mt-1">
                    Rp {product.price.toLocaleString()}
                    <span className="text-gray-600 text-sm">
                      /{product.weight} gram
                    </span>
                  </p>

                  {user && (
                    <button
                      type="button"
                      onClick={() => handleAddProductToCart(product._id)}
                      className="mt-3 w-full cursor-pointer bg-lime-500 text-white py-2 px-4 rounded hover:bg-lime-600 transition"
                    >
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
