'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Upload, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCreatePrediction } from '@/hooks/useCreatePrediction'
import { useGetGroups } from '@/hooks/useGetGroups'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

interface CreatePredictionFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface PredictionFormData {
  groupId: string
  title: string
  description: string
  imageUrl: string
  marketType: string
  endDate: string
  minStake: number | string
  maxStake: number | string
}

export const CreatePredictionForm = ({ isOpen, onClose, onSuccess }: CreatePredictionFormProps) => {
  const [formData, setFormData] = useState<PredictionFormData>({
    groupId: '',
    title: '',
    description: '',
    imageUrl: '',
    marketType: 'STANDARD',
    endDate: '',
    minStake: '',
    maxStake: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { handleCreate, isCreating, createError } = useCreatePrediction()
  const { getGroups, groups, isLoading: groupsLoading, error: groupsError } = useGetGroups()
  const { token, isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (isOpen && token) {
      getGroups({ limit: 50 })
    }
  }, [isOpen, token, getGroups])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
      setFormData(prev => ({ ...prev, imageUrl: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.groupId || !formData.title.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!token || !isAuthenticated || !user) {
      toast.error('You need to login to create a prediction market')
      return
    }

    const endDateTime = new Date(formData.endDate).toISOString()

    const result = await handleCreate({
      ...formData,
      endDate: endDateTime,
      title: formData.title.trim(),
      description: formData.description.trim(),
      minStake: typeof formData.minStake === 'string' ? parseFloat(formData.minStake) || 0 : formData.minStake,
      maxStake: typeof formData.maxStake === 'string' ? parseFloat(formData.maxStake) || 1000 : formData.maxStake
    })

    if (result) {
      toast.success('Prediction market created successfully!', {
        description: `"${formData.title}" is now live for predictions.`,
        duration: 4000,
      })
      onSuccess()
      handleReset()
    }
  }

  const handleReset = () => {
    setFormData({
      groupId: '',
      title: '',
      description: '',
      imageUrl: '',
      marketType: 'STANDARD',
      endDate: '',
      minStake: '',
      maxStake: ''
    })
    setImageFile(null)
    setPreviewUrl('')
    setIsGroupDropdownOpen(false)
    onClose()
  }

  const selectedGroup = groups.find(group => group.id === formData.groupId)

  if (!isOpen) return null

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
            <p className="text-gray-600 mb-6">You need to be logged in to create a prediction market.</p>
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
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900">Create Prediction Market</h2>
            <button
              onClick={handleReset}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Group *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                  disabled={groupsLoading}
                >
                  {selectedGroup ? (
                    <div className="flex items-center gap-3">
                      {selectedGroup.iconUrl && (
                        <Image
                          src={selectedGroup.iconUrl}
                          alt={selectedGroup.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-gray-900">{selectedGroup.name}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">
                      {groupsLoading ? 'Loading groups...' : 'Select a group'}
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {isGroupDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-40 overflow-y-auto">
                    {groups.length > 0 ? (
                      groups.map((group) => (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, groupId: group.id }))
                            setIsGroupDropdownOpen(false)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors cursor-pointer"
                        >
                          {group.iconUrl && (
                            <Image
                              src={group.iconUrl}
                              alt={group.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <div className="text-gray-900">{group.name}</div>
                            <div className="text-xs text-gray-500">{group.stats.memberCount} members</div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">No groups available</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Market Image
              </label>
              
              {previewUrl && (
                <div className="mb-3 flex justify-center">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200">
                    <Image
                      src={previewUrl}
                      alt="Market image preview"
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
                {imageFile ? 'Change Image' : 'Upload Image'}
              </button>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Market Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Will BTC reach $100k by end of 2024?"
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
                placeholder="Describe the prediction market details..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="minStake" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <span>Min Stake</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Image
                        src="/assets/logo/logo-coin/move-logo.jpeg"
                        alt="Move Token"
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                      <span>MOVE</span>
                    </div>
                  </div>
                </label>
                <input
                  type="number"
                  id="minStake"
                  value={formData.minStake}
                  onChange={(e) => setFormData(prev => ({ ...prev, minStake: e.target.value }))}
                  step="0.001"
                  min="0"
                  placeholder="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm"
                />
              </div>

              <div>
                <label htmlFor="maxStake" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <span>Max Stake</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Image
                        src="/assets/logo/logo-coin/move-logo.jpeg"
                        alt="Move Token"
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                      <span>MOVE</span>
                    </div>
                  </div>
                </label>
                <input
                  type="number"
                  id="maxStake"
                  value={formData.maxStake}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxStake: e.target.value }))}
                  step="0.001"
                  min="0"
                  placeholder="1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm"
                />
              </div>
            </div>

            {(createError || groupsError) && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm">{createError || groupsError}</p>
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
                disabled={isCreating || !formData.groupId || !formData.title.trim() || !formData.endDate}
                className="flex-1 px-4 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isCreating ? 'Creating...' : 'Create Market'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}