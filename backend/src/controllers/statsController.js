import User from "../models/userModel.js"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import dayjs from "dayjs"

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalOrders = await Order.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalRevenueAgg = await Order.aggregate([
      { $match: { status: { $in: ["paid", "shipped", "delivered"] } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])

    const totalRevenue = totalRevenueAgg[0]?.total || 0

    return res.status(200).json({
      message: "Berhasil mengambil statistik admin",
      data: {
        stats: {
          totalUsers,
          totalOrders,
          totalProducts,
          totalRevenue,
        },
      },
    })
  } catch (error) {
    console.error("Error in getStats function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  }
}

export const getOrderStats = async (req, res) => {
  try {
    const now = new Date()

    const sevenDaysAgo = dayjs(now).subtract(6, "day").startOf("day").toDate()

    const last7Days = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          status: { $ne: "cancelled" }, // opsional: exclude cancelled
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalSales: { $sum: "$amount" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ])

    const past7Days = [...Array(7)].map((_, i) =>
      dayjs()
        .subtract(6 - i, "day")
        .format("YYYY-MM-DD")
    )

    const salesLast7Days = past7Days.map((date) => {
      const found = last7Days.find((item) => item._id === date)
      return {
        date,
        totalSales: found ? found.totalSales : 0,
        totalOrders: found ? found.totalOrders : 0,
      }
    })

    const oneYearAgo = dayjs(now)
      .subtract(11, "month")
      .startOf("month")
      .toDate()

    const last12Months = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: oneYearAgo },
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: "$amount" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ])

    const past12Months = [...Array(12)].map((_, i) =>
      dayjs().subtract(11 - i, "month")
    )

    const salesLast12Months = past12Months.map((date) => {
      const year = date.year()
      const month = date.month() + 1
      const found = last12Months.find(
        (item) => item._id.year === year && item._id.month === month
      )
      return {
        month: date.format("MMM YYYY"),
        totalSales: found ? found.totalSales : 0,
        totalOrders: found ? found.totalOrders : 0,
      }
    })

    return res.status(200).json({
      message: "Mengambil statistik pesanan berhasil",
      data: {
        salesLast7Days,
        salesLast12Months,
      },
    })
  } catch (error) {
    console.error("Error in getOrderStats function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: [] })
  }
}
