import { useState, useEffect, useCallback } from 'react'
import { usePredictions } from './usePredictions'

interface PredictionsQueryParams {
  page?: number
  limit?: number
  groupId?: string
  status?: string
}

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

export const useGetPredictions = (params: PredictionsQueryParams = {}) => {
  const [predictions, setPredictions] = useState<PredictionMarket[]>([])
  const { getPredictions, isLoading, error } = usePredictions()

  const fetchPredictions = useCallback(async () => {
    try {
      const data = await getPredictions(params)
      setPredictions(data)
    } catch (err) {
      console.error('Failed to fetch predictions:', err)
    }
  }, [getPredictions, params])

  const refetch = useCallback((newParams?: PredictionsQueryParams) => {
    if (newParams) {
      getPredictions({ ...params, ...newParams }).then(data => {
        setPredictions(data)
      }).catch(err => {
        console.error('Failed to fetch predictions:', err)
      })
    } else {
      fetchPredictions()
    }
  }, [fetchPredictions, getPredictions, params])

  useEffect(() => {
    fetchPredictions()
  }, [fetchPredictions])

  return {
    predictions,
    isLoading,
    error,
    refetch,
    fetchWithParams: refetch
  }
}