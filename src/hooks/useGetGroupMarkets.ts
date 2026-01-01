'use client'

import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface Creator {
  id: string
  walletAddress: string
  displayName: string
  avatarUrl: string
}

interface GroupMarket {
  id: string
  onChainId: string | null
  groupId: string
  title: string
  description: string
  imageUrl: string | null
  marketType: string
  endDate: string
  minStake: number
  maxStake: number
  status: string
  outcome: string | null
  totalVolume: number
  yesPool: number
  noPool: number
  yesPercentage: number
  noPercentage: number
  participantCount: number
  resolvedById: string | null
  resolvedAt: string | null
  resolutionNote: string | null
  createdById: string
  createdAt: string
  updatedAt: string
  creator: Creator
}

interface GetGroupMarketsResponse {
  success: boolean
  data: GroupMarket[]
}

interface GetGroupMarketsParams {
  status?: string
  limit?: number
  offset?: number
}

export const useGetGroupMarkets = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [markets, setMarkets] = useState<GroupMarket[]>([])
  const { token } = useAuth()

  const getGroupMarkets = useCallback(async (
    groupId: string, 
    params: GetGroupMarketsParams = {}
  ): Promise<GroupMarket[] | null> => {
    const { status = 'ACTIVE', limit = 10, offset = 0 } = params
    
    setIsLoading(true)
    setError(null)

    try {
      const searchParams = new URLSearchParams({
        status,
        limit: limit.toString(),
        offset: offset.toString()
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}/markets?${searchParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to get group markets: ${response.statusText}`)
      }

      const result: GetGroupMarketsResponse = await response.json()
      
      setMarkets(result.data)
      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get group markets'
      setError(errorMessage)
      setMarkets([])
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token])

  return {
    getGroupMarkets,
    markets,
    isLoading,
    error
  }
}