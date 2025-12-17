'use client';

import { useState, useCallback } from 'react';
import { groupsApi } from '@/lib/api/groups';
import type { Group } from '@/types/api';
import type { CreateGroupInput, JoinGroupInput, ListGroupsParams } from '@/types/requests';

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async (params?: ListGroupsParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await groupsApi.list(params);
      if (response.data.success) {
        setGroups(response.data.data);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch groups';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createGroup = useCallback(async (data: CreateGroupInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await groupsApi.create(data);
      if (response.data.success) {
        setGroups((prev) => [response.data.data, ...prev]);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to create group';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const joinGroup = useCallback(async (data: JoinGroupInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await groupsApi.join(data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to join group';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    groups,
    isLoading,
    error,
    fetchGroups,
    createGroup,
    joinGroup,
  };
}
