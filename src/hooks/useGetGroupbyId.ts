'use client'

import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface Group {
  id: string
  name: string
  description: string
  iconUrl: string
  isPublic: boolean
  ownerId: string
  inviteCode: string
  createdAt: string
  updatedAt: string
  members: Array<{
    id: string
    userId: string
    role: string
    joinedAt: string
    user: {
      id: string
      displayName: string
      avatarUrl: string
    }
  }>
  predictions: Array<{
    id: string
    title: string
    description: string
    endDate: string
    status: string
    createdBy: string
  }>
}

interface GetGroupResponse {
  success: boolean
  message: string
  data: Group
}

export const useGetGroup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [group, setGroup] = useState<Group | null>(null)
  const { token } = useAuth()

  const getGroup = useCallback(async (groupId: string): Promise<Group | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to get group: ${response.statusText}`)
      }

      const result: GetGroupResponse = await response.json()

      if (!result.success) {
        throw new Error(result.message)
      }

      setGroup(result.data)
      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get group'
      setError(errorMessage)
      setGroup(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token])

  return {
    getGroup,
    group,
    isLoading,
    error
  }
}