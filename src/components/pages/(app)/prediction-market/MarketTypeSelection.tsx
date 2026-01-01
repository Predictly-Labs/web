'use client'

import { useState } from 'react'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import fullDegenAnimation from '../../../../../public/assets/main/animation/full-degen-animation.json'
import noRiskAnimation from '../../../../../public/assets/main/animation/no-risk-animation.json'

interface MarketTypeSelectionProps {
  selectedType: 'STANDARD' | 'NO_LOSS'
  onTypeChange: (type: 'STANDARD' | 'NO_LOSS') => void
}

export const MarketTypeSelection = ({ selectedType, onTypeChange }: MarketTypeSelectionProps) => {
  const [hoveredType, setHoveredType] = useState<'STANDARD' | 'NO_LOSS' | null>(null)

  const defiProtocols = [
    { name: 'Canopy', logo: '/assets/logo/defi-protocol-logo/Canopy.jpg' },
    { name: 'Layer Bank', logo: '/assets/logo/defi-protocol-logo/Layer Bank.jpg' },
    { name: 'MovePosition', logo: '/assets/logo/defi-protocol-logo/MovePosition.jpg' }
  ]

  const marketTypes = [
    {
      type: 'STANDARD' as const,
      name: 'Degen Mode',
      description: 'High risk, high reward prediction markets',
      animation: fullDegenAnimation,
      features: ['Maximum potential returns', 'Full market exposure', 'Traditional betting mechanics']
    },
    {
      type: 'NO_LOSS' as const,
      name: 'Zero Risk',
      description: 'Only DeFi yield is wagered, principal tokens remain safe',
      animation: noRiskAnimation,
      features: ['Principal tokens protected', 'Only yield earnings at risk', 'Guaranteed token return']
    }
  ]

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Market Type *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketTypes.map((market) => (
            <motion.div
              key={market.type}
              className={`relative rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden ${
                selectedType === market.type
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => onTypeChange(market.type)}
              onMouseEnter={() => setHoveredType(market.type)}
              onMouseLeave={() => setHoveredType(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {market.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {market.description}
                    </p>
                  </div>
                  
                  <div className="w-16 h-16 shrink-0">
                    <Lottie 
                      animationData={market.animation}
                      loop={hoveredType === market.type || selectedType === market.type}
                      autoplay={hoveredType === market.type || selectedType === market.type}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {market.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        selectedType === market.type ? 'bg-black' : 'bg-gray-400'
                      }`} />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {market.type === 'NO_LOSS' && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-2">Supported DeFi Protocols:</div>
                    <div className="flex items-center gap-2">
                      {defiProtocols.map((protocol, index) => (
                        <div key={index} className="relative w-6 h-6 rounded-full overflow-hidden bg-white border border-gray-200">
                          <Image
                            src={protocol.logo}
                            alt={protocol.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">+3 protocols</span>
                    </div>
                  </div>
                )}

                {selectedType === market.type && (
                  <motion.div
                    className="absolute top-4 right-4 w-6 h-6 bg-black rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}