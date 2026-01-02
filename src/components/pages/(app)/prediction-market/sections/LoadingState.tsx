export const LoadingState = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-4 border-pink-900 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-sm font-medium">Loading prediction markets...</p>
      </div>
    </div>
  )
}