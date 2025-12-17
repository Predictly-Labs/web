'use client';

import { useState, useCallback } from 'react';
import { predictionsApi } from '@/lib/api/predictions';
import type { PredictionMarket, Vote } from '@/types/api';
import type { VoteInput, ResolveMarketInput } from '@/types/requests';

interface MarketDetail extends PredictionMarket {
  votes: Vote[];
  userVote?: Vote | null;
}

export function usePrediction(marketId?: string) {
  const [market, setMarket] = useState<MarketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarket = useCallback(async (id?: string) => {
    const targetId = id || marketId;
    if (!targetId) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await predictionsApi.getById(targetId);
      if (response.data.success) {
        setMarket(response.data.data);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch market';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [marketId]);

  const vote = useCallback(async (data: VoteInput, id?: string) => {
    const targetId = id || marketId;
    if (!targetId) throw new Error('Market ID required');

    setIsLoading(true);
    setError(null);
    try {
      const response = await predictionsApi.vote(targetId, data);
      // Refresh market data after voting
      await fetchMarket(targetId);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to place vote';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [marketId, fetchMarket]);

  const resolve = useCallback(async (data: ResolveMarketInput, id?: string) => {
    const targetId = id || marketId;
    if (!targetId) throw new Error('Market ID required');

    setIsLoading(true);
    setError(null);
    try {
      const response = await predictionsApi.resolve(targetId, data);
      await fetchMarket(targetId);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to resolve market';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [marketId, fetchMarket]);

  const claim = useCallback(async (id?: string) => {
    const targetId = id || marketId;
    if (!targetId) throw new Error('Market ID required');

    setIsLoading(true);
    setError(null);
    try {
      const response = await predictionsApi.claim(targetId);
      await fetchMarket(targetId);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to claim reward';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [marketId, fetchMarket]);

  return {
    market,
    isLoading,
    error,
    fetchMarket,
    vote,
    resolve,
    claim,
  };
}
