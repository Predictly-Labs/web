import { useState, useCallback } from 'react'
import { usePredictions } from './usePredictions'
import { useInitializeMarket } from './useInitializeMarket'

interface CreatePredictionData {
  groupId: string
  title: string
  description: string
  imageUrl: string
  marketType: 'STANDARD' | 'NO_LOSS'
  endDate: string
  minStake: number
  maxStake: number
}

interface PredictionMarket {
  id: string
  groupId: string
  title: string
  description: string
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
  const { initializeMarket, isInitializing } = useInitializeMarket()

  const handleCreate = useCallback(async (
    data: CreatePredictionData
  ): Promise<PredictionMarket | null> => {
    setIsCreating(true)
    setCreateError(null)

    try {
      const createdMarket = await createPrediction(data)
      
      if (createdMarket) {
        const initializeResult = await initializeMarket(createdMarket.id)
        
        if (!initializeResult) {
          console.warn('Market created but initialization failed')
        }
      }
      
      return createdMarket
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create prediction'
      setCreateError(errorMessage)
      return null
    } finally {
      setIsCreating(false)
    }
  }, [createPrediction, initializeMarket])

  return {
    handleCreate,
    isCreating: isCreating || isInitializing,
    createError
  }
}