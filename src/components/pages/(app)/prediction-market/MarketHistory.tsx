"use client";

import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, Clock, Plus, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useGetPredictionById } from '@/hooks/useGetPredictionById';
import { usePlaceVote } from '@/hooks/usePlaceVote';
import { toast } from 'sonner';

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

const PredictionDetail: React.FC<{ 
  prediction: any; 
  onBack: () => void; 
  isLoading: boolean;
  onVoteSuccess?: () => void;
}> = ({ prediction, onBack, isLoading, onVoteSuccess }) => {
  const [voteAmount, setVoteAmount] = useState<string>('');
  const [selectedVote, setSelectedVote] = useState<'YES' | 'NO' | null>(null);
  const { placeVote, isVoting: isPlacing, voteError } = usePlaceVote();

  const handlePlaceVote = async () => {
    if (!selectedVote || !voteAmount || !prediction) {
      toast.error('Please select a vote option and enter an amount');
      return;
    }

    const amount = parseFloat(voteAmount);
    if (amount < prediction.minStake || amount > prediction.maxStake) {
      toast.error(`Amount must be between $${prediction.minStake} and $${prediction.maxStake}`);
      return;
    }

    const result = await placeVote(prediction.id, { prediction: selectedVote, amount });
    if (result) {
      toast.success(`Successfully placed ${selectedVote} vote for $${amount}`);
      setVoteAmount('');
      setSelectedVote(null);
      onVoteSuccess?.();
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-pink-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-red-600 text-sm mb-4">Failed to load prediction details</p>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Markets
      </button>

      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <div className="flex items-start gap-6 mb-8">
          {prediction.imageUrl && (
            <Image
              src={prediction.imageUrl}
              alt="Market"
              width={64}
              height={64}
              className="rounded-2xl"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-light text-gray-900">{prediction.title}</h1>
              <StatusBadge status={prediction.status?.toLowerCase()} />
            </div>
            <p className="text-gray-500 text-lg mb-4 leading-relaxed">{prediction.description}</p>
            {prediction.group && (
              <div className="text-gray-400 text-sm font-medium">
                {prediction.group.name}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
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
                <span className="text-gray-500">Ends</span>
                <span className="text-gray-900 font-medium">{new Date(prediction.endDate).toLocaleDateString()}</span>
              </div>
              {prediction.creator && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Creator</span>
                  <div className="flex items-center gap-2">
                    {prediction.creator.avatarUrl && (
                      <Image
                        src={prediction.creator.avatarUrl}
                        alt={prediction.creator.displayName}
                        width={18}
                        height={18}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-gray-900 font-medium">{prediction.creator.displayName}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {prediction.status?.toLowerCase() === 'active' && (
          <div className="border-t border-gray-50 pt-12">
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
                  disabled={isPlacing || !selectedVote || !voteAmount}
                  className={`px-12 py-4 rounded-2xl font-medium transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 text-lg ${
                    selectedVote === 'YES'
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                      : selectedVote === 'NO'
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isPlacing ? 'Placing...' : selectedVote ? `Predict ${selectedVote}` : 'Select Prediction'}
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
  );
};

export const MarketHistory: React.FC<MarketHistoryProps> = ({ 
  markets = [], 
  onMarketClick,
  onCreateMarket
}) => {
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
  const { prediction, fetchPredictionById, clearPrediction, isLoading } = useGetPredictionById();
  
  const activeMarkets = markets.filter(m => m.status === 'active');
  const closedMarkets = markets.filter(m => m.status === 'closed');

  const handleMarketClick = async (market: MarketData) => {
    setSelectedMarketId(market.id);
    await fetchPredictionById(market.id);
    onMarketClick?.(market);
  };

  const handleBackToMarkets = () => {
    setSelectedMarketId(null);
    clearPrediction();
  };

  const handleVoteSuccess = async () => {
    if (selectedMarketId) {
      await fetchPredictionById(selectedMarketId);
    }
  };

  if (selectedMarketId) {
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
        <div className="relative z-10">
          <PredictionDetail 
            prediction={prediction} 
            onBack={handleBackToMarkets} 
            isLoading={isLoading}
            onVoteSuccess={handleVoteSuccess}
          />
        </div>
      </div>
    );
  }

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
                      onClick={handleMarketClick}
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
                      onClick={handleMarketClick}
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