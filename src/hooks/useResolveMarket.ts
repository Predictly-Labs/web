import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface ResolveMarketData {
  outcome: 'YES' | 'NO'
  resolutionNote: string
}

interface ResolveResponse {
  id: string
  predictionId: string
  outcome: 'YES' | 'NO'
  resolutionNote: string
  resolvedBy: string
  resolvedAt: string
}

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export const useResolveMarket = () => {
  const [isResolving, setIsResolving] = useState(false)
  const [resolveError, setResolveError] = useState<string | null>(null)
  const { token } = useAuth()

  const resolveMarket = useCallback(async (
    predictionId: string,
    resolveData: ResolveMarketData
  ): Promise<ResolveResponse | null> => {
    if (!token) {
      setResolveError('Authentication required')
      return null
    }

    setIsResolving(true)
    setResolveError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predictions/${predictionId}/resolve`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(resolveData)
        }
      )

      const result: ApiResponse<ResolveResponse> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to resolve market')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resolve market'
      setResolveError(errorMessage)
      return null
    } finally {
      setIsResolving(false)
    }
  }, [token])

  return {
    resolveMarket,
    isResolving,
    resolveError
  }
}