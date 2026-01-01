'use client'

import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface InitializeMarketResponse {
  success: boolean
  data: {
    marketId: string
    onChainId: string
    transactionHash: string
    status: string
  }
  message?: string
}

export const useInitializeMarket = () => {
  const [isInitializing, setIsInitializing] = useState(false)
  const [initializeError, setInitializeError] = useState<string | null>(null)
  const { token } = useAuth()

  const initializeMarket = useCallback(async (marketId: string): Promise<InitializeMarketResponse['data'] | null> => {
    if (!marketId) {
      setInitializeError('Market ID is required')
      return null
    }

    setIsInitializing(true)
    setInitializeError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/markets/${marketId}/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to initialize market: ${response.statusText}`)
      }

      const result: InitializeMarketResponse = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to initialize market')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize market'
      setInitializeError(errorMessage)
      return null
    } finally {
      setIsInitializing(false)
    }
  }, [token])

  return {
    initializeMarket,
    isInitializing,
    initializeError
  }
}