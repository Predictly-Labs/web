"use client";

import React from 'react';
import { Calendar, Users, TrendingUp, Clock, Plus } from 'lucide-react';
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
  groupName?: string;
  creatorAvatar?: string;
  yesVotes?: number;
  noVotes?: number;
  yesPercentage?: number;
  noPercentage?: number;
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

const MarketCard: React.FC<MarketCardProps> = ({ market, onClick }) => {
  const yesVotes = market.yesVotes || 0;
  const noVotes = market.noVotes || 0;
  const yesPercentage = market.yesPercentage || 50;
  const noPercentage = market.noPercentage || 50;

  return (
    <div 
      onClick={() => onClick?.(market)}
      className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all cursor-pointer hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1 pr-3">
          {market.groupImage && (
            <Image
              src={market.groupImage}
              alt="Group"
              width={40}
              height={40}
              className="rounded-full shrink-0"
            />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
              {market.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {market.description}
            </p>
            <div className="text-xs text-gray-500 mb-3">
              Group: {market.groupName}
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <StatusBadge status={market.status} />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-green-600">Yes</span>
          <span className="text-sm font-medium text-green-600">{yesPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${yesPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-red-600">No</span>
          <span className="text-sm font-medium text-red-600">{noPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${noPercentage}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Yes: {yesVotes} votes</span>
          <span>No: {noVotes} votes</span>
        </div>
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
          {market.creatorAvatar && (
            <Image
              src={market.creatorAvatar}
              alt={market.creator}
              width={20}
              height={20}
              className="rounded-full"
            />
          )}
          <span className="text-sm text-gray-600">by {market.creator}</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
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
  )
};

export const MarketHistory: React.FC<MarketHistoryProps> = ({ 
  markets = [], 
  onMarketClick,
  onCreateMarket
}) => {
  const activeMarkets = markets.filter(m => m.status === 'active');
  const closedMarkets = markets.filter(m => m.status === 'closed');

  return (
    <div 
      className="space-y-8 relative p-6 rounded-3xl overflow-hidden min-h-[700px]"
      style={{
        backgroundImage: "url('/assets/main/background/bg-market.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10 h-full flex flex-col">
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

        {markets.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-16">
              <TrendingUp className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Ready to Start Predicting?</h3>
              <p className="text-gray-600 max-w-lg mx-auto mb-8 leading-relaxed">
                No prediction markets found. Create your first market and start engaging with your community on future outcomes. Make predictions, earn rewards, and build your reputation as a forecaster.
              </p>
              <button
                onClick={onCreateMarket}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Create Your First Market
              </button>
            </div>
          </div>
        )}

        {markets.length > 0 && (
          <div className="flex-1 space-y-8">
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
          </div>
        )}
      </div>
    </div>
  );
};