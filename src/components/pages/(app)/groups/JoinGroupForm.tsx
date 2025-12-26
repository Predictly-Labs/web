'use client'

import { useState } from 'react'
import { X, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useJoinGroup } from '@/hooks/useJoinGroup'
import { useAuth } from '@/hooks/useAuth'

interface JoinGroupFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const JoinGroupForm = ({ isOpen, onClose, onSuccess }: JoinGroupFormProps) => {
  const [inviteCode, setInviteCode] = useState('')
  const { joinGroup, isLoading, error } = useJoinGroup()
  const { token, isAuthenticated, user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteCode.trim()) return

    // Check authentication before attempting to join group
    if (!token || !isAuthenticated || !user) {
      alert('You need to login again to join a group. Please refresh the page and login.')
      return
    }

    const result = await joinGroup(inviteCode.trim())
    
    if (result) {
      onSuccess()
      handleReset()
    }
  }

  const handleReset = () => {
    setInviteCode('')
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
            <p className="text-gray-600 mb-6">You need to be logged in to join a group. Please login first.</p>
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
        className="bg-white rounded-2xl max-w-md w-full p-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900">Join Group</h2>
          <button
            onClick={handleReset}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-2">
              Invite Code *
            </label>
            <input
              type="text"
              id="inviteCode"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Enter group invite code"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the invite code shared by the group owner
            </p>
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
              disabled={isLoading || !inviteCode.trim()}
              className="flex-1 px-4 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Joining...' : 'Join Group'}
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">How to get invite codes</span>
          </div>
          <p className="text-xs text-blue-700">
            Ask group members or owners to share their invite code with you. Only private groups require invite codes.
          </p>
        </div>
      </motion.div>
    </div>
  )
}