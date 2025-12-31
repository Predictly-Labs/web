import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface UserStatsData {
  totalPredictions: number
  correctPredictions: number
  accuracy: number
  totalEarnings: number
  currentStreak: number
}

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export const useGetUserStats = () => {
  const [userStats, setUserStats] = useState<UserStatsData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  const fetchUserStats = useCallback(async (userId: string): Promise<UserStatsData | null> => {
    if (!token) {
      setError('Authentication required')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/stats`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const result: ApiResponse<UserStatsData> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to fetch user statistics')
      }

      setUserStats(result.data)
      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user statistics'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token])

  const clearUserStats = useCallback(() => {
    setUserStats(null)
    setError(null)
  }, [])

  return {
    userStats,
    fetchUserStats,
    clearUserStats,
    isLoading,
    error
  }
}