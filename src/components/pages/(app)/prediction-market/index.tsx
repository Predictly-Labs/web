"use client";

import React, { useEffect } from 'react';
import { useGetPredictions } from '@/hooks';
import Sidebar from "../../../ui/Sidebar";
import { CreatePredictionForm } from './CreatePredictionForm';
import { PredictionMarketHeader } from './sections/PredictionMarketHeader';
import { MarketContent } from './sections/MarketContent';
import { LoadingState } from './sections/LoadingState';
import { ErrorState } from './sections/ErrorState';
import {
  useMarkets,
  usePredictionMarketLoading,
  usePredictionMarketError,
  useCreateForm,
  usePredictionMarketActions
} from '@/hooks/usePredictionMarketState';

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
  const { predictions, isLoading, error, refetch } = useGetPredictions();
  const { transformedMarkets } = useMarkets();
  const { isLoading: globalLoading } = usePredictionMarketLoading();
  const { error: globalError } = usePredictionMarketError();
  const { showCreateForm } = useCreateForm();
  const {
    updatePredictions,
    updateMarkets,
    updateLoading,
    updateError,
    openCreateForm,
    closeCreateForm
  } = usePredictionMarketActions();

  useEffect(() => {
    updateLoading(true);
    if (predictions.length > 0) {
      updatePredictions(predictions);
    }
    updateLoading(false);
  }, [predictions, updatePredictions, updateLoading]);

  useEffect(() => {
    if (propMarkets.length > 0) {
      updateMarkets(propMarkets);
    }
  }, [propMarkets, updateMarkets]);

  useEffect(() => {
    updateLoading(isLoading);
  }, [isLoading, updateLoading]);

  useEffect(() => {
    updateError(error);
  }, [error, updateError]);

  const handleMarketClick = (market: MarketData) => {
    onMarketClick?.(market);
  };

  const handleCreateClick = () => {
    openCreateForm();
  };

  const handleCloseOnboarding = () => {
    closeCreateForm();
  };

  const currentLoading = globalLoading || isLoading;
  const currentError = globalError || error;
  const currentMarkets = transformedMarkets;

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      {!showCreateForm && <Sidebar />}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <PredictionMarketHeader />

        {currentLoading ? (
          <LoadingState />
        ) : currentError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : (
          <MarketContent 
            markets={currentMarkets}
            onMarketClick={handleMarketClick}
            onCreateMarket={handleCreateClick}
          />
        )}

        <CreatePredictionForm
          isOpen={showCreateForm}
          onClose={handleCloseOnboarding}
          onSuccess={() => {
            closeCreateForm();
            refetch();
          }}
        />
      </div>
    </div>
  );
};