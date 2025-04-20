import ActivityLog from "../models/activityLogModel.js"

export const getActivityLog = async (req, res) => {
  try {
    // Ambil query parameter dengan default nilai
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    // Hitung total data log
    const totalLogs = await ActivityLog.countDocuments()

    // Ambil data log dengan pagination
    const activityLog = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name email") // jika ingin tampilkan user

    return res.status(200).json({
      message: "Berhasil mendapatkan log aktivitas",
      data: {
        activityLog,
        pagination: {
          totalLogs,
          totalPages: Math.ceil(totalLogs / limit),
          currentPage: page,
          perPage: limit,
        },
      },
    })
  } catch (error) {
    console.log("Error in getActivityLog function", new Date(), error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: [] })
  }
}

export const getLatestActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find().sort({ createdAt: -1 }).limit(4)

    return res.status(200).json({
      message: "Berhasil mengambil aktivitas terbaru",
      data: { activities },
    })
  } catch (error) {
    console.error("Error in getLatestActivities function", new Date(), error)
    res.status(500).json({ message: "Internal Server Error", errors: [] })
  }
}
