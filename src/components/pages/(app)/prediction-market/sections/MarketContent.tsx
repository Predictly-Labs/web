import { MarketHistory } from '../MarketHistory'

interface MarketData {
  id: string;
  title: string;
  description: string;
  creator: string;
  createdAt: string;
  endDate: string;
  totalPool: number;
  participants: number;
  status: 'active' | 'closed' | 'pending';
  category: string;
  myPosition?: string;
  currentOdds?: number;
  groupImage?: string;
}

interface MarketContentProps {
  markets: MarketData[]
  onMarketClick: (market: MarketData) => void
  onCreateMarket: () => void
}

export const MarketContent = ({ markets, onMarketClick, onCreateMarket }: MarketContentProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
      <MarketHistory 
        markets={markets}
        onMarketClick={onMarketClick}
        onCreateMarket={onCreateMarket}
      />
    </div>
  )
}