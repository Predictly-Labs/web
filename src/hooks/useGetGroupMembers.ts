import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface GroupMember {
  id: string
  userId: string
  groupId: string
  role: string
  joinedAt: string
  user: {
    id: string
    displayName: string
    avatarUrl: string
    walletAddress: string
  }
}

interface GetGroupMembersResponse {
  success: boolean
  data: GroupMember[]
}

export const useGetGroupMembers = () => {
  const [members, setMembers] = useState<GroupMember[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  const getGroupMembers = useCallback(async (groupId: string): Promise<GroupMember[] | null> => {
    if (!token) {
      setError('No authentication token')
      return null
    }

    if (!groupId) {
      setError('Group ID is required')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}/members`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: GetGroupMembersResponse = await response.json()

      if (!result.success) {
        throw new Error('Failed to fetch group members')
      }

      setMembers(result.data)
      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch group members'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const clearMembers = useCallback(() => {
    setMembers([])
  }, [])

  return {
    members,
    getGroupMembers,
    isLoading,
    error,
    clearError,
    clearMembers
  }
}