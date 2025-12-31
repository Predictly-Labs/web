import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface PlaceVoteData {
  prediction: 'YES' | 'NO'
  amount: number
}

interface VoteResponse {
  id: string
  predictionId: string
  userId: string
  prediction: 'YES' | 'NO'
  amount: number
  createdAt: string
}

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export const usePlaceVote = () => {
  const [isVoting, setIsVoting] = useState(false)
  const [voteError, setVoteError] = useState<string | null>(null)
  const { token } = useAuth()

  const placeVote = useCallback(async (
    predictionId: string,
    voteData: PlaceVoteData
  ): Promise<VoteResponse | null> => {
    if (!token) {
      setVoteError('Authentication required')
      return null
    }

    setIsVoting(true)
    setVoteError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predictions/${predictionId}/vote`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(voteData)
        }
      )

      const result: ApiResponse<VoteResponse> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to place vote')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to place vote'
      setVoteError(errorMessage)
      return null
    } finally {
      setIsVoting(false)
    }
  }, [token])

  return {
    placeVote,
    isVoting,
    voteError
  }
}