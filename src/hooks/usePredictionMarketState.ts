import { useSetAtom, useAtomValue } from 'jotai'
import {
  predictionMarketStateAtom,
  predictionsAtom,
  marketsAtom,
  isLoadingAtom,
  errorAtom,
  showCreateFormAtom,
  createFormDataAtom,
  imageFileAtom,
  previewUrlAtom,
  isGroupDropdownOpenAtom,
  isCreatingAtom,
  createErrorAtom,
  activeCurrentPageAtom,
  closedCurrentPageAtom,
  groupsAtom,
  groupsLoadingAtom,
  groupsErrorAtom,
  transformedMarketsAtom,
  activeMarketsAtom,
  closedMarketsAtom,
  paginatedActiveMarketsAtom,
  paginatedClosedMarketsAtom,
  activeTotalPagesAtom,
  closedTotalPagesAtom,
  selectedGroupAtom,
  setPredictionsAtom,
  setMarketsAtom,
  setLoadingAtom,
  setErrorAtom,
  setShowCreateFormAtom,
  setCreateFormDataAtom,
  updateCreateFormDataAtom,
  setImageFileAtom,
  setPreviewUrlAtom,
  setGroupDropdownOpenAtom,
  setCreatingAtom,
  setCreateErrorAtom,
  setActiveCurrentPageAtom,
  setClosedCurrentPageAtom,
  setGroupsAtom,
  setGroupsLoadingAtom,
  setGroupsErrorAtom,
  resetPredictionMarketStateAtom,
  PredictionFormData
} from '@/store/predictionMarket'

export const usePredictionMarketState = () => {
  return useAtomValue(predictionMarketStateAtom)
}

export const usePredictions = () => {
  const predictions = useAtomValue(predictionsAtom)
  const setPredictions = useSetAtom(setPredictionsAtom)
  
  return {
    predictions,
    setPredictions
  }
}

export const useMarkets = () => {
  const markets = useAtomValue(marketsAtom)
  const transformedMarkets = useAtomValue(transformedMarketsAtom)
  const setMarkets = useSetAtom(setMarketsAtom)
  
  return {
    markets,
    transformedMarkets,
    setMarkets
  }
}

