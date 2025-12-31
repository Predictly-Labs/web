import { useState, useCallback } from 'react'
import { usePredictions } from './usePredictions'

interface CreatePredictionData {
  groupId: string
  title: string
  description: string
  imageUrl: string
  marketType: string
  endDate: string
  minStake: number
  maxStake: number
}

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

export const useCreatePrediction = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const { createPrediction } = usePredictions()

  const handleCreate = useCallback(async (
    data: CreatePredictionData
  ): Promise<PredictionMarket | null> => {
    setIsCreating(true)
    setCreateError(null)

    try {
      const result = await createPrediction(data)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create prediction'
      setCreateError(errorMessage)
      return null
    } finally {
      setIsCreating(false)
    }
  }, [createPrediction])

  return {
    handleCreate,
    isCreating,
    createError
  }
}