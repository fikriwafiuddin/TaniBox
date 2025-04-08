function Filter({
  filterStatus,
  setFilterStatus,
  sortOrder,
  setSortOrder,
  statusOptions,
}) {
  return (
    <div className="flex gap-4">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="Semua">Semua Status</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="terbaru">Terbaru</option>
        <option value="terlama">Terlama</option>
      </select>
    </div>
  )
}

export default Filter
