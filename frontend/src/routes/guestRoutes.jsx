import GuestRoute from "../middleware/GuestRoute"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"

const guestRoutes = {
  path: "/auth",
  children: [
    {
      path: "login",
      element: (
        <GuestRoute>
          <Login />
        </GuestRoute>
      ),
    },
    {
      path: "register",
      element: (
        <GuestRoute>
          <Register />
        </GuestRoute>
      ),
    },
  ],
}

export default guestRoutes
