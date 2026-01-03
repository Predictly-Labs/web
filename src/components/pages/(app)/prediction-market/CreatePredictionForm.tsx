'use client'

import { useRef, useEffect } from 'react'
import { X, Upload, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCreatePrediction } from '@/hooks/useCreatePrediction'
import { useGetGroups } from '@/hooks/useGetGroups'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { MarketTypeSelection } from './MarketTypeSelection'
import {
  useCreateForm,
  useGroups,
  usePredictionMarketActions
} from '@/hooks/usePredictionMarketState'

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
  marketType: 'STANDARD' | 'NO_LOSS'
  endDate: string
  minStake: number | string
  maxStake: number | string
}

export const CreatePredictionForm = ({ isOpen, onClose, onSuccess }: CreatePredictionFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { handleCreate, isCreating, createError } = useCreatePrediction()
  const { getGroups, groups: apiGroups, isLoading: groupsLoading, error: groupsError } = useGetGroups()
  const { token, isAuthenticated, user } = useAuth()
  
  const {
    createFormData: formData,
    imageFile,
    previewUrl,
    isGroupDropdownOpen,
    selectedGroup
  } = useCreateForm()
  
  const { groups } = useGroups()
  
  const {
    updateFormField,
    updateImageFile,
    updatePreviewUrl,
    setGroupDropdownOpen,
    updateGroups,
    updateGroupsLoading,
    updateGroupsError
  } = usePredictionMarketActions()

  useEffect(() => {
    if (isOpen && token) {
      updateGroupsLoading(true);
      getGroups({ limit: 50 })
        .then(() => {
          updateGroups(apiGroups);
          updateGroupsLoading(false);
        })
        .catch((err) => {
          updateGroupsError(err.message);
          updateGroupsLoading(false);
        });
    }
  }, [isOpen, token, getGroups, updateGroups, updateGroupsLoading, updateGroupsError]);

  useEffect(() => {
    updateGroups(apiGroups);
  }, [apiGroups, updateGroups]);

  useEffect(() => {
    updateGroupsLoading(groupsLoading);
  }, [groupsLoading, updateGroupsLoading]);

  useEffect(() => {
    updateGroupsError(groupsError);
  }, [groupsError, updateGroupsError]);

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

    updateImageFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      updatePreviewUrl(reader.result as string)
      updateFormField({ imageUrl: reader.result as string })
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
    onClose()
  }

  if (!isOpen) return null

  if (!token || !isAuthenticated || !user) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-white rounded-xl max-w-sm w-full p-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Authentication Required</h2>
            <p className="text-gray-600 mb-4 text-sm">Please log in to create a prediction market</p>
            <button
              onClick={onClose}
              className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer text-sm"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3">
      <motion.div
        className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Create Market</h2>
            <button
              onClick={handleReset}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Group *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setGroupDropdownOpen(!isGroupDropdownOpen)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-sm"
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
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto">
                    {groups.length > 0 ? (
                      groups.map((group) => (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => {
                            updateFormField({ groupId: group.id })
                            setGroupDropdownOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer text-sm"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Market Image
              </label>
              
              {previewUrl && (
                <div className="mb-2 flex justify-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                {imageFile ? 'Change Image' : 'Upload Image'}
              </button>
            </div>

            <MarketTypeSelection 
              selectedType={formData.marketType}
              onTypeChange={(type) => updateFormField({ marketType: type })}
            />

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Market Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => updateFormField({ title: e.target.value })}
                placeholder="Will BTC reach $100k by end of 2024?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormField({ description: e.target.value })}
                placeholder="Describe the prediction market details..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm resize-none"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date *
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  value={formData.endDate}
                  onChange={(e) => updateFormField({ endDate: e.target.value })}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="minStake" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Stake
                  </label>
                  <input
                    type="number"
                    id="minStake"
                    value={formData.minStake}
                    onChange={(e) => updateFormField({ minStake: e.target.value })}
                    step="0.001"
                    min="0"
                    placeholder="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="maxStake" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Stake
                  </label>
                  <input
                    type="number"
                    id="maxStake"
                    value={formData.maxStake}
                    onChange={(e) => updateFormField({ maxStake: e.target.value })}
                    step="0.001"
                    min="0"
                    placeholder="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm"
                  />
                </div>
              </div>
            </div>

            {(createError || groupsError) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                <p className="text-red-600 text-sm">{createError || groupsError}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || !formData.groupId || !formData.title.trim() || !formData.endDate}
                className="flex-1 px-3 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
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