import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

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

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export const usePredictions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  const getHeaders = useCallback(() => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return headers
  }, [token])

  const handleRequest = useCallback(async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        headers: getHeaders(),
        ...options
      })

      const result: ApiResponse<T> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Request failed')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [getHeaders])

  const getPredictions = useCallback(async (): Promise<PredictionMarket[]> => {
    return handleRequest<PredictionMarket[]>('/predictions')
  }, [handleRequest])

  const createPrediction = useCallback(async (
    data: CreatePredictionData
  ): Promise<PredictionMarket> => {
    return handleRequest<PredictionMarket>('/predictions', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }, [handleRequest])

  const getPredictionById = useCallback(async (
    id: string
  ): Promise<PredictionMarket> => {
    return handleRequest<PredictionMarket>(`/predictions/${id}`)
  }, [handleRequest])

  const getMyVotes = useCallback(async (): Promise<PredictionMarket[]> => {
    return handleRequest<PredictionMarket[]>('/predictions/my-votes')
  }, [handleRequest])

  return {
    isLoading,
    error,
    getPredictions,
    createPrediction,
    getPredictionById,
    getMyVotes
  }
}