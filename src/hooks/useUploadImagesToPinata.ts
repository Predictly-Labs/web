'use client'

import { useState } from 'react'

interface UploadResponse {
  success: boolean
  url?: string
  error?: string
}

export const useUploadImagesToPinata = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadImages = async (files: File[]): Promise<UploadResponse[]> => {
    if (!files.length) return []

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('file', file)
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.message || 'Upload failed')
      }

      return files.map(() => ({
        success: true,
        url: result.data.gatewayUrl      }))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  return {
    uploadImages,
    isUploading,
    error,
  }
}