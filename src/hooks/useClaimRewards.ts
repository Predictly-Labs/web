import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface ClaimResponse {
  id: string
  predictionId: string
  userId: string
  amount: number
  claimedAt: string
  transactionHash?: string
}

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export const useClaimRewards = () => {
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimError, setClaimError] = useState<string | null>(null)
  const { token } = useAuth()

  const claimRewards = useCallback(async (
    predictionId: string
  ): Promise<ClaimResponse | null> => {
    if (!token) {
      setClaimError('Authentication required')
      return null
    }

    setIsClaiming(true)
    setClaimError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predictions/${predictionId}/claim`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )

      const result: ApiResponse<ClaimResponse> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to claim rewards')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to claim rewards'
      setClaimError(errorMessage)
      return null
    } finally {
      setIsClaiming(false)
    }
  }, [token])

  return {
    claimRewards,
    isClaiming,
    claimError
  }
}