import { createBrowserRouter, RouterProvider } from "react-router-dom"
import userRoutes from "./routes/userRoutes"
import adminRoutes from "./routes/adminRoutes"
import guestRoutes from "./routes/guestRoutes"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { getMe } from "./store/thunk/authThunk"
import useToastMessages from "./hooks/useToastMessages"

function App() {
  const router = createBrowserRouter([userRoutes, adminRoutes, guestRoutes])
  const dispatch = useDispatch()
  const { isLoadingGetMe } = useSelector((state) => state.auth)

  useToastMessages()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  if (isLoadingGetMe) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  )
}

export default App
