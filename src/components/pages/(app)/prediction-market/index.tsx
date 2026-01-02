"use client";

import React, { useState, useMemo } from 'react';
import { useGetPredictions } from '@/hooks';
import Sidebar from "../../../ui/Sidebar";
import { CreatePredictionForm } from './CreatePredictionForm';
import { PredictionMarketHeader } from './sections/PredictionMarketHeader';
import { MarketContent } from './sections/MarketContent';
import { LoadingState } from './sections/LoadingState';
import { ErrorState } from './sections/ErrorState';

interface MarketFormData {
  title: string;
  description: string;
  endDate: string;
  endTime: string;
  poolSize: string;
  category: string;
  isPrivate: boolean;
}

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

interface PredictionMarketProps {
  onMarketCreated?: (market: MarketFormData) => void;
  onMarketClick?: (market: MarketData) => void;
  markets?: MarketData[];
}

export const PredictionMarket: React.FC<PredictionMarketProps> = ({
  onMarketCreated,
  onMarketClick,
  markets: propMarkets = []
}) => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { predictions, isLoading, error, refetch } = useGetPredictions();

  const markets = useMemo(() => {
    if (propMarkets.length > 0) return propMarkets;

    return predictions.map(prediction => ({
      id: prediction.id,
      title: prediction.title,
      description: prediction.description,
      creator: prediction.creator?.displayName || 'User',
      createdAt: prediction.createdAt,
      endDate: prediction.endDate,
      totalPool: prediction.totalVolume || 0,
      participants: prediction.participantCount || 0,
      status: prediction.status?.toLowerCase() as 'active' | 'closed' | 'pending',
      category: prediction.marketType,
      groupImage: prediction.imageUrl,
      groupName: prediction.group?.name || 'Unknown Group',
      creatorAvatar: prediction.creator?.avatarUrl,
      yesVotes: prediction.yesPool || 0,
      noVotes: prediction.noPool || 0,
      yesPercentage: prediction.yesPercentage || 50,
      noPercentage: prediction.noPercentage || 50
    }));
  }, [propMarkets, predictions]);

  const handleMarketClick = (market: MarketData) => {
    onMarketClick?.(market);
  };

  const handleCreateClick = () => {
    setShowOnboarding(true);
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      {!showOnboarding && <Sidebar />}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <PredictionMarketHeader />

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : (
          <MarketContent 
            markets={markets}
            onMarketClick={handleMarketClick}
            onCreateMarket={handleCreateClick}
          />
        )}

        <CreatePredictionForm
          isOpen={showOnboarding}
          onClose={handleCloseOnboarding}
          onSuccess={() => {
            setShowOnboarding(false);
            refetch();
          }}
        />
      </div>
    </div>
  );
};