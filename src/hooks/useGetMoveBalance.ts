import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface MoveBalanceData {
  userId: string
  address: string
  balance: number
  unit: string
}

interface MoveBalanceResponse {
  success: boolean
  data: MoveBalanceData
}

export const useGetMoveBalance = () => {
  const [balance, setBalance] = useState<MoveBalanceData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  const getMoveBalance = useCallback(async (): Promise<MoveBalanceData | null> => {
    if (!token) {
      setError('No authentication token')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallet/balance/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: MoveBalanceResponse = await response.json()

      if (!result.success) {
        throw new Error('Failed to fetch MOVE token balance')
      }

      setBalance(result.data)
      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch MOVE token balance'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const clearBalance = useCallback(() => {
    setBalance(null)
  }, [])

  return {
    balance,
    getMoveBalance,
    isLoading,
    error,
    clearError,
    clearBalance
  }
}