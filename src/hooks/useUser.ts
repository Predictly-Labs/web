'use client';

import { useState, useCallback } from 'react';
import { authApi } from '@/lib/api/auth';
import type { User } from '@/types/api';
import type { UpdateProfileInput } from '@/types/requests';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.getMe();
      if (response.data.success) {
        setUser(response.data.data);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch user';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: UpdateProfileInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.updateProfile(data);
      if (response.data.success) {
        setUser(response.data.data);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update profile';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Calculate accuracy
  const accuracy = user && user.totalPredictions > 0
    ? Math.round((user.correctPredictions / user.totalPredictions) * 100)
    : 0;

  return {
    user,
    isLoading,
    error,
    fetchUser,
    updateProfile,
    accuracy,
  };
}
