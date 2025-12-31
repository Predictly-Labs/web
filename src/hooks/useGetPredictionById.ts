import { useState, useCallback } from 'react'
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