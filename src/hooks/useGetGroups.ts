'use client'

import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface Group {
  id: string
  name: string
  description: string
  iconUrl: string
  isPublic: boolean
  createdAt: string
  stats: {
    memberCount: number
    activeMarkets: number
    totalVolume: number
  }
}

interface GetGroupsResponse {
  success: boolean
  data: Group[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface GetGroupsParams {
  page?: number
  limit?: number
}

export const useGetGroups = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [pagination, setPagination] = useState<GetGroupsResponse['meta'] | null>(null)
  const { token } = useAuth()

  const getGroups = useCallback(async (params: GetGroupsParams = {}): Promise<Group[] | null> => {
    const { page = 1, limit = 10 } = params
    
    setIsLoading(true)
    setError(null)

    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups?${searchParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to get groups: ${response.statusText}`)
      }

      const result: GetGroupsResponse = await response.json()
      
      setGroups(result.data)
      setPagination(result.meta)
      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get groups'
      setError(errorMessage)
      setGroups([])
      setPagination(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token])

  return {
    getGroups,
    groups,
    pagination,
    isLoading,
    error
  }
}