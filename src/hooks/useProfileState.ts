import { useSetAtom, useAtomValue } from 'jotai'
import {
  profileStateAtom,
  userStatsAtom,
  groupsAtom,
  myVotesAtom,
  votesStatsAtom,
  moveBalanceAtom,
  activeTabAtom,
  activeFilterAtom,
  isEditModalOpenAtom,
  editFormAtom,
  previewUrlAtom,
  selectedFileAtom,
  searchQueryAtom,
  isLoadingUserStatsAtom,
  isLoadingGroupsAtom,
  isLoadingVotesAtom,
  isLoadingVotesStatsAtom,
  isLoadingBalanceAtom,
  isUpdatingProfileAtom,
  updateErrorAtom,
  filteredVotesAtom,
  recentActivityAtom,
  groupsLimitedAtom,
  hasMoreGroupsAtom,
  setUserStatsAtom,
  setGroupsAtom,
  setMyVotesAtom,
  setVotesStatsAtom,
  setMoveBalanceAtom,
  setActiveTabAtom,
  setActiveFilterAtom,
  setEditModalOpenAtom,
  setEditFormAtom,
  updateEditFormAtom,
  setPreviewUrlAtom,
  setSelectedFileAtom,
  setSearchQueryAtom,
  setLoadingUserStatsAtom,
  setLoadingGroupsAtom,
  setLoadingVotesAtom,
  setLoadingVotesStatsAtom,
  setLoadingBalanceAtom,
  setUpdatingProfileAtom,
  setUpdateErrorAtom,
  resetProfileStateAtom,
  EditForm
} from '@/store/profile'

export const useProfileState = () => {
  return useAtomValue(profileStateAtom)
}

export const useUserStats = () => {
  const userStats = useAtomValue(userStatsAtom)
  const isLoading = useAtomValue(isLoadingUserStatsAtom)
  const setUserStats = useSetAtom(setUserStatsAtom)
  const setLoading = useSetAtom(setLoadingUserStatsAtom)
  
  return {
    userStats,
    isLoading,
    setUserStats,
    setLoading
  }
}

export const useProfileGroups = () => {
  const groups = useAtomValue(groupsAtom)
  const groupsLimited = useAtomValue(groupsLimitedAtom)
  const hasMoreGroups = useAtomValue(hasMoreGroupsAtom)
  const isLoading = useAtomValue(isLoadingGroupsAtom)
  const setGroups = useSetAtom(setGroupsAtom)
  const setLoading = useSetAtom(setLoadingGroupsAtom)
  
  return {
    groups,
    groupsLimited,
    hasMoreGroups,
    isLoading,
    setGroups,
    setLoading
  }
}

export const useMyVotes = () => {
  const myVotes = useAtomValue(myVotesAtom)
  const filteredVotes = useAtomValue(filteredVotesAtom)
  const recentActivity = useAtomValue(recentActivityAtom)
  const isLoading = useAtomValue(isLoadingVotesAtom)
  const setMyVotes = useSetAtom(setMyVotesAtom)
  const setLoading = useSetAtom(setLoadingVotesAtom)
  
  return {
    myVotes,
    filteredVotes,
    recentActivity,
    isLoading,
    setMyVotes,
    setLoading
  }
}

export const useVotesStats = () => {
  const votesStats = useAtomValue(votesStatsAtom)
  const isLoading = useAtomValue(isLoadingVotesStatsAtom)
  const setVotesStats = useSetAtom(setVotesStatsAtom)
  const setLoading = useSetAtom(setLoadingVotesStatsAtom)
  
  return {
    votesStats,
    isLoading,
    setVotesStats,
    setLoading
  }
}

export const useMoveBalance = () => {
  const moveBalance = useAtomValue(moveBalanceAtom)
  const isLoading = useAtomValue(isLoadingBalanceAtom)
  const setMoveBalance = useSetAtom(setMoveBalanceAtom)
  const setLoading = useSetAtom(setLoadingBalanceAtom)
  
  return {
    moveBalance,
    isLoading,
    setMoveBalance,
    setLoading
  }
}

export const useActiveTab = () => {
  const activeTab = useAtomValue(activeTabAtom)
  const setActiveTab = useSetAtom(setActiveTabAtom)
  
  return {
    activeTab,
    setActiveTab
  }
}

export const useActiveFilter = () => {
  const activeFilter = useAtomValue(activeFilterAtom)
  const setActiveFilter = useSetAtom(setActiveFilterAtom)
  
  return {
    activeFilter,
    setActiveFilter
  }
}

