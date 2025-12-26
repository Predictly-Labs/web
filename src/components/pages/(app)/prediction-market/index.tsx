"use client";

import React, { useState } from 'react';
import { CreateMarketOnboarding } from './CreateMarketOnboarding';
import { MarketHistory } from './MarketHistory';
import Sidebar from "../../../ui/Sidebar";
import Image from "next/image";

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
  markets = []
}) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleMarketCreated = (data: MarketFormData) => {
    onMarketCreated?.(data);
    setShowOnboarding(false);
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
                    <Image
                      src="/assets/main/icon/prediction-market-icon.png"
                      alt="Prediction Markets Icon"
                      width={25}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">Create and manage your prediction markets with friends and groups.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
          <MarketHistory 
            markets={markets}
            onMarketClick={handleMarketClick}
            onCreateMarket={handleCreateClick}
          />
        </div>

        <CreateMarketOnboarding
          isOpen={showOnboarding}
          onClose={handleCloseOnboarding}
          onMarketCreated={handleMarketCreated}
        />
      </div>
    </div>
  );
};