import { useEffect } from "react"
import Stats from "./Stats"
import { useDispatch } from "react-redux"
import { getSalesAnalytics, getStats } from "../../../store/thunk/statsThunk"
import Chart from "./Chart"
import { getLatestActivities } from "../../../store/thunk/activityLogThunk"

function AdminDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Admin Dashboard"
  }, [])

  useEffect(() => {
    dispatch(getStats())
  }, [dispatch])

  useEffect(() => {
    dispatch(getSalesAnalytics())
    dispatch(getLatestActivities())
  }, [dispatch])

  return (
    <>
      <h1 className="text-3xl font-bold text-lime-600 mb-6">Dashboard Admin</h1>
      <Stats />
      <Chart />
    </>
  )
}

export default AdminDashboard
