import Sidebar from '@/components/ui/Sidebar'

export const LoadingState = () => {
  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="w-12 h-12 border-4 border-pink-900 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-sm font-medium">Loading market details...</p>
        </div>
      </div>
    </div>
  )
}