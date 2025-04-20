function ConfirmDialog({ isOpen, isLoading, message, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
          {message}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 cursor-pointer rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 cursor-pointer rounded bg-red-500 text-white hover:bg-red-600"
          >
            {isLoading ? "Loading..." : "Ya"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
