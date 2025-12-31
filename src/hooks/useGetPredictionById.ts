import { useState, useCallback } from 'react'
import { usePredictions } from './usePredictions'

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

export const useGetPredictionById = () => {
  const [prediction, setPrediction] = useState<PredictionMarket | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { getPredictionById } = usePredictions()

  const fetchPredictionById = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const data = await getPredictionById(id)
      setPrediction(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch prediction'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [getPredictionById])

  const clearPrediction = useCallback(() => {
    setPrediction(null)
    setError(null)
  }, [])

  return {
    prediction,
    fetchPredictionById,
    clearPrediction,
    isLoading,
    error
  }
}