import { ArrowLeft } from 'lucide-react'
import Sidebar from '@/components/ui/Sidebar'

interface ErrorStateProps {
  onBack: () => void
}

export const ErrorState = ({ onBack }: ErrorStateProps) => {
  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-red-600 text-sm mb-4">Failed to load prediction details</p>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Market
          </button>
        </div>
      </div>
    </div>
  )
}