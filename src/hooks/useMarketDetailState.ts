import { useSetAtom, useAtomValue } from 'jotai'
import { 
  marketDetailStateAtom,
  predictionAtom,
  isLoadingAtom,
  errorAtom,
  isVotingAtom,
  voteErrorAtom,
  isResolvingAtom,
  resolveErrorAtom,
  isResolveModalOpenAtom,
  resolveFormAtom,
  marketIdAtom,
  marketStatsAtom,
  canResolveMarketAtom,
  hasValidStakeRangeAtom,
  setPredictionAtom,
  setLoadingAtom,
  setErrorAtom,
  setVotingAtom,
  setVoteErrorAtom,
  setResolvingAtom,
  setResolveErrorAtom,
  setResolveModalOpenAtom,
  setResolveFormAtom,
  updateResolveFormAtom,
  setMarketIdAtom,
  resetMarketDetailStateAtom
} from '@/store/marketDetail'

export const useMarketDetailState = () => {
  return useAtomValue(marketDetailStateAtom)
}

export const usePrediction = () => {
  const prediction = useAtomValue(predictionAtom)
  const setPrediction = useSetAtom(setPredictionAtom)
  
  return {
    prediction,
    setPrediction
  }
}

export const useMarketLoading = () => {
  const isLoading = useAtomValue(isLoadingAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  
  return {
    isLoading,
    setLoading
  }
}

export const useMarketError = () => {
  const error = useAtomValue(errorAtom)
  const setError = useSetAtom(setErrorAtom)
  
  return {
    error,
    setError
  }
}

export const useVoting = () => {
  const isVoting = useAtomValue(isVotingAtom)
  const voteError = useAtomValue(voteErrorAtom)
  const setVoting = useSetAtom(setVotingAtom)
  const setVoteError = useSetAtom(setVoteErrorAtom)
  
  return {
    isVoting,
    voteError,
    setVoting,
    setVoteError
  }
}

export const useResolving = () => {
  const isResolving = useAtomValue(isResolvingAtom)
  const resolveError = useAtomValue(resolveErrorAtom)
  const setResolving = useSetAtom(setResolvingAtom)
  const setResolveError = useSetAtom(setResolveErrorAtom)
  
  return {
    isResolving,
    resolveError,
    setResolving,
    setResolveError
  }
}

export const useResolveModal = () => {
  const isResolveModalOpen = useAtomValue(isResolveModalOpenAtom)
  const resolveForm = useAtomValue(resolveFormAtom)
  const setResolveModalOpen = useSetAtom(setResolveModalOpenAtom)
  const setResolveForm = useSetAtom(setResolveFormAtom)
  const updateResolveForm = useSetAtom(updateResolveFormAtom)
  
  return {
    isResolveModalOpen,
    resolveForm,
    setResolveModalOpen,
    setResolveForm,
    updateResolveForm
  }
}

export const useMarketId = () => {
  const marketId = useAtomValue(marketIdAtom)
  const setMarketId = useSetAtom(setMarketIdAtom)
  
  return {
    marketId,
    setMarketId
  }
}

export const useMarketStats = () => {
  return useAtomValue(marketStatsAtom)
}

export const useMarketPermissions = () => {
  const canResolve = useAtomValue(canResolveMarketAtom)
  const hasValidStakeRange = useAtomValue(hasValidStakeRangeAtom)
  
  return {
    canResolve,
    hasValidStakeRange
  }
}

export const useMarketDetailActions = () => {
  const setPrediction = useSetAtom(setPredictionAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  const setError = useSetAtom(setErrorAtom)
  const setVoting = useSetAtom(setVotingAtom)
  const setVoteError = useSetAtom(setVoteErrorAtom)
  const setResolving = useSetAtom(setResolvingAtom)
  const setResolveError = useSetAtom(setResolveErrorAtom)
  const setResolveModalOpen = useSetAtom(setResolveModalOpenAtom)
  const setResolveForm = useSetAtom(setResolveFormAtom)
  const updateResolveForm = useSetAtom(updateResolveFormAtom)
  const setMarketId = useSetAtom(setMarketIdAtom)
  const resetState = useSetAtom(resetMarketDetailStateAtom)
  
  const openResolveModal = () => {
    setResolveModalOpen(true)
  }
  
  const closeResolveModal = () => {
    setResolveModalOpen(false)
  }
  
  const updatePrediction = (prediction: any) => {
    setPrediction(prediction)
  }
  
  const updateLoading = (loading: boolean) => {
    setLoading(loading)
  }
  
  const updateError = (error: string | null) => {
    setError(error)
  }
  
  const updateVoting = (voting: boolean) => {
    setVoting(voting)
  }
  
  const updateVoteError = (error: string | null) => {
    setVoteError(error)
  }
  
  const updateResolving = (resolving: boolean) => {
    setResolving(resolving)
  }
  
  const updateResolveError = (error: string | null) => {
    setResolveError(error)
  }
  
  const updateMarketId = (marketId: string | null) => {
    setMarketId(marketId)
  }
  
  const resetAllState = () => {
    resetState()
  }
  
  return {
    openResolveModal,
    closeResolveModal,
    updatePrediction,
    updateLoading,
    updateError,
    updateVoting,
    updateVoteError,
    updateResolving,
    updateResolveError,
    updateResolveForm,
    updateMarketId,
    resetAllState
  }
}