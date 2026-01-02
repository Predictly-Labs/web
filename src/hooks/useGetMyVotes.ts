import { useState, useCallback } from 'react'
import { usePredictions } from './usePredictions'

interface MyVote {
  id: string
  onChainTxHash?: string | null
  marketId: string
  userId: string
  prediction: 'YES' | 'NO'
  amount: number
  hasClaimedReward: boolean
  rewardAmount?: number | null
  createdAt: string
  market: {
    id: string
    groupId: string
    title: string
    description: string
    imageUrl: string
    marketType: string
    endDate: string
    status: string
    totalVolume: number
    yesPercentage: number
    noPercentage: number
    group?: {
      id: string
      name: string
    }
  }
}

interface UseGetMyVotesParams {
  page?: number
  limit?: number
}

export const useGetMyVotes = () => {
  const [myVotes, setMyVotes] = useState<MyVote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { getMyVotes } = usePredictions()

  const fetchMyVotes = useCallback(async (params: UseGetMyVotesParams = {}) => {
    const { page = 1, limit = 20 } = params
    setIsLoading(true)
    setError(null)
    
    try {
      const data = await getMyVotes(page, limit)
      setMyVotes(data as unknown as MyVote[])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch my votes'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [getMyVotes])

  const refetch = useCallback((params: UseGetMyVotesParams = {}) => {
    fetchMyVotes(params)
  }, [fetchMyVotes])

  return {
    myVotes,
    isLoading,
    error,
    fetchMyVotes,
    refetch
  }
}