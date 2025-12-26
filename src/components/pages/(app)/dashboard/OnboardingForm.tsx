'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import { useUploadImagesToPinata } from '@/hooks/useUploadImagesToPinata'

interface OnboardingFormProps {
  walletAddress: string
  onSubmit: (data: { privyId: string; displayName: string; avatarUrl: string }) => void
  onDisconnect: () => void
  isLoading: boolean
  error: string | null
}

export const OnboardingForm = ({ walletAddress, onSubmit, onDisconnect, isLoading, error }: OnboardingFormProps) => {
  const [privyId, setPrivyId] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { uploadImages, isUploading } = useUploadImagesToPinata()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!privyId.trim() || !displayName.trim()) return
    
    let finalAvatarUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${walletAddress}`

    if (selectedFile) {
      try {
        const uploadResults = await uploadImages([selectedFile])
        if (uploadResults[0]?.success && uploadResults[0]?.url) {
          finalAvatarUrl = uploadResults[0].url
        } else {
          throw new Error('Avatar upload failed')
        }
      } catch (uploadError) {
        console.error('Avatar upload failed:', uploadError)
        return
      }
    }
    
    onSubmit({
      privyId: privyId.trim(),
      displayName: displayName.trim(),
      avatarUrl: finalAvatarUrl
    })
  }

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-4">
          <div className="relative mb-6">
            <div 
              className="relative overflow-hidden rounded-2xl"
              style={{
                backgroundImage: "url('/assets/main/background/bg-main.png')",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-4 p-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-medium text-pink-900">Login to Dashboard</h1>
                    <Image
                      src="/assets/main/icon/dashboard-icon.png"
                      alt="Dashboard Icon"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">Enter your display name to continue</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div 
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 max-w-sm w-full mx-4"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.div 
                className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Image
                  src="/assets/logo/logo.png"
                  alt="Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </motion.div>
              
              <button
                onClick={onDisconnect}
                disabled={isLoading}
                className="w-8 h-8 text-gray-300 hover:text-gray-500 transition-colors disabled:opacity-50 flex items-center justify-center rounded-full hover:bg-gray-50 cursor-pointer"
                title="Disconnect"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-6">
              <motion.h2 
                className="text-lg font-medium text-gray-900 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Login with Wallet
              </motion.h2>
              <motion.p 
                className="text-gray-400 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </motion.p>
            </div>

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <input
                  type="text"
                  value={privyId}
                  onChange={(e) => setPrivyId(e.target.value)}
                  placeholder="privyId (e.g., did:privy:test123)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm placeholder-gray-400"
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Display Name (e.g., Bang Isal)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm placeholder-gray-400"
                  maxLength={50}
                  required
                />
              </div>

              <div className="space-y-3">
                {previewUrl && (
                  <div className="flex justify-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        src={previewUrl}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {isUploading ? 'Uploading...' : selectedFile ? 'Change Avatar' : 'Upload Avatar (optional)'}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || isUploading || !privyId.trim() || !displayName.trim()}
                className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
              >
                {isUploading ? 'Uploading Avatar...' : isLoading ? 'Logging in...' : 'Login'}
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}