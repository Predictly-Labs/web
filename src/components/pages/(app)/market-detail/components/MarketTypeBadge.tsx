import Lottie from 'lottie-react'
import fullDegenAnimation from '../../../../../../public/assets/main/animation/full-degen-animation.json'
import noRiskAnimation from '../../../../../../public/assets/main/animation/no-risk-animation.json'

interface MarketTypeBadgeProps {
  marketType: string
}

export const MarketTypeBadge = ({ marketType }: MarketTypeBadgeProps) => {
  const getMarketTypeConfig = (type: string) => {
    const upperType = type?.toUpperCase()
    switch (upperType) {
      case 'STANDARD': 
        return { 
          animation: fullDegenAnimation, 
          label: 'Full Degen',
          bg: 'bg-orange-100',
          text: 'text-orange-700'
        }
      case 'NO_LOSS': 
        return { 
          animation: noRiskAnimation, 
          label: 'Zero Loss',
          bg: 'bg-blue-100',
          text: 'text-blue-700'
        }
      default: 
        return { 
          animation: null, 
          label: type,
          bg: 'bg-gray-100',
          text: 'text-gray-700'
        }
    }
  }

  const config = getMarketTypeConfig(marketType)
  
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg}`}>
      {config.animation && (
        <div className="w-10 h-10">
          <Lottie 
            animationData={config.animation}
            loop={true}
            autoplay={true}
            style={{ 
              width: '100%', 
              height: '100%',
              imageRendering: 'auto'
            }}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice',
              progressiveLoad: true
            }}
          />
        </div>
      )}
      <span className={`text-xs font-medium ${config.text}`}>
        {config.label}
      </span>
    </div>
  )
}