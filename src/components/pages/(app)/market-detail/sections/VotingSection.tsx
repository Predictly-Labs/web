import { useState } from 'react'
import Image from 'next/image'

interface VotingSectionProps {
  prediction: any
  user: any
  onPlaceVote: (selectedVote: 'YES' | 'NO', amount: string) => void
  onOpenResolveModal: () => void
  isVoting: boolean
  voteError?: string | null
}

export const VotingSection = ({ 
  prediction, 
  user, 
  onPlaceVote, 
  onOpenResolveModal, 
  isVoting, 
  voteError 
}: VotingSectionProps) => {
  const [voteAmount, setVoteAmount] = useState<string>('')
  const [selectedVote, setSelectedVote] = useState<'YES' | 'NO' | null>(null)

  const handlePlaceVote = () => {
    if (selectedVote && voteAmount) {
      onPlaceVote(selectedVote, voteAmount)
      setVoteAmount('')
      setSelectedVote(null)
    }
  }

  if (prediction.status?.toLowerCase() !== 'active' || !user) {
    return null
  }

  return (
    <div className="border-t border-gray-50 pt-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-light text-gray-900 mb-2">Make Your Prediction</h3>
          <p className="text-gray-500 text-sm">Choose your stance and stake amount</p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setSelectedVote('YES')}
            className={`px-8 py-4 rounded-2xl transition-all cursor-pointer text-lg font-medium min-w-[120px] ${
              selectedVote === 'YES'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            YES
          </button>
          
          <button
            onClick={() => setSelectedVote('NO')}
            className={`px-8 py-4 rounded-2xl transition-all cursor-pointer text-lg font-medium min-w-[120px] ${
              selectedVote === 'NO'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            NO
          </button>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <label htmlFor="voteAmount" className="text-gray-600 text-sm font-medium">
              Amount
            </label>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Image
                src="/assets/logo/logo-coin/move-logo.jpeg"
                alt="Move Token"
                width={14}
                height={14}
                className="rounded-full"
              />
              <span>MOVE</span>
            </div>
          </div>
          <input
            type="number"
            id="voteAmount"
            value={voteAmount}
            onChange={(e) => setVoteAmount(e.target.value)}
            step="0.001"
            min={prediction.minStake}
            max={prediction.maxStake}
            placeholder={`${prediction.minStake} - ${prediction.maxStake}`}
            className="w-full px-4 py-4 text-center border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-lg font-light"
          />
        </div>

        <div className="text-center space-y-4 space-x-4">
          <button
            onClick={handlePlaceVote}
            disabled={isVoting || !selectedVote || !voteAmount}
            className={`px-12 py-4 rounded-2xl font-medium transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 text-lg ${
              selectedVote === 'YES'
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                : selectedVote === 'NO'
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {isVoting ? 'Placing...' : selectedVote ? `Predict ${selectedVote}` : 'Select Prediction'}
          </button>

          {prediction?.status?.toLowerCase() === 'active' && (
            <button
              onClick={onOpenResolveModal}
              className="px-12 py-4 bg-black text-white rounded-2xl font-medium transition-all hover:bg-gray-800 cursor-pointer text-lg shadow-lg hover:shadow-xl"
            >
              Resolve Market
            </button>
          )}
          
          {voteError && (
            <div className="text-red-500 text-sm mt-4">
              {voteError}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}