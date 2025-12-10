"use client";

import React from 'react';
import { Calendar, Users, TrendingUp, Clock, DollarSign, Target } from 'lucide-react';
import Image from 'next/image';

interface MarketData {
  id: string;
  title: string;
  description: string;
  endDate: string;
  totalPool: number;
  participants: number;
  status: 'active' | 'closed' | 'pending';
  category: string;
  currentOdds?: number;
  createdBy: string;
  createdAt: string;
}

interface GroupData {
  id: string;
  name: string;
  avatar: string;
  markets: MarketData[];
}

interface MarketCardProps {
  market: MarketData;
  groupName: string;
  onClick?: (market: MarketData) => void;
}

interface GroupMarketsProps {
  group: GroupData;
  onMarketClick?: (market: MarketData) => void;
}

interface StatusBadgeProps {
  status: MarketData['status'];
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
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

const MarketCard: React.FC<MarketCardProps> = ({ market, groupName, onClick }) => {
  const handleClick = () => {
    onClick?.(market);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const formatPool = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount}`;
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {market.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {market.description}
          </p>
        </div>
        <StatusBadge status={market.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Ends {formatDate(market.endDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{market.participants} participants</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>{formatPool(market.totalPool)} pool</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Target className="w-4 h-4" />
          <span>{market.category}</span>
        </div>
      </div>

      {market.currentOdds && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 font-medium">Current Odds</span>
            <span className="text-lg font-bold text-blue-800">{market.currentOdds}%</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Created by <span className="font-medium text-gray-700">{market.createdBy}</span> • {formatDate(market.createdAt)}
        </div>
        <div className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View Market →
        </div>
      </div>
    </div>
  );
};

export const GroupMarkets: React.FC<GroupMarketsProps> = ({ group, onMarketClick }) => {
  const activeMarkets = group.markets.filter(m => m.status === 'active');
  const closedMarkets = group.markets.filter(m => m.status === 'closed');

  const handleMarketClick = (market: MarketData) => {
    onMarketClick?.(market);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Image
          src={group.avatar}
          alt={group.name}
          width={80}
          height={80}
          className="rounded-2xl object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{group.name}</h2>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>{group.markets.length} total markets</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span>{activeMarkets.length} active</span>
            </div>
          </div>
        </div>
      </div>

      {activeMarkets.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-green-500" />
            Active Markets ({activeMarkets.length})
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeMarkets.map(market => (
              <MarketCard 
                key={market.id} 
                market={market}
                groupName={group.name}
                onClick={handleMarketClick}
              />
            ))}
          </div>
        </section>
      )}

      {closedMarkets.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-gray-500" />
            Closed Markets ({closedMarkets.length})
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {closedMarkets.map(market => (
              <MarketCard 
                key={market.id} 
                market={market}
                groupName={group.name}
                onClick={handleMarketClick}
              />
            ))}
          </div>
        </section>
      )}

      {group.markets.length === 0 && (
        <div className="text-center py-16">
          <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Markets Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            This group hasn't created any prediction markets yet. Be the first to create one!
          </p>
        </div>
      )}
    </div>
  );
};