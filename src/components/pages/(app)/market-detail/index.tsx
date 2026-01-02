'use client'

import { useEffect } from 'react'
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
import {
  usePrediction,
  useMarketLoading,
  useMarketError,
  useVoting,
  useResolving,
  useResolveModal,
  useMarketId,
  useMarketPermissions,
  useMarketDetailActions
} from '@/hooks/useMarketDetailState'

interface MarketDetailProps {
  marketId: string
}

export const MarketDetail = ({ marketId }: MarketDetailProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const { prediction, fetchPredictionById, isLoading, error } = useGetPredictionById()
  const { placeVote, isVoting, voteError } = usePlaceVote()
  const { resolveMarket, isResolving, resolveError } = useResolveMarket()
  
  const { prediction: globalPrediction } = usePrediction()
  const { isLoading: globalLoading } = useMarketLoading()
  const { error: globalError } = useMarketError()
  const { isVoting: globalVoting, voteError: globalVoteError } = useVoting()
  const { isResolving: globalResolving, resolveError: globalResolveError } = useResolving()
  const { isResolveModalOpen, resolveForm } = useResolveModal()
  const { hasValidStakeRange } = useMarketPermissions()
  const {
    updatePrediction,
    updateLoading,
    updateError,
    updateVoting,
    updateVoteError,
    updateResolving,
    updateResolveError,
    updateResolveForm,
    updateMarketId,
    openResolveModal,
    closeResolveModal
  } = useMarketDetailActions()

  useEffect(() => {
    updateMarketId(marketId)
    if (marketId) {
      updateLoading(true)
      fetchPredictionById(marketId)
        .then(() => {
          updatePrediction(prediction)
          updateLoading(false)
        })
        .catch((err) => {
          updateError(err.message)
          updateLoading(false)
        })
    }
  }, [marketId, fetchPredictionById, updateMarketId, updatePrediction, updateLoading, updateError])

  useEffect(() => {
    updatePrediction(prediction)
  }, [prediction, updatePrediction])

  useEffect(() => {
    updateLoading(isLoading)
  }, [isLoading, updateLoading])

  useEffect(() => {
    updateError(error)
  }, [error, updateError])

  useEffect(() => {
    updateVoting(isVoting)
  }, [isVoting, updateVoting])

  useEffect(() => {
    updateVoteError(voteError)
  }, [voteError, updateVoteError])

  useEffect(() => {
    updateResolving(isResolving)
  }, [isResolving, updateResolving])

  useEffect(() => {
    updateResolveError(resolveError)
  }, [resolveError, updateResolveError])

  const handleBack = () => {
    router.push('/app/create-market')
  }

  const handlePlaceVote = async (selectedVote: 'YES' | 'NO', voteAmount: string) => {
    const currentPrediction = globalPrediction || prediction
    if (!currentPrediction) {
      toast.error('Market data not available')
      return
    }

    const amount = parseFloat(voteAmount)
    if (!hasValidStakeRange) {
      toast.error('Invalid stake range configuration')
      return
    }
    
    if (amount < currentPrediction.minStake || amount > currentPrediction.maxStake) {
      toast.error(`Amount must be between ${currentPrediction.minStake} and ${currentPrediction.maxStake} MOVE`)
      return
    }

    updateVoting(true)
    const result = await placeVote(currentPrediction.id, { prediction: selectedVote, amount })
    if (result) {
      toast.success(`Successfully placed ${selectedVote} vote for ${amount} MOVE`)
      fetchPredictionById(marketId)
    }
    updateVoting(false)
  }

  const handleResolveMarket = async () => {
    const currentPrediction = globalPrediction || prediction
    if (!currentPrediction || !resolveForm.resolutionNote.trim()) {
      toast.error('Please provide a resolution note')
      return
    }

    updateResolving(true)
    const result = await resolveMarket(currentPrediction.id, {
      outcome: resolveForm.outcome,
      resolutionNote: resolveForm.resolutionNote
    })

    if (result) {
      toast.success(`Market resolved as ${resolveForm.outcome}`)
      closeResolveModal()
      fetchPredictionById(marketId)
    } else if (globalResolveError || resolveError) {
      toast.error(globalResolveError || resolveError)
    }
    updateResolving(false)
  }

  const currentPrediction = globalPrediction || prediction
  const currentLoading = globalLoading || isLoading
  const currentError = globalError || error

  if (currentLoading) {
    return <LoadingState />
  }

  if (currentError || !currentPrediction) {
    return <ErrorState onBack={handleBack} />
  }

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />

      <div className="max-w-7xl mx-auto relative z-10">
        <MarketDetailHeader prediction={currentPrediction} onBack={handleBack} />

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
          <MarketDetailStats prediction={currentPrediction}>
            <VotingSection
              prediction={currentPrediction}
              user={user}
              onPlaceVote={handlePlaceVote}
              onOpenResolveModal={openResolveModal}
              isVoting={globalVoting || isVoting}
              voteError={globalVoteError || voteError}
            />
          </MarketDetailStats>
        </div>
      </div>

      <ResolveModal
        isOpen={isResolveModalOpen}
        onClose={closeResolveModal}
        onResolve={handleResolveMarket}
        resolveForm={resolveForm}
        setResolveForm={updateResolveForm}
        isResolving={globalResolving || isResolving}
      />
    </div>
  )
}