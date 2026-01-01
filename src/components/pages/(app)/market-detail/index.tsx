'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Lottie from 'lottie-react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useGetPredictionById } from '@/hooks/useGetPredictionById'
import { usePlaceVote } from '@/hooks/usePlaceVote'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import Sidebar from '@/components/ui/Sidebar'
import fullDegenAnimation from '../../../../../public/assets/main/animation/full-degen-animation.json'
import noRiskAnimation from '../../../../../public/assets/main/animation/no-risk-animation.json'

interface MarketDetailProps {
  marketId: string
}

interface StatusBadgeProps {
  status: string
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    const lowerStatus = status?.toLowerCase()
    switch (lowerStatus) {
      case 'active': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' }
      case 'closed': return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Closed' }
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Unknown' }
    }
  }

  const config = getStatusConfig(status)
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

interface MarketTypeBadgeProps {
  marketType: string
}

const MarketTypeBadge = ({ marketType }: MarketTypeBadgeProps) => {
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

interface AnimatedYieldProps {
  targetYield: number
}

const AnimatedYield = ({ targetYield }: AnimatedYieldProps) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, latest => latest.toFixed(4))
  const [displayValue, setDisplayValue] = useState('0.0000')

  useEffect(() => {
    const controls = animate(count, targetYield, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(4))
      }
    })
    return controls.stop
  }, [count, targetYield])

  return (
    <motion.span 
      className="text-gray-900 font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayValue}%
    </motion.span>
  )
}

