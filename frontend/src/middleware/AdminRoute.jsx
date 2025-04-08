import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.user)

  if (user?.role === "admin") {
    return children
  } else if (user?.role === "user") {
    return <Navigate to="/" />
  } else {
    return <Navigate to="/auth/login" />
  }
}

export default AdminRoute
