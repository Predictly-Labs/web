import { atom } from 'jotai'

export interface MarketDetailState {
  prediction: any
  isLoading: boolean
  error: string | null
  isVoting: boolean
  voteError: string | null
  isResolving: boolean
  resolveError: string | null
  isResolveModalOpen: boolean
  resolveForm: {
    outcome: 'YES' | 'NO'
    resolutionNote: string
  }
  marketId: string | null
}

export const predictionAtom = atom<any>(null)
export const isLoadingAtom = atom(false)
export const errorAtom = atom<string | null>(null)
export const isVotingAtom = atom(false)
export const voteErrorAtom = atom<string | null>(null)
export const isResolvingAtom = atom(false)
export const resolveErrorAtom = atom<string | null>(null)
export const isResolveModalOpenAtom = atom(false)
export const resolveFormAtom = atom({
  outcome: 'YES' as 'YES' | 'NO',
  resolutionNote: ''
})
export const marketIdAtom = atom<string | null>(null)

export const marketDetailStateAtom = atom((get) => ({
  prediction: get(predictionAtom),
  isLoading: get(isLoadingAtom),
  error: get(errorAtom),
  isVoting: get(isVotingAtom),
  voteError: get(voteErrorAtom),
  isResolving: get(isResolvingAtom),
  resolveError: get(resolveErrorAtom),
  isResolveModalOpen: get(isResolveModalOpenAtom),
  resolveForm: get(resolveFormAtom),
  marketId: get(marketIdAtom)
}))

export const setPredictionAtom = atom(
  null,
  (_get, set, prediction: any) => {
    set(predictionAtom, prediction)
  }
)

export const setLoadingAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(isLoadingAtom, loading)
    if (loading) {
      set(errorAtom, null)
    }
  }
)

export const setErrorAtom = atom(
  null,
  (_get, set, error: string | null) => {
    set(errorAtom, error)
    if (error) {
      set(isLoadingAtom, false)
    }
  }
)

export const setVotingAtom = atom(
  null,
  (_get, set, voting: boolean) => {
    set(isVotingAtom, voting)
    if (voting) {
      set(voteErrorAtom, null)
    }
  }
)

export const setVoteErrorAtom = atom(
  null,
  (_get, set, error: string | null) => {
    set(voteErrorAtom, error)
    if (error) {
      set(isVotingAtom, false)
    }
  }
)

export const setResolvingAtom = atom(
  null,
  (_get, set, resolving: boolean) => {
    set(isResolvingAtom, resolving)
    if (resolving) {
      set(resolveErrorAtom, null)
    }
  }
)

export const setResolveErrorAtom = atom(
  null,
  (_get, set, error: string | null) => {
    set(resolveErrorAtom, error)
    if (error) {
      set(isResolvingAtom, false)
    }
  }
)

export const setResolveModalOpenAtom = atom(
  null,
  (_get, set, open: boolean) => {
    set(isResolveModalOpenAtom, open)
    if (!open) {
      set(resolveFormAtom, { outcome: 'YES', resolutionNote: '' })
    }
  }
)

export const setResolveFormAtom = atom(
  null,
  (_get, set, form: { outcome: 'YES' | 'NO'; resolutionNote: string }) => {
    set(resolveFormAtom, form)
  }
)

export const updateResolveFormAtom = atom(
  null,
  (get, set, update: Partial<{ outcome: 'YES' | 'NO'; resolutionNote: string }>) => {
    const currentForm = get(resolveFormAtom)
    set(resolveFormAtom, { ...currentForm, ...update })
  }
)

export const setMarketIdAtom = atom(
  null,
  (_get, set, marketId: string | null) => {
    set(marketIdAtom, marketId)
  }
)

export const resetMarketDetailStateAtom = atom(
  null,
  (_get, set) => {
    set(predictionAtom, null)
    set(isLoadingAtom, false)
    set(errorAtom, null)
    set(isVotingAtom, false)
    set(voteErrorAtom, null)
    set(isResolvingAtom, false)
    set(resolveErrorAtom, null)
    set(isResolveModalOpenAtom, false)
    set(resolveFormAtom, { outcome: 'YES', resolutionNote: '' })
    set(marketIdAtom, null)
  }
)

export const canResolveMarketAtom = atom((get) => {
  const prediction = get(predictionAtom)
  return prediction?.status === 'active' && prediction?.createdBy === 'currentUserId'
})

export const hasValidStakeRangeAtom = atom((get) => {
  const prediction = get(predictionAtom)
  return prediction?.minStake && prediction?.maxStake && prediction.minStake <= prediction.maxStake
})

export const marketStatsAtom = atom((get) => {
  const prediction = get(predictionAtom)
  if (!prediction) return null
  
  return {
    totalVolume: prediction.totalVolume || 0,
    yesVotes: prediction.yesVotes || 0,
    noVotes: prediction.noVotes || 0,
    totalVotes: (prediction.yesVotes || 0) + (prediction.noVotes || 0),
    yesPercentage: prediction.yesVotes && prediction.noVotes 
      ? Math.round((prediction.yesVotes / (prediction.yesVotes + prediction.noVotes)) * 100)
      : 50,
    noPercentage: prediction.yesVotes && prediction.noVotes
      ? Math.round((prediction.noVotes / (prediction.yesVotes + prediction.noVotes)) * 100)
      : 50
  }
})