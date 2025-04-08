import UserRoute from "../middleware/UserRoute"
import NotFound from "../pages/error/NotFound"
import Home from "../pages/user/home"
import Orders from "../pages/user/orders"

const userRoutes = {
  path: "/",
  children: [
    {
      index: true,
      element: (
        <UserRoute>
          <Home />
        </UserRoute>
      ),
    },
    {
      path: "orders",
      element: (
        <UserRoute>
          <Orders />
        </UserRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
}

export default userRoutes
