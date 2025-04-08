import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

function UserRoute({ children }) {
  const { user } = useSelector((state) => state.user)
  const location = useLocation()

  if (location.pathname === "/" && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />
  } else if (location.pathname === "/" && !user) {
    return children
  }

  if (user?.role === "user") {
    return children
  } else if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />
  } else {
    return <Navigate to="/auth/login" />
  }
}

export default UserRoute
