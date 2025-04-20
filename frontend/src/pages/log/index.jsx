import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getActivityLog } from "../../store/thunk/activityLogThunk"

function AdminActivityLogs() {
  const dispatch = useDispatch()
  const { activities, pagination, isLoadingGetActivityLog } = useSelector(
    (state) => state.activityLog
  )
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getActivityLog({ page, limit: 10 }))
  }, [dispatch, page])

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const handleNext = () => {
    if (page < pagination.totalPages) setPage((prev) => prev + 1)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-lime-600">
        📋 Log Aktivitas
      </h1>

      {isLoadingGetActivityLog ? (
        <p>Memuat data...</p>
      ) : activities.length === 0 ? (
        <p>Tidak ada log aktivitas.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((log) => (
            <div key={log._id} className="bg-white p-4 shadow rounded-md">
              <p className="text-gray-700 font-medium">{log.message}</p>
              <p className="text-sm text-gray-500">
                Aksi: <strong>{log.action}</strong> |{" "}
                {new Date(log.createdAt).toLocaleString()}
              </p>
              {log.user && (
                <p className="text-sm text-gray-500">
                  Pengguna: {log.user.name} ({log.user.email})
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-lime-600 text-white"
          }`}
        >
          ⬅ Sebelumnya
        </button>
        <span>
          Halaman {pagination.currentPage} dari {pagination.totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === pagination.totalPages}
          className={`px-4 py-2 rounded ${
            page === pagination.totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-lime-600 text-white"
          }`}
        >
          Selanjutnya ➡
        </button>
      </div>
    </div>
  )
}

export default AdminActivityLogs
