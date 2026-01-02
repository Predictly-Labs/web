import Image from 'next/image'
import { MarketTypeBadge } from '../components/MarketTypeBadge'
import { AnimatedYield } from '../components/AnimatedYield'
import { LiveYieldCounter } from '../components/LiveYieldCounter'
import { DefiProtocolDisplay } from '../components/DefiProtocolDisplay'
import { VotesList } from '../components/VotesList'

interface MarketDetailStatsProps {
  prediction: any
  children?: React.ReactNode
}

export const MarketDetailStats = ({ prediction, children }: MarketDetailStatsProps) => {
  const calculatedYield = 12.5687

  const defiProtocols = [
    { name: 'Canopy', logo: '/assets/logo/defi-protocol-logo/Canopy.jpg' },
    { name: 'Layer Bank', logo: '/assets/logo/defi-protocol-logo/Layer Bank.jpg' },
    { name: 'MovePosition', logo: '/assets/logo/defi-protocol-logo/MovePosition.jpg' }
  ]

  return (
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
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/logo/logo-coin/move-logo.jpeg"
                  alt="Move Token"
                  width={14}
                  height={14}
                  className="rounded-full"
                />
                <span className="text-gray-900 font-medium">{prediction.totalVolume}</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500">Participants</span>
              <span className="text-gray-900 font-medium">{prediction.participantCount}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500">Stake Range</span>
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/logo/logo-coin/move-logo.jpeg"
                  alt="Move Token"
                  width={14}
                  height={14}
                  className="rounded-full"
                />
                <span className="text-gray-900 font-medium">{prediction.minStake} - {prediction.maxStake}</span>
              </div>
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
          
          {prediction.votes && prediction.votes.length > 0 && (
            <VotesList votes={prediction.votes} groupName={prediction.group?.name} />
          )}
        </div>
      </div>
      
      {children}
    </div>
  )
}