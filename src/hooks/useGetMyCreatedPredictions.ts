import { useState, useEffect, useCallback } from 'react'
import { usePredictions } from './usePredictions'
import { useAuth } from './useAuth'

interface PredictionMarket {
  id: string
  onChainId?: string | null
  groupId: string
  title: string
  description: string
  imageUrl: string
  marketType: string
  endDate: string
  minStake: number
  maxStake: number
  status: string
  outcome?: string | null
  totalVolume: number
  yesPool: number
  noPool: number
  yesPercentage: number
  noPercentage: number
  participantCount: number
  resolvedById?: string | null
  resolvedAt?: string | null
  resolutionNote?: string | null
  createdById: string
  createdAt: string
  updatedAt: string
  creator?: {
    id: string
    displayName: string
    avatarUrl: string
  }
  group?: {
    id: string
    name: string
  }
  _count?: {
    votes: number
  }
}

export const useGetMyCreatedPredictions = () => {
  const [myCreatedPredictions, setMyCreatedPredictions] = useState<PredictionMarket[]>([])
  const { getMyCreatedPredictions, isLoading, error } = usePredictions()
  const { user } = useAuth()

  const fetchMyCreatedPredictions = useCallback(async () => {
    try {
      const data = await getMyCreatedPredictions()
      const myCreatedOnly = data.filter(prediction => prediction.createdById === user?.id)
      setMyCreatedPredictions(myCreatedOnly)
    } catch (err) {
      console.error('Failed to fetch my created predictions:', err)
    }
  }, [getMyCreatedPredictions, user?.id])

  const refetch = useCallback(() => {
    fetchMyCreatedPredictions()
  }, [fetchMyCreatedPredictions])

  useEffect(() => {
    fetchMyCreatedPredictions()
  }, [fetchMyCreatedPredictions])

  return {
    myCreatedPredictions,
    isLoading,
    error,
    refetch
  }
}