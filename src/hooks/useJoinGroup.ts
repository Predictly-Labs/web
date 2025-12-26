'use client'

import { useState } from 'react'
import { useAuth } from './useAuth'

interface JoinGroupData {
  inviteCode: string
}

interface JoinGroupResponse {
  success: boolean
  message: string
  data: {
    id: string
    groupId: string
    userId: string
    role: string
    joinedAt: string
    group: {
      id: string
      name: string
      description: string
      iconUrl: string
      isPublic: boolean
      ownerId: string
      createdAt: string
      updatedAt: string
    }
  }
}

export const useJoinGroup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  const joinGroup = async (inviteCode: string): Promise<JoinGroupResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ inviteCode })
      })

      if (!response.ok) {
        throw new Error(`Failed to join group: ${response.statusText}`)
      }

      const result: JoinGroupResponse = await response.json()

      if (!result.success) {
        throw new Error(result.message)
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to join group'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    joinGroup,
    isLoading,
    error
  }
}