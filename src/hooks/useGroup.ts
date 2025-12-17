'use client';

import { useState, useCallback } from 'react';
import { groupsApi } from '@/lib/api/groups';
import type { Group, GroupMember, PredictionMarket } from '@/types/api';

interface GroupDetail extends Group {
  members: GroupMember[];
  markets: PredictionMarket[];
}

export function useGroup(groupId?: string) {
  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroup = useCallback(async (id?: string) => {
    const targetId = id || groupId;
    if (!targetId) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await groupsApi.getById(targetId);
      if (response.data.success) {
        setGroup(response.data.data);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch group';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  return {
    group,
    isLoading,
    error,
    fetchGroup,
  };
}