export const usePredictionMarketLoading = () => {
  const isLoading = useAtomValue(isLoadingAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  
  return {
    isLoading,
    setLoading
  }
}

export const usePredictionMarketError = () => {
  const error = useAtomValue(errorAtom)
  const setError = useSetAtom(setErrorAtom)
  
  return {
    error,
    setError
  }
}

export const useCreateForm = () => {
  const showCreateForm = useAtomValue(showCreateFormAtom)
  const createFormData = useAtomValue(createFormDataAtom)
  const imageFile = useAtomValue(imageFileAtom)
  const previewUrl = useAtomValue(previewUrlAtom)
  const isGroupDropdownOpen = useAtomValue(isGroupDropdownOpenAtom)
  const isCreating = useAtomValue(isCreatingAtom)
  const createError = useAtomValue(createErrorAtom)
  const selectedGroup = useAtomValue(selectedGroupAtom)
  
  const setShowCreateForm = useSetAtom(setShowCreateFormAtom)
  const setCreateFormData = useSetAtom(setCreateFormDataAtom)
  const updateCreateFormData = useSetAtom(updateCreateFormDataAtom)
  const setImageFile = useSetAtom(setImageFileAtom)
  const setPreviewUrl = useSetAtom(setPreviewUrlAtom)
  const setGroupDropdownOpen = useSetAtom(setGroupDropdownOpenAtom)
  const setCreating = useSetAtom(setCreatingAtom)
  const setCreateError = useSetAtom(setCreateErrorAtom)
  
  return {
    showCreateForm,
    createFormData,
    imageFile,
    previewUrl,
    isGroupDropdownOpen,
    isCreating,
    createError,
    selectedGroup,
    setShowCreateForm,
    setCreateFormData,
    updateCreateFormData,
    setImageFile,
    setPreviewUrl,
    setGroupDropdownOpen,
    setCreating,
    setCreateError
  }
}

export const usePagination = () => {
  const activeCurrentPage = useAtomValue(activeCurrentPageAtom)
  const closedCurrentPage = useAtomValue(closedCurrentPageAtom)
  const activeMarkets = useAtomValue(activeMarketsAtom)
  const closedMarkets = useAtomValue(closedMarketsAtom)
  const paginatedActiveMarkets = useAtomValue(paginatedActiveMarketsAtom)
  const paginatedClosedMarkets = useAtomValue(paginatedClosedMarketsAtom)
  const activeTotalPages = useAtomValue(activeTotalPagesAtom)
  const closedTotalPages = useAtomValue(closedTotalPagesAtom)
  
  const setActiveCurrentPage = useSetAtom(setActiveCurrentPageAtom)
  const setClosedCurrentPage = useSetAtom(setClosedCurrentPageAtom)
  
  return {
    activeCurrentPage,
    closedCurrentPage,
    activeMarkets,
    closedMarkets,
    paginatedActiveMarkets,
    paginatedClosedMarkets,
    activeTotalPages,
    closedTotalPages,
    setActiveCurrentPage,
    setClosedCurrentPage
  }
}

export const useGroups = () => {
  const groups = useAtomValue(groupsAtom)
  const groupsLoading = useAtomValue(groupsLoadingAtom)
  const groupsError = useAtomValue(groupsErrorAtom)
  
  const setGroups = useSetAtom(setGroupsAtom)
  const setGroupsLoading = useSetAtom(setGroupsLoadingAtom)
  const setGroupsError = useSetAtom(setGroupsErrorAtom)
  
  return {
    groups,
    groupsLoading,
    groupsError,
    setGroups,
    setGroupsLoading,
    setGroupsError
  }
}

export const usePredictionMarketActions = () => {
  const setPredictions = useSetAtom(setPredictionsAtom)
  const setMarkets = useSetAtom(setMarketsAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  const setError = useSetAtom(setErrorAtom)
  const setShowCreateForm = useSetAtom(setShowCreateFormAtom)
  const setCreateFormData = useSetAtom(setCreateFormDataAtom)
  const updateCreateFormData = useSetAtom(updateCreateFormDataAtom)
  const setImageFile = useSetAtom(setImageFileAtom)
  const setPreviewUrl = useSetAtom(setPreviewUrlAtom)
  const setGroupDropdownOpenState = useSetAtom(setGroupDropdownOpenAtom)
  const setCreating = useSetAtom(setCreatingAtom)
  const setCreateError = useSetAtom(setCreateErrorAtom)
  const setActiveCurrentPage = useSetAtom(setActiveCurrentPageAtom)
  const setClosedCurrentPage = useSetAtom(setClosedCurrentPageAtom)
  const setGroups = useSetAtom(setGroupsAtom)
  const setGroupsLoading = useSetAtom(setGroupsLoadingAtom)
  const setGroupsError = useSetAtom(setGroupsErrorAtom)
  const resetState = useSetAtom(resetPredictionMarketStateAtom)
  
  const openCreateForm = () => {
    setShowCreateForm(true)
  }
  
  const closeCreateForm = () => {
    setShowCreateForm(false)
  }
  
  const updatePredictions = (predictions: any[]) => {
    setPredictions(predictions)
  }
  
  const updateMarkets = (markets: any[]) => {
    setMarkets(markets)
  }
  
  const updateLoading = (loading: boolean) => {
    setLoading(loading)
  }
  
  const updateError = (error: string | null) => {
    setError(error)
  }
  
  const updateFormData = (formData: PredictionFormData) => {
    setCreateFormData(formData)
  }
  
  const updateFormField = (field: Partial<PredictionFormData>) => {
    updateCreateFormData(field)
  }
  
  const updateImageFile = (file: File | null) => {
    setImageFile(file)
  }
  
  const updatePreviewUrl = (url: string) => {
    setPreviewUrl(url)
  }
  
  const setDropdownOpen = (open: boolean) => {
    setGroupDropdownOpenState(open)
  }
  
  const toggleGroupDropdown = () => {
    setGroupDropdownOpenState(prev => !prev)
  }
  
  const updateCreating = (creating: boolean) => {
    setCreating(creating)
  }
  
  const updateCreateError = (error: string | null) => {
    setCreateError(error)
  }
  
  const updateActiveCurrentPage = (page: number) => {
    setActiveCurrentPage(page)
  }
  
  const updateClosedCurrentPage = (page: number) => {
    setClosedCurrentPage(page)
  }
  
  const updateGroups = (groups: any[]) => {
    setGroups(groups)
  }
  
  const updateGroupsLoading = (loading: boolean) => {
    setGroupsLoading(loading)
  }
  
  const updateGroupsError = (error: string | null) => {
    setGroupsError(error)
  }
  
  const resetAllState = () => {
    resetState()
  }
  
  return {
    openCreateForm,
    closeCreateForm,
    updatePredictions,
    updateMarkets,
    updateLoading,
    updateError,
    updateFormData,
    updateFormField,
    updateImageFile,
    updatePreviewUrl,
    setGroupDropdownOpen: setDropdownOpen,
    toggleGroupDropdown,
    updateCreating,
    updateCreateError,
    updateActiveCurrentPage,
    updateClosedCurrentPage,
    updateGroups,
    updateGroupsLoading,
    updateGroupsError,
    resetAllState
  }
}