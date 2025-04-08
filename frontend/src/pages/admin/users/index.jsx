import { useEffect } from "react"
import TableUsers from "./TableUsers"

function AdminUsers() {
  const users = [
    {
      id: 1,
      name: "Rina",
      email: "rina@email.com",
      phone: "08123456789",
      role: "Pelanggan",
    },
    {
      id: 2,
      name: "Budi",
      email: "budi@email.com",
      phone: "08234567890",
      role: "Pelanggan",
    },
    {
      id: 3,
      name: "Admin",
      email: "admin@tanibox.com",
      phone: "08987654321",
      role: "Admin",
    },
  ]

  useEffect(() => {
    document.title = "Kelola Pengguna"
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold text-lime-600 mb-6">Kelola Pengguna</h1>

      <TableUsers users={users} />
    </>
  )
}

export default AdminUsers
