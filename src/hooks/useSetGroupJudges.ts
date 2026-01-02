import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface Judge {
  id: string
  role: string
  user: {
    id: string
    displayName: string
  }
}

interface SetJudgesRequest {
  userIds: string[]
}

interface SetJudgesResponse {
  success: boolean
  data: {
    successful: Judge[]
    failed: any[]
    summary: {
      total: number
      succeeded: number
      failed: number
    }
  }
}

export const useSetGroupJudges = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  const setGroupJudges = useCallback(async (
    groupId: string, 
    userIds: string[]
  ): Promise<SetJudgesResponse | null> => {
    if (!token) {
      setError('No authentication token')
      return null
    }

    if (!groupId || userIds.length === 0) {
      setError('Group ID and user IDs are required')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const requestBody: SetJudgesRequest = { userIds }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}/judges/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: SetJudgesResponse = await response.json()

      if (!result.success) {
        throw new Error('Failed to set group judges')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set group judges'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    setGroupJudges,
    isLoading,
    error,
    clearError
  }
}