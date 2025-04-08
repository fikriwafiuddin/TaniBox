import { createBrowserRouter, RouterProvider } from "react-router-dom"
import userRoutes from "./routes/userRoutes"
import adminRoutes from "./routes/adminRoutes"
import guestRoutes from "./routes/guestRoutes"

function App() {
  const router = createBrowserRouter([userRoutes, adminRoutes, guestRoutes])
  return <RouterProvider router={router} />
}

export default App
