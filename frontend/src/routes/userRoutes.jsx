import UserRoute from "../middleware/UserRoute"
import NotFound from "../pages/error/NotFound"
import ServerError from "../pages/error/ServerError"
import PaymentError from "../pages/payment/PaymentError"
import PaymentSuccess from "../pages/payment/PaymentSuccess"
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
      path: "/error-500",
      element: <ServerError />,
    },
    {
      path: "/order/payment-success",
      element: <PaymentSuccess />,
    },
    {
      path: "/order/payment-error",
      element: <PaymentError />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
}

export default userRoutes
