'use client'

import { useState } from 'react'
import { useAuth } from './useAuth'
import { useUploadImagesToPinata } from './useUploadImagesToPinata'

interface GroupData {
  name: string
  description: string
  iconUrl: string
  isPublic: boolean
}

interface CreateGroupResponse {
  success: boolean
  message: string
  data: {
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

export const useCreateGroups = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token, user, isAuthenticated } = useAuth()
  const { uploadImages, isUploading } = useUploadImagesToPinata()

  const createGroup = async (data: Omit<GroupData, 'iconUrl'>, iconFile?: File): Promise<CreateGroupResponse | null> => {

    
    if (!token || !isAuthenticated) {
      const errorMsg = 'Authentication required. Please login again.'
      console.error('useCreateGroups - Authentication check failed:', { token: !!token, isAuthenticated })
      setError(errorMsg)
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      let iconUrl = ''

      if (iconFile) {
        const uploadResults = await uploadImages([iconFile])
        if (uploadResults[0]?.success && uploadResults[0]?.url) {
          iconUrl = uploadResults[0].url
        } else {
          throw new Error('Icon upload failed')
        }
      }

      const groupData: GroupData = {
        ...data,
        iconUrl
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(groupData)
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid or expired token. Please login again.')
        }
        const errorText = await response.text()
        throw new Error(`Failed to create group: ${response.statusText}${errorText ? ` - ${errorText}` : ''}`)
      }

      const result: CreateGroupResponse = await response.json()

      if (!result.success) {
        throw new Error(result.message)
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create group'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createGroup,
    isLoading: isLoading || isUploading,
    error
  }
}