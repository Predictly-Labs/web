import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface UpdateUserProfileData {
  displayName: string
  avatarUrl: string
}

interface UpdateUserProfileResponse {
  success: boolean
  data: {
    id: string
    displayName: string
    avatarUrl: string
    walletAddress: string
  }
}

export const useUpdateUserProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  const updateUserProfile = useCallback(async (profileData: UpdateUserProfileData) => {
    if (!token) {
      setError('No authentication token')
      return null
    }

    if (!profileData.displayName.trim()) {
      setError('Display name is required')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName: profileData.displayName,
          avatarUrl: profileData.avatarUrl
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: UpdateUserProfileResponse = await response.json()

      if (!result.success) {
        throw new Error('Failed to update user profile')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user profile'
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
    updateUserProfile,
    isLoading,
    error,
    clearError
  }
}