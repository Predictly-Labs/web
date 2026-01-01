import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface GroupStats {
  groupId: string
  groupName: string
  votes: number
  earnings: number
}

interface MyVotesStats {
  totalVotes: number
  totalInvested: number
  totalEarnings: number
  roi: number
  winRate: number
  activeVotes: number
  resolvedVotes: number
  wonVotes: number
  lostVotes: number
  averageStake: number
  byGroup: GroupStats[]
}

interface MyVotesStatsResponse {
  success: boolean
  data: MyVotesStats
}

export const useGetMyVotesStats = () => {
  const [stats, setStats] = useState<MyVotesStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  const fetchMyVotesStats = useCallback(async (): Promise<MyVotesStats | null> => {
    if (!token) {
      setError('No authentication token')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictions/my-votes/stats`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: MyVotesStatsResponse = await response.json()

      if (!result.success) {
        throw new Error('Failed to fetch my votes stats')
      }

      setStats(result.data)
      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch my votes stats'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token])

  const clearStats = useCallback(() => {
    setStats(null)
    setError(null)
  }, [])

  return {
    stats,
    isLoading,
    error,
    fetchMyVotesStats,
    clearStats
  }
}