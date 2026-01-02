import { useSetAtom, useAtomValue } from 'jotai'
import { 
  dashboardCardsStateAtom,
  predictionCardAtom,
  activityCardAtom,
  balanceCardAtom,
  myPredictionMarketCardAtom,
  defiCardAtom,
  groupCardAtom,
  setCardStateAtom,
  type DashboardCardsState
} from '@/store/dashboardCards'

export const useDashboardCards = () => {
  return useAtomValue(dashboardCardsStateAtom)
}

export const usePredictionCard = () => {
  const isLoading = useAtomValue(predictionCardAtom.isLoading)
  const error = useAtomValue(predictionCardAtom.error)
  const data = useAtomValue(predictionCardAtom.data)
  const setCardState = useSetAtom(setCardStateAtom)
  
  const updateCard = (updates: { isLoading?: boolean; error?: string | null; data?: any }) => {
    setCardState({ card: 'prediction', ...updates })
  }
  
  return {
    isLoading,
    error,
    data,
    updateCard
  }
}

export const useActivityCard = () => {
  const isLoading = useAtomValue(activityCardAtom.isLoading)
  const error = useAtomValue(activityCardAtom.error)
  const data = useAtomValue(activityCardAtom.data)
  const setCardState = useSetAtom(setCardStateAtom)
  
  const updateCard = (updates: { isLoading?: boolean; error?: string | null; data?: any }) => {
    setCardState({ card: 'activity', ...updates })
  }
  
  return {
    isLoading,
    error,
    data,
    updateCard
  }
}

export const useBalanceCard = () => {
  const isLoading = useAtomValue(balanceCardAtom.isLoading)
  const error = useAtomValue(balanceCardAtom.error)
  const data = useAtomValue(balanceCardAtom.data)
  const setCardState = useSetAtom(setCardStateAtom)
  
  const updateCard = (updates: { isLoading?: boolean; error?: string | null; data?: any }) => {
    setCardState({ card: 'balance', ...updates })
  }
  
  return {
    isLoading,
    error,
    data,
    updateCard
  }
}

export const useMyPredictionMarketCard = () => {
  const isLoading = useAtomValue(myPredictionMarketCardAtom.isLoading)
  const error = useAtomValue(myPredictionMarketCardAtom.error)
  const data = useAtomValue(myPredictionMarketCardAtom.data)
  const setCardState = useSetAtom(setCardStateAtom)
  
  const updateCard = (updates: { isLoading?: boolean; error?: string | null; data?: any }) => {
    setCardState({ card: 'myPredictionMarket', ...updates })
  }
  
  return {
    isLoading,
    error,
    data,
    updateCard
  }
}

export const useDefiCard = () => {
  const isLoading = useAtomValue(defiCardAtom.isLoading)
  const error = useAtomValue(defiCardAtom.error)
  const data = useAtomValue(defiCardAtom.data)
  const setCardState = useSetAtom(setCardStateAtom)
  
  const updateCard = (updates: { isLoading?: boolean; error?: string | null; data?: any }) => {
    setCardState({ card: 'defi', ...updates })
  }
  
  return {
    isLoading,
    error,
    data,
    updateCard
  }
}

export const useGroupCard = () => {
  const isLoading = useAtomValue(groupCardAtom.isLoading)
  const error = useAtomValue(groupCardAtom.error)
  const data = useAtomValue(groupCardAtom.data)
  const setCardState = useSetAtom(setCardStateAtom)
  
  const updateCard = (updates: { isLoading?: boolean; error?: string | null; data?: any }) => {
    setCardState({ card: 'group', ...updates })
  }
  
  return {
    isLoading,
    error,
    data,
    updateCard
  }
}