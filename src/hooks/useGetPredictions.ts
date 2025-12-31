import { useState, useEffect, useCallback } from 'react'
import { usePredictions } from './usePredictions'

interface PredictionMarket {
  id: string
  groupId: string
  title: string
  description: string
  imageUrl: string
  marketType: string
  endDate: string
  minStake: number
  maxStake: number
  createdAt: string
  updatedAt: string
}

export const useGetPredictions = () => {
  const [predictions, setPredictions] = useState<PredictionMarket[]>([])
  const { getPredictions, isLoading, error } = usePredictions()

  const fetchPredictions = useCallback(async () => {
    try {
      const data = await getPredictions()
      setPredictions(data)
    } catch (err) {
      console.error('Failed to fetch predictions:', err)
    }
  }, [getPredictions])

  const refetch = useCallback(() => {
    fetchPredictions()
  }, [fetchPredictions])

  useEffect(() => {
    fetchPredictions()
  }, [fetchPredictions])

  return {
    predictions,
    isLoading,
    error,
    refetch
  }
}