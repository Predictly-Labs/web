import Sidebar from '@/components/ui/Sidebar'

export const LoadingState = () => {
  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-pink-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}