const LiveYieldCounter = () => {
  const [currentYield, setCurrentYield] = useState(0.0001)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYield(prev => {
        const increment = Math.random() * 0.000005 + 0.000001
        return prev + increment
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="flex justify-between items-center py-2 border-t border-gray-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <span className="text-gray-500">Live Yield</span>
      <motion.span 
        className="text-green-600 font-medium"
        key={currentYield}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        +{currentYield.toFixed(6)}%
      </motion.span>
    </motion.div>
  )
}

interface DefiProtocolDisplayProps {
  protocols: Array<{ name: string; logo: string }>
}

const DefiProtocolDisplay = ({ protocols }: DefiProtocolDisplayProps) => {
  return (
    <div className="flex flex-col gap-3 mt-4 pt-3 border-t border-gray-100">
      <span className="text-gray-500 text-sm">Supported DeFi Protocols</span>
      <div className="flex flex-wrap gap-3">
        {protocols.map((protocol, index) => (
          <motion.div
            key={protocol.name}
            className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-white border border-gray-200">
              <Image
                src={protocol.logo}
                alt={protocol.name}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{protocol.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const MarketDetail = ({ marketId }: MarketDetailProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const { prediction, fetchPredictionById, isLoading, error } = useGetPredictionById()
  const { placeVote, isVoting, voteError } = usePlaceVote()
  const [voteAmount, setVoteAmount] = useState<string>('')
  const [selectedVote, setSelectedVote] = useState<'YES' | 'NO' | null>(null)

  const defiProtocols = [
    { name: 'Canopy', logo: '/assets/logo/defi-protocol-logo/Canopy.jpg' },
    { name: 'Layer Bank', logo: '/assets/logo/defi-protocol-logo/Layer Bank.jpg' },
    { name: 'MovePosition', logo: '/assets/logo/defi-protocol-logo/MovePosition.jpg' }
  ]

  const calculatedYield = 12.5687

  useEffect(() => {
    if (marketId) {
      fetchPredictionById(marketId)
    }
  }, [marketId, fetchPredictionById])

  const handleBack = () => {
    router.push('/app/create-market')
  }

  const handlePlaceVote = async () => {
    if (!selectedVote || !voteAmount || !prediction) {
      toast.error('Please select a vote option and enter an amount')
      return
    }

    const amount = parseFloat(voteAmount)
    if (amount < prediction.minStake || amount > prediction.maxStake) {
      toast.error(`Amount must be between $${prediction.minStake} and $${prediction.maxStake}`)
      return
    }

    const result = await placeVote(prediction.id, { prediction: selectedVote, amount })
    if (result) {
      toast.success(`Successfully placed ${selectedVote} vote for $${amount}`)
      setVoteAmount('')
      setSelectedVote(null)
      fetchPredictionById(marketId)
    }
  }

  if (isLoading) {
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

  if (error || !prediction) {
    return (
      <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <Sidebar />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-red-600 text-sm mb-4">Failed to load prediction details</p>
            <button
              onClick={handleBack}
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

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <button
            onClick={handleBack}
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

        <div
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-4 border-white"
          style={{
            backgroundImage: "url('/assets/main/background/bg-market.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.8,
          }}
        >
          <div className="bg-white rounded-3xl p-8 border border-gray-100">
            <div className="flex items-start gap-6 mb-8">
              {prediction.imageUrl && (
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-200 shrink-0">
                  <Image
                    src={prediction.imageUrl}
                    alt="Market"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-light text-gray-900">{prediction.title}</h2>
                </div>
                <p className="text-gray-500 text-lg mb-4 leading-relaxed">{prediction.description}</p>
                {prediction.group && (
                  <div className="text-gray-400 text-sm font-medium">
                    {prediction.group.name}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-8">
              <div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Yes</span>
                    <span className="text-2xl font-light text-gray-900">{prediction.yesPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${prediction.yesPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">No</span>
                    <span className="text-2xl font-light text-gray-900">{prediction.noPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${prediction.noPercentage}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-400 pt-4">
                    <span>{prediction.yesPool} votes</span>
                    <span>{prediction.noPool} votes</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-6 text-sm">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500">Volume</span>
                    <span className="text-gray-900 font-medium">${prediction.totalVolume}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500">Participants</span>
                    <span className="text-gray-900 font-medium">{prediction.participantCount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500">Stake Range</span>
                    <span className="text-gray-900 font-medium">${prediction.minStake} - ${prediction.maxStake}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500">End Date</span>
                    <span className="text-gray-900 font-medium">{new Date(prediction.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500">Market Type</span>
                    <MarketTypeBadge marketType={prediction.marketType} />
                  </div>
                  {prediction.marketType?.toUpperCase() === 'NO_LOSS' && (
                    <>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-500">Calculated Yield</span>
                        <AnimatedYield targetYield={calculatedYield} />
                      </div>
                      <LiveYieldCounter />
                    </>
                  )}
                  {prediction.creator && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-500">Creator</span>
                      <div className="flex items-center gap-2">
                        {prediction.creator.avatarUrl && (
                          <div className="w-[18px] h-[18px] rounded-full overflow-hidden bg-gray-200 shrink-0">
                            <Image
                              src={prediction.creator.avatarUrl}
                              alt={prediction.creator.displayName}
                              width={18}
                              height={18}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="text-gray-900 font-medium">{prediction.creator.displayName}</span>
                      </div>
                    </div>
                  )}
                </div>
                {prediction.marketType?.toUpperCase() === 'NO_LOSS' && (
                  <DefiProtocolDisplay protocols={defiProtocols} />
                )}
              </div>
            </div>

            {prediction.status?.toLowerCase() === 'active' && user && (
              <div className="border-t border-gray-50 pt-8">
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="text-center">
                    <h3 className="text-xl font-light text-gray-900 mb-2">Make Your Prediction</h3>
                    <p className="text-gray-500 text-sm">Choose your stance and stake amount</p>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setSelectedVote('YES')}
                      className={`px-8 py-4 rounded-2xl transition-all cursor-pointer text-lg font-medium min-w-[120px] ${
                        selectedVote === 'YES'
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      YES
                    </button>
                    
                    <button
                      onClick={() => setSelectedVote('NO')}
                      className={`px-8 py-4 rounded-2xl transition-all cursor-pointer text-lg font-medium min-w-[120px] ${
                        selectedVote === 'NO'
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      NO
                    </button>
                  </div>

                  <div className="max-w-md mx-auto">
                    <div className="flex items-center gap-3 mb-3">
                      <label htmlFor="voteAmount" className="text-gray-600 text-sm font-medium">
                        Amount
                      </label>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Image
                          src="/assets/logo/logo-coin/move-logo.jpeg"
                          alt="Move Token"
                          width={14}
                          height={14}
                          className="rounded-full"
                        />
                        <span>MOVE</span>
                      </div>
                    </div>
                    <input
                      type="number"
                      id="voteAmount"
                      value={voteAmount}
                      onChange={(e) => setVoteAmount(e.target.value)}
                      step="0.001"
                      min={prediction.minStake}
                      max={prediction.maxStake}
                      placeholder={`${prediction.minStake} - ${prediction.maxStake}`}
                      className="w-full px-4 py-4 text-center border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-lg font-light"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handlePlaceVote}
                      disabled={isVoting || !selectedVote || !voteAmount}
                      className={`px-12 py-4 rounded-2xl font-medium transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 text-lg ${
                        selectedVote === 'YES'
                          ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                          : selectedVote === 'NO'
                          ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isVoting ? 'Placing...' : selectedVote ? `Predict ${selectedVote}` : 'Select Prediction'}
                    </button>
                    
                    {voteError && (
                      <div className="text-red-500 text-sm mt-4">
                        {voteError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}