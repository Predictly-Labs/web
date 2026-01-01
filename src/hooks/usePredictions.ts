import { useState, useCallback } from 'react'
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

type MarketType = 'STANDARD' | 'NO_LOSS'

interface CreatePredictionData {
  groupId: string
  title: string
  description: string
  imageUrl: string
  marketType: MarketType
  endDate: string
  minStake: number
  maxStake: number
}

interface PredictionsQueryParams {
  page?: number
  limit?: number
  groupId?: string
  status?: string
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

  const buildQueryString = useCallback((params: PredictionsQueryParams): string => {
    const searchParams = new URLSearchParams()
    
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())
    if (params.groupId) searchParams.append('groupId', params.groupId)
    if (params.status) searchParams.append('status', params.status)
    
    const queryString = searchParams.toString()
    return queryString ? `?${queryString}` : ''
  }, [])

  const getPredictions = useCallback(async (params: PredictionsQueryParams = {}): Promise<PredictionMarket[]> => {
    const queryString = buildQueryString(params)
    return handleRequest<PredictionMarket[]>(`/predictions${queryString}`)
  }, [handleRequest, buildQueryString])

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

  const getMyVotes = useCallback(async (page: number = 1, limit: number = 20): Promise<PredictionMarket[]> => {
    return handleRequest<PredictionMarket[]>(`/predictions/my-votes?page=${page}&limit=${limit}`)
  }, [handleRequest])

  const getMyCreatedPredictions = useCallback(async (): Promise<PredictionMarket[]> => {
    return handleRequest<PredictionMarket[]>('/predictions')
  }, [handleRequest])

  return {
    isLoading,
    error,
    getPredictions,
    createPrediction,
    getPredictionById,
    getMyVotes,
    getMyCreatedPredictions
  }
}