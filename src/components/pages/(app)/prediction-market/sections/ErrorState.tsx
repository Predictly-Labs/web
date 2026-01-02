interface ErrorStateProps {
  onRetry: () => void
}

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-red-600 text-sm mb-4">Failed to load markets</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-pink-900 text-white rounded-lg text-sm hover:bg-pink-800 transition-colors cursor-pointer"
        >
          Retry
        </button>
      </div>
    </div>
  )
}