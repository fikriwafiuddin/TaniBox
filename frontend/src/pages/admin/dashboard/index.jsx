import { useEffect } from "react"
import { Link } from "react-router-dom"
import Stats from "./Stats"
import RecentActivity from "./RecentActivity"

function AdminDashboard() {
  useEffect(() => {
    document.title = "Admin Dashboard"
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold text-lime-600 mb-6">Dashboard Admin</h1>
      <Stats />
      <RecentActivity />
    </>
  )
}

export default AdminDashboard
