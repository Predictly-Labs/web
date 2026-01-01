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

interface GetMyGroupsResponse {
  success: boolean
  data: Group[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface GetMyGroupsParams {
  page?: number
  limit?: number
}

export const useGetMyGroups = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [pagination, setPagination] = useState<GetMyGroupsResponse['meta'] | null>(null)
  const { token } = useAuth()

  const getMyGroups = useCallback(async (params: GetMyGroupsParams = {}): Promise<Group[] | null> => {
    const { page = 1, limit = 20 } = params
    
    setIsLoading(true)
    setError(null)

    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/my-groups?${searchParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to get my groups: ${response.statusText}`)
      }

      const result: GetMyGroupsResponse = await response.json()
    
      
      setGroups(result.data)
      setPagination(result.meta)
      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get my groups'
      setError(errorMessage)
      setGroups([])
      setPagination(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token])

  return {
    getMyGroups,
    groups,
    pagination,
    isLoading,
    error
  }
}