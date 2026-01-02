'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetPredictionById } from '@/hooks/useGetPredictionById'
import { usePlaceVote } from '@/hooks/usePlaceVote'
import { useResolveMarket } from '@/hooks/useResolveMarket'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import Sidebar from '@/components/ui/Sidebar'
import { MarketDetailHeader } from './sections/MarketDetailHeader'
import { MarketDetailStats } from './sections/MarketDetailStats'
import { VotingSection } from './sections/VotingSection'
import { ResolveModal } from './sections/ResolveModal'
import { LoadingState } from './sections/LoadingState'
import { ErrorState } from './sections/ErrorState'

interface MarketDetailProps {
  marketId: string
}

export const MarketDetail = ({ marketId }: MarketDetailProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const { prediction, fetchPredictionById, isLoading, error } = useGetPredictionById()
  const { placeVote, isVoting, voteError } = usePlaceVote()
  const { resolveMarket, isResolving, resolveError } = useResolveMarket()
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false)
  const [resolveForm, setResolveForm] = useState({
    outcome: 'YES' as 'YES' | 'NO',
    resolutionNote: ''
  })

  useEffect(() => {
    if (marketId) {
      fetchPredictionById(marketId)
    }
  }, [marketId, fetchPredictionById])

  const handleBack = () => {
    router.push('/app/create-market')
  }

  const handlePlaceVote = async (selectedVote: 'YES' | 'NO', voteAmount: string) => {
    if (!prediction) {
      toast.error('Market data not available')
      return
    }

    const amount = parseFloat(voteAmount)
    if (amount < prediction.minStake || amount > prediction.maxStake) {
      toast.error(`Amount must be between ${prediction.minStake} and ${prediction.maxStake} MOVE`)
      return
    }

    const result = await placeVote(prediction.id, { prediction: selectedVote, amount })
    if (result) {
      toast.success(`Successfully placed ${selectedVote} vote for ${amount} MOVE`)
      fetchPredictionById(marketId)
    }
  }

  const handleResolveMarket = async () => {
    if (!prediction || !resolveForm.resolutionNote.trim()) {
      toast.error('Please provide a resolution note')
      return
    }

    const result = await resolveMarket(prediction.id, {
      outcome: resolveForm.outcome,
      resolutionNote: resolveForm.resolutionNote
    })

    if (result) {
      toast.success(`Market resolved as ${resolveForm.outcome}`)
      setIsResolveModalOpen(false)
      setResolveForm({ outcome: 'YES', resolutionNote: '' })
      fetchPredictionById(marketId)
    } else if (resolveError) {
      toast.error(resolveError)
    }
  }

  const handleCloseResolveModal = () => {
    setIsResolveModalOpen(false)
    setResolveForm({ outcome: 'YES', resolutionNote: '' })
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (error || !prediction) {
    return <ErrorState onBack={handleBack} />
  }

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />

      <div className="max-w-7xl mx-auto relative z-10">
        <MarketDetailHeader prediction={prediction} onBack={handleBack} />

        <div
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-4 border-white"
          style={{
            backgroundImage: "url('/assets/main/background/bg-market.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.8,
          }}
        >
          <MarketDetailStats prediction={prediction}>
            <VotingSection
              prediction={prediction}
              user={user}
              onPlaceVote={handlePlaceVote}
              onOpenResolveModal={() => setIsResolveModalOpen(true)}
              isVoting={isVoting}
              voteError={voteError}
            />
          </MarketDetailStats>
        </div>
      </div>

      <ResolveModal
        isOpen={isResolveModalOpen}
        onClose={handleCloseResolveModal}
        onResolve={handleResolveMarket}
        resolveForm={resolveForm}
        setResolveForm={setResolveForm}
        isResolving={isResolving}
      />
    </div>
  )
}