'use client';

import { useState, useCallback } from 'react';
import { predictionsApi } from '@/lib/api/predictions';
import type { PredictionMarket } from '@/types/api';
import type { CreateMarketInput, ListMarketsParams } from '@/types/requests';

export function usePredictions() {
  const [markets, setMarkets] = useState<PredictionMarket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarkets = useCallback(async (params?: ListMarketsParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await predictionsApi.list(params);
      if (response.data.success) {
        setMarkets(response.data.data);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch markets';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createMarket = useCallback(async (data: CreateMarketInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await predictionsApi.create(data);
      if (response.data.success) {
        setMarkets((prev) => [response.data.data, ...prev]);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to create market';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    markets,
    isLoading,
    error,
    fetchMarkets,
    createMarket,
  };
}
