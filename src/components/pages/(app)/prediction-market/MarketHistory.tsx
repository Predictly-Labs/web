"use client";

import React from 'react';
import { Calendar, Users, TrendingUp, Clock, DollarSign, Plus } from 'lucide-react';
import Image from 'next/image';

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

interface StatusBadgeProps {
  status: MarketData['status'];
}

interface MarketCardProps {
  market: MarketData;
  onClick?: (market: MarketData) => void;
}

interface MarketHistoryProps {
  markets?: MarketData[];
  onMarketClick?: (market: MarketData) => void;
  onCreateMarket?: () => void;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: MarketData['status']) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' };
      case 'closed': return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Closed' };
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Unknown' };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

const MarketCard: React.FC<MarketCardProps> = ({ market, onClick }) => (
  <div 
    onClick={() => onClick?.(market)}
    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all cursor-pointer hover:shadow-lg"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {market.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {market.description}
        </p>
      </div>
      <StatusBadge status={market.status} />
    </div>

    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        <span>{new Date(market.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-1">
        <Users className="w-4 h-4" />
        <span>{market.participants} participants</span>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {market.groupImage && (
          <Image
            src={market.groupImage}
            alt="Group"
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <span className="text-sm text-gray-600">by {market.creator}</span>
      </div>
      <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
        <DollarSign className="w-4 h-4" />
        <span>${market.totalPool}</span>
      </div>
    </div>

    {market.myPosition && (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Your position:</span>
          <span className="font-medium text-gray-900">{market.myPosition}</span>
        </div>
      </div>
    )}
  </div>
);

export const MarketHistory: React.FC<MarketHistoryProps> = ({ 
  markets = [], 
  onMarketClick,
  onCreateMarket
}) => {
  const defaultMarkets: MarketData[] = [
    {
      id: '1',
      title: 'Will Bitcoin reach $100k by end of 2024?',
      description: 'Prediction on Bitcoin price reaching $100,000 before December 31, 2024',
      creator: 'Crypto Bulls',
      createdAt: '2024-12-01',
      endDate: '2024-12-31',
      totalPool: 2500,
      participants: 24,
      status: 'active',
      category: 'crypto',
      myPosition: 'Yes - $50',
      currentOdds: 65,
      groupImage: '/assets/logo/defi-protocol-logo/Layer Bank.jpg'
    },
    {
      id: '2',
      title: 'Next US President Election 2024',
      description: 'Who will be the next president of the United States?',
      creator: 'Political Minds',
      createdAt: '2024-11-15',
      endDate: '2024-11-05',
      totalPool: 5000,
      participants: 156,
      status: 'closed',
      category: 'politics',
      myPosition: 'Candidate A - $100',
      groupImage: '/assets/logo/defi-protocol-logo/Canopy.jpg'
    },
    {
      id: '3',
      title: 'Will OpenAI release GPT-5 in 2025?',
      description: 'Prediction on OpenAI releasing GPT-5 model during 2025',
      creator: 'Tech Innovators',
      createdAt: '2024-12-05',
      endDate: '2025-12-31',
      totalPool: 1800,
      participants: 42,
      status: 'active',
      category: 'tech',
      myPosition: 'Yes - $75',
      currentOdds: 72,
      groupImage: '/assets/logo/defi-protocol-logo/MovePosition.jpg'
    }
  ];

  const displayMarkets = markets.length > 0 ? markets : defaultMarkets;

  const activeMarkets = displayMarkets.filter(m => m.status === 'active');
  const closedMarkets = displayMarkets.filter(m => m.status === 'closed');

  return (
    <div 
      className="space-y-8 relative p-6 rounded-3xl overflow-hidden"
      style={{
        backgroundImage: "url('/assets/main/background/bg-market.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onCreateMarket}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="bg-white rounded-full p-1">
              <Plus className="w-2 h-2 text-black" />
            </div>
            Create Prediction Market
          </button>
        </div>

      {activeMarkets.length > 0 && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-5 flex items-center gap-2">
            <Clock className="w-5 h-5 text-black" />
            Active Markets ({activeMarkets.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeMarkets.map(market => (
              <MarketCard 
                key={market.id} 
                market={market} 
                onClick={onMarketClick}
              />
            ))}
          </div>
        </section>
      )}

      {closedMarkets.length > 0 && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mt-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            Closed Markets ({closedMarkets.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {closedMarkets.map(market => (
              <MarketCard 
                key={market.id} 
                market={market} 
                onClick={onMarketClick}
              />
            ))}
          </div>
        </section>
      )}

      {displayMarkets.length === 0 && (
        <div className="text-center py-16">
          <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Markets Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            You haven't created any prediction markets yet. Start by creating your first market!
          </p>
        </div>
      )}
      </div>
    </div>
  );
};