export const useEditModal = () => {
  const isEditModalOpen = useAtomValue(isEditModalOpenAtom)
  const editForm = useAtomValue(editFormAtom)
  const previewUrl = useAtomValue(previewUrlAtom)
  const selectedFile = useAtomValue(selectedFileAtom)
  const isUpdating = useAtomValue(isUpdatingProfileAtom)
  const updateError = useAtomValue(updateErrorAtom)
  
  const setEditModalOpen = useSetAtom(setEditModalOpenAtom)
  const setEditForm = useSetAtom(setEditFormAtom)
  const updateEditForm = useSetAtom(updateEditFormAtom)
  const setPreviewUrl = useSetAtom(setPreviewUrlAtom)
  const setSelectedFile = useSetAtom(setSelectedFileAtom)
  const setUpdating = useSetAtom(setUpdatingProfileAtom)
  const setUpdateError = useSetAtom(setUpdateErrorAtom)
  
  return {
    isEditModalOpen,
    editForm,
    previewUrl,
    selectedFile,
    isUpdating,
    updateError,
    setEditModalOpen,
    setEditForm,
    updateEditForm,
    setPreviewUrl,
    setSelectedFile,
    setUpdating,
    setUpdateError
  }
}

export const useSearchQuery = () => {
  const searchQuery = useAtomValue(searchQueryAtom)
  const setSearchQuery = useSetAtom(setSearchQueryAtom)
  
  return {
    searchQuery,
    setSearchQuery
  }
}

export const useProfileActions = () => {
  const setUserStats = useSetAtom(setUserStatsAtom)
  const setGroups = useSetAtom(setGroupsAtom)
  const setMyVotes = useSetAtom(setMyVotesAtom)
  const setVotesStats = useSetAtom(setVotesStatsAtom)
  const setMoveBalance = useSetAtom(setMoveBalanceAtom)
  const setActiveTab = useSetAtom(setActiveTabAtom)
  const setActiveFilter = useSetAtom(setActiveFilterAtom)
  const setEditModalOpen = useSetAtom(setEditModalOpenAtom)
  const setEditForm = useSetAtom(setEditFormAtom)
  const updateEditForm = useSetAtom(updateEditFormAtom)
  const setPreviewUrl = useSetAtom(setPreviewUrlAtom)
  const setSelectedFile = useSetAtom(setSelectedFileAtom)
  const setSearchQuery = useSetAtom(setSearchQueryAtom)
  const setLoadingUserStats = useSetAtom(setLoadingUserStatsAtom)
  const setLoadingGroups = useSetAtom(setLoadingGroupsAtom)
  const setLoadingVotes = useSetAtom(setLoadingVotesAtom)
  const setLoadingVotesStats = useSetAtom(setLoadingVotesStatsAtom)
  const setLoadingBalance = useSetAtom(setLoadingBalanceAtom)
  const setUpdating = useSetAtom(setUpdatingProfileAtom)
  const setUpdateError = useSetAtom(setUpdateErrorAtom)
  const resetState = useSetAtom(resetProfileStateAtom)
  
  const updateUserStats = (stats: any) => {
    setUserStats(stats)
  }
  
  const updateGroups = (groups: any[]) => {
    setGroups(groups)
  }
  
  const updateMyVotes = (votes: any[]) => {
    setMyVotes(votes)
  }
  
  const updateVotesStats = (stats: any) => {
    setVotesStats(stats)
  }
  
  const updateMoveBalance = (balance: any) => {
    setMoveBalance(balance)
  }
  
  const updateActiveTab = (tab: 'positions' | 'activity') => {
    setActiveTab(tab)
  }
  
  const updateActiveFilter = (filter: 'active' | 'closed') => {
    setActiveFilter(filter)
  }
  
  const openEditModal = () => {
    setEditModalOpen(true)
  }
  
  const closeEditModal = () => {
    setEditModalOpen(false)
  }
  
  const setEditFormData = (form: EditForm) => {
    setEditForm(form)
  }
  
  const updateEditFormField = (field: Partial<EditForm>) => {
    updateEditForm(field)
  }
  
  const updatePreviewUrl = (url: string) => {
    setPreviewUrl(url)
  }
  
  const updateSelectedFile = (file: File | null) => {
    setSelectedFile(file)
  }
  
  const updateSearchQuery = (query: string) => {
    setSearchQuery(query)
  }
  
  const updateLoadingUserStats = (loading: boolean) => {
    setLoadingUserStats(loading)
  }
  
  const updateLoadingGroups = (loading: boolean) => {
    setLoadingGroups(loading)
  }
  
  const updateLoadingVotes = (loading: boolean) => {
    setLoadingVotes(loading)
  }
  
  const updateLoadingVotesStats = (loading: boolean) => {
    setLoadingVotesStats(loading)
  }
  
  const updateLoadingBalance = (loading: boolean) => {
    setLoadingBalance(loading)
  }
  
  const updateUpdating = (updating: boolean) => {
    setUpdating(updating)
  }
  
  const updateUpdateError = (error: string | null) => {
    setUpdateError(error)
  }
  
  const resetAllState = () => {
    resetState()
  }
  
  return {
    updateUserStats,
    updateGroups,
    updateMyVotes,
    updateVotesStats,
    updateMoveBalance,
    updateActiveTab,
    updateActiveFilter,
    openEditModal,
    closeEditModal,
    updateEditForm: setEditFormData,
    updateEditFormField,
    updatePreviewUrl,
    updateSelectedFile,
    updateSearchQuery,
    updateLoadingUserStats,
    updateLoadingGroups,
    updateLoadingVotes,
    updateLoadingVotesStats,
    updateLoadingBalance,
    updateUpdating,
    updateUpdateError,
    resetAllState
  }
}