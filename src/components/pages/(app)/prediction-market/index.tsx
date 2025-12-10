"use client";

import React, { useState } from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { CreateMarketForm } from './CreateMarketForm';
import { MarketHistory } from './MarketHistory';
import Sidebar from "../../../ui/Sidebar";

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
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleMarketSubmit = (data: MarketFormData) => {
    onMarketCreated?.(data);
    setShowCreateForm(false);
  };

  const handleMarketClick = (market: MarketData) => {
    onMarketClick?.(market);
  };

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleBackToHistory = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-2">
                Prediction Markets
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3">
                Create and manage your prediction markets with friends and groups.
              </p>
            </div>
            
            {!showCreateForm && (
              <button
                onClick={handleCreateClick}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Prediction Market
              </button>
            )}
          </div>
          <div className="border-b border-gray-200"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-100">
          {showCreateForm ? (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Create New Prediction Market
                  </h2>
                  <p className="text-gray-600">
                    Set up a new prediction market and invite your friends to participate.
                  </p>
                </div>
                <button
                  onClick={handleBackToHistory}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <TrendingUp className="w-5 h-5" />
                  Back to History
                </button>
              </div>
              <CreateMarketForm onSubmit={handleMarketSubmit} />
            </div>
          ) : (
            <MarketHistory 
              markets={markets}
              onMarketClick={handleMarketClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};