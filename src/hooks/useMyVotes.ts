'use client';

import { useState, useCallback } from 'react';
import { predictionsApi } from '@/lib/api/predictions';
import type { Vote } from '@/types/api';

export function useMyVotes() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await predictionsApi.getMyVotes();
      if (response.data.success) {
        setVotes(response.data.data);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch votes';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Calculate totals
  const totalStaked = votes.reduce((sum, v) => sum + v.amount, 0);
  const totalYield = votes.reduce((sum, v) => sum + (v.mockYield || 0), 0);
  const pendingRewards = votes
    .filter((v) => v.rewardAmount && !v.hasClaimedReward)
    .reduce((sum, v) => sum + (v.rewardAmount || 0), 0);

  return {
    votes,
    isLoading,
    error,
    fetchVotes,
    totalStaked,
    totalYield,
    pendingRewards,
  };
}
