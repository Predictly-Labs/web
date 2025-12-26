'use client'

import { useState, useRef } from 'react'
import { X, Upload } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCreateGroups } from '@/hooks/useCreateGroups'
import { useAuth } from '@/hooks/useAuth'

interface CreateGroupFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const CreateGroupForm = ({ isOpen, onClose, onSuccess }: CreateGroupFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true
  })
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { createGroup, isLoading, error } = useCreateGroups()
  const { token, isAuthenticated, user } = useAuth()

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

    setIconFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    // Check authentication before attempting to create group
    if (!token || !isAuthenticated || !user) {
      alert('You need to login again to create a group. Please refresh the page and login.')
      return
    }

    const result = await createGroup(formData, iconFile || undefined)
    
    if (result) {
      onSuccess()
      handleReset()
    }
  }

  const handleReset = () => {
    setFormData({ name: '', description: '', isPublic: true })
    setIconFile(null)
    setPreviewUrl('')
    onClose()
  }

  if (!isOpen) return null

  // Show authentication warning if no token
  if (!token || !isAuthenticated || !user) {
    return (
      <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-white rounded-2xl max-w-md w-full p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to create a group. Please login first.</p>
            <button
              onClick={onClose}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0  bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl max-w-md w-full p-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900">Create New Group</h2>
          <button
            onClick={handleReset}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Icon
            </label>
            
            {previewUrl && (
              <div className="mb-3 flex justify-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src={previewUrl}
                    alt="Group icon preview"
                    fill
                    className="object-cover"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              {iconFile ? 'Change Icon' : 'Upload Icon'}
            </button>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Group Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter group name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your group"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Privacy
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  checked={formData.isPublic}
                  onChange={() => setFormData(prev => ({ ...prev, isPublic: true }))}
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">Public</div>
                  <div className="text-xs text-gray-500">Anyone can join this group</div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  checked={!formData.isPublic}
                  onChange={() => setFormData(prev => ({ ...prev, isPublic: false }))}
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">Private</div>
                  <div className="text-xs text-gray-500">Invite only group</div>
                </div>
              </label>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.name.trim()}
              className="flex-1 px-4 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}