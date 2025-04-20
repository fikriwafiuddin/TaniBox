import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function GuestRoute({ children }) {
  const { user } = useSelector((state) => state.auth)

  if (user?.role === "user") {
    return <Navigate to="/" />
  } else if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />
  } else {
    return children
  }
}

export default GuestRoute
