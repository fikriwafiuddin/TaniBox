import { useEffect } from "react"
import TableUsers from "./TableUsers"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../../store/thunk/userThunk"

function AdminUsers() {
  const { isLoadingGetUsers, users } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Kelola Pengguna"
  }, [])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <>
      <h1 className="text-3xl font-bold text-lime-600 mb-6">Kelola Pengguna</h1>

      {isLoadingGetUsers ? (
        <div className="w-full flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-lime-600 border-t-transparent"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10">
          Tidak ada pengguna yang ditemukan.
        </div>
      ) : (
        <TableUsers users={users} />
      )}
    </>
  )
}

export default AdminUsers
