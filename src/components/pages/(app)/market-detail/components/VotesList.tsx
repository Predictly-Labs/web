import { motion } from 'framer-motion'
import Image from 'next/image'

interface VotesListProps {
  votes: Array<{
    id: string
    prediction: 'YES' | 'NO'
    amount: number
    createdAt: string
    user: {
      id: string
      displayName: string
      avatarUrl: string
    }
  }>
  groupName?: string
}

export const VotesList = ({ votes, groupName }: VotesListProps) => {
  if (!votes || votes.length === 0) return null

  return (
    <motion.div 
      className="mt-8 pt-6 border-t border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Votes</h3>
        {groupName && (
          <span className="text-sm text-gray-500">from {groupName}</span>
        )}
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {votes.map((vote, index) => (
          <motion.div
            key={vote.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={vote.user.avatarUrl}
                  alt={vote.user.displayName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {vote.user.displayName}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(vote.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Image
                  src="/assets/logo/logo-coin/move-logo.jpeg"
                  alt="Move Token"
                  width={12}
                  height={12}
                  className="rounded-full"
                />
                {vote.amount}
              </div>
              <div 
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  vote.prediction === 'YES' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {vote.prediction}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}