"use client";

import React, { useState, useMemo } from 'react';
import { CreatePredictionForm } from './CreatePredictionForm';
import { MarketHistory } from './MarketHistory';
import Sidebar from "../../../ui/Sidebar";
import Image from "next/image";
import { useGetPredictions } from '@/hooks';

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

  const handleMarketCreated = (data: MarketFormData) => {
    onMarketCreated?.(data);
    setShowOnboarding(false);
    refetch();
  };

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
        <div className="mb-4">
          <div className="relative mb-6">
            <div 
              className="relative overflow-hidden rounded-2xl"
              style={{
                backgroundImage: "url('/assets/main/background/bg-main.png')",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-4 p-2">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-medium text-pink-900">Prediction Markets</h1>
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">Create and manage your prediction markets with friends and groups.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-pink-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-red-600 text-sm mb-4">Failed to load markets</p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-pink-900 text-white rounded-lg text-sm hover:bg-pink-800 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <MarketHistory 
              markets={markets}
              onMarketClick={handleMarketClick}
              onCreateMarket={handleCreateClick}
            />
          )}
        </div>

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