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

export const useGetMyVotes = () => {
  const [myVotes, setMyVotes] = useState<PredictionMarket[]>([])
  const { getMyVotes, isLoading, error } = usePredictions()

  const fetchMyVotes = useCallback(async () => {
    try {
      const data = await getMyVotes()
      setMyVotes(data)
    } catch (err) {
      console.error('Failed to fetch my votes:', err)
    }
  }, [getMyVotes])

  const refetch = useCallback(() => {
    fetchMyVotes()
  }, [fetchMyVotes])

  useEffect(() => {
    fetchMyVotes()
  }, [fetchMyVotes])

  return {
    myVotes,
    isLoading,
    error,
    refetch
  }
}