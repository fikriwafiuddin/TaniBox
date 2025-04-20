import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts"
import { useSelector } from "react-redux"
import formatShortDate from "../../../helpers/formatShortDate"

function AdminChart() {
  const {
    dailySales,
    monthlySales,
    isLoadingGetSalesAnalytics,
    isLoadingGetLatestActivities,
  } = useSelector((state) => state.stats)
  const { latestActivities } = useSelector((state) => state.activityLog)

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Grafik 7 Hari */}
      <div className="bg-white p-6 lg:col-span-2 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          7 Hari Terakhir
        </h2>

        {isLoadingGetSalesAnalytics ? (
          <div className="animate-pulse h-[300px] bg-gray-100 rounded" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailySales}>
              <defs>
                <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84cc16" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalOrders"
                stroke="#84cc16"
                fillOpacity={1}
                fill="url(#colorOrder)"
                name="Jumlah Pesanan"
              />
              <Area
                type="monotone"
                dataKey="totalSales"
                stroke="#16a34a"
                fillOpacity={1}
                fill="url(#totalSales)"
                name="Pendapatan (Rp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Aktivitas Terbaru */}
      <div className="bg-white p-6 mt-6 lg:mt-0 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Aktivitas Terbaru
        </h2>

        {isLoadingGetLatestActivities ? (
          <ul className="space-y-4 max-h-[300px]">
            {[...Array(4)].map((_, index) => (
              <li
                key={index}
                className="animate-pulse h-12 bg-gray-100 rounded"
              />
            ))}
          </ul>
        ) : (
          <ul className="space-y-4 max-h-[300px] overflow-y-auto">
            {latestActivities.map((activity) => (
              <li
                key={activity._id}
                className="flex justify-between items-start border-b pb-2"
              >
                <div>
                  <p className="text-sm text-gray-700">{activity.message}</p>
                  <span className="text-xs text-gray-400">
                    {formatShortDate(activity.createdAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Grafik Bulanan */}
      <div className="bg-white lg:col-span-3 mt-6 p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          12 Bulan Terakhir
        </h2>

        {isLoadingGetSalesAnalytics ? (
          <div className="animate-pulse h-[300px] bg-gray-100 rounded" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalOrders" fill="#84cc16" name="Jumlah Pesanan" />
              <Bar
                dataKey="totalRevenue"
                fill="#16a34a"
                name="Pendapatan (Rp)"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default AdminChart
