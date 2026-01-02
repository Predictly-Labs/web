import { useSetAtom, useAtomValue } from 'jotai'
import {
  subscriptionsStateAtom,
  pricingPlansAtom,
  selectedPlanAtom,
  isModalOpenAtom,
  selectedModalPlanAtom,
  isLoadingAtom,
  errorAtom,
  currentUserPlanAtom,
  selectedPlanDataAtom,
  availableUpgradesAtom,
  canUpgradeAtom,
  setPricingPlansAtom,
  setSelectedPlanAtom,
  setModalOpenAtom,
  setSelectedModalPlanAtom,
  setLoadingAtom,
  setErrorAtom,
  setCurrentUserPlanAtom,
  subscribeToPlanAtom,
  resetSubscriptionsStateAtom,
  PricingPlan
} from '@/store/subscriptions'

export const useSubscriptionsState = () => {
  return useAtomValue(subscriptionsStateAtom)
}

export const usePricingPlans = () => {
  const pricingPlans = useAtomValue(pricingPlansAtom)
  const setPricingPlans = useSetAtom(setPricingPlansAtom)
  
  return {
    pricingPlans,
    setPricingPlans
  }
}

export const useSelectedPlan = () => {
  const selectedPlan = useAtomValue(selectedPlanAtom)
  const selectedPlanData = useAtomValue(selectedPlanDataAtom)
  const setSelectedPlan = useSetAtom(setSelectedPlanAtom)
  
  return {
    selectedPlan,
    selectedPlanData,
    setSelectedPlan
  }
}

export const useModal = () => {
  const isModalOpen = useAtomValue(isModalOpenAtom)
  const selectedModalPlan = useAtomValue(selectedModalPlanAtom)
  const setModalOpen = useSetAtom(setModalOpenAtom)
  const setSelectedModalPlan = useSetAtom(setSelectedModalPlanAtom)
  
  return {
    isModalOpen,
    selectedModalPlan,
    setModalOpen,
    setSelectedModalPlan
  }
}

export const useSubscriptionsLoading = () => {
  const isLoading = useAtomValue(isLoadingAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  
  return {
    isLoading,
    setLoading
  }
}

export const useSubscriptionsError = () => {
  const error = useAtomValue(errorAtom)
  const setError = useSetAtom(setErrorAtom)
  
  return {
    error,
    setError
  }
}

export const useCurrentUserPlan = () => {
  const currentUserPlan = useAtomValue(currentUserPlanAtom)
  const availableUpgrades = useAtomValue(availableUpgradesAtom)
  const canUpgrade = useAtomValue(canUpgradeAtom)
  const setCurrentUserPlan = useSetAtom(setCurrentUserPlanAtom)
  
  return {
    currentUserPlan,
    availableUpgrades,
    canUpgrade,
    setCurrentUserPlan
  }
}

export const useSubscriptionsActions = () => {
  const setPricingPlans = useSetAtom(setPricingPlansAtom)
  const setSelectedPlan = useSetAtom(setSelectedPlanAtom)
  const setModalOpen = useSetAtom(setModalOpenAtom)
  const setSelectedModalPlan = useSetAtom(setSelectedModalPlanAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  const setError = useSetAtom(setErrorAtom)
  const setCurrentUserPlan = useSetAtom(setCurrentUserPlanAtom)
  const subscribeToPlan = useSetAtom(subscribeToPlanAtom)
  const resetState = useSetAtom(resetSubscriptionsStateAtom)
  
  const updatePricingPlans = (plans: PricingPlan[]) => {
    setPricingPlans(plans)
  }
  
  const updateSelectedPlan = (planName: string) => {
    setSelectedPlan(planName)
  }
  
  const openModal = () => {
    setModalOpen(true)
  }
  
  const closeModal = () => {
    setModalOpen(false)
  }
  
  const openPlanModal = (plan: PricingPlan) => {
    setSelectedModalPlan(plan)
  }
  
  const closePlanModal = () => {
    setSelectedModalPlan(null)
  }
  
  const updateLoading = (loading: boolean) => {
    setLoading(loading)
  }
  
  const updateError = (error: string | null) => {
    setError(error)
  }
  
  const updateCurrentUserPlan = (planName: string) => {
    setCurrentUserPlan(planName)
  }
  
  const handlePlanSelect = (planName: string) => {
    updateSelectedPlan(planName)
  }
  
  const handleSubscribe = (plan: PricingPlan) => {
    subscribeToPlan(plan)
  }
  
  const handleCloseModal = () => {
    closeModal()
    closePlanModal()
  }
  
  const resetAllState = () => {
    resetState()
  }
  
  return {
    updatePricingPlans,
    updateSelectedPlan,
    openModal,
    closeModal,
    openPlanModal,
    closePlanModal,
    updateLoading,
    updateError,
    updateCurrentUserPlan,
    handlePlanSelect,
    handleSubscribe,
    handleCloseModal,
    resetAllState
  }
}