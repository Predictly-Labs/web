import { usePlaceVote } from './usePlaceVote'
import { useResolveMarket } from './useResolveMarket'
import { useClaimRewards } from './useClaimRewards'

export const useMarketActions = () => {
  const {
    placeVote,
    isVoting,
    voteError
  } = usePlaceVote()

  const {
    resolveMarket,
    isResolving,
    resolveError
  } = useResolveMarket()

  const {
    claimRewards,
    isClaiming,
    claimError
  } = useClaimRewards()

  const isLoading = isVoting || isResolving || isClaiming
  const error = voteError || resolveError || claimError

  return {
    placeVote,
    resolveMarket,
    claimRewards,
    isVoting,
    isResolving,
    isClaiming,
    isLoading,
    voteError,
    resolveError,
    claimError,
    error
  }
}