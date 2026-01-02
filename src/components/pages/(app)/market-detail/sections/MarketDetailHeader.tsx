import { ArrowLeft } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge'

interface MarketDetailHeaderProps {
  prediction: any
  onBack: () => void
}

export const MarketDetailHeader = ({ prediction, onBack }: MarketDetailHeaderProps) => {
  return (
    <div className="mb-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Market
      </button>

      <div className="relative mb-6">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            backgroundImage: "url('/assets/main/background/bg-main.png')",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 flex items-center justify-center gap-4 p-6">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-medium text-pink-900">
                  {prediction.title}
                </h1>
                <StatusBadge status={prediction.status} />
              </div>
              <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center max-w-2xl">
                {prediction.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}