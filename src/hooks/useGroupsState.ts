import { useSetAtom, useAtomValue } from 'jotai'
import { 
  groupsStateAtom,
  groupsAtom,
  apiGroupsAtom,
  isLoadingAtom,
  errorAtom,
  showCreateFormAtom,
  showJoinFormAtom,
  paginationAtom,
  transformedGroupsAtom,
  setGroupsAtom,
  setApiGroupsAtom,
  setLoadingAtom,
  setErrorAtom,
  setShowCreateFormAtom,
  setShowJoinFormAtom,
  setPaginationAtom,
  resetGroupsStateAtom
} from '@/store/groups'
import { GroupData, ApiGroup } from '@/types/group'

export const useGroupsState = () => {
  return useAtomValue(groupsStateAtom)
}

export const useGroups = () => {
  const groups = useAtomValue(groupsAtom)
  const setGroups = useSetAtom(setGroupsAtom)
  
  return {
    groups,
    setGroups
  }
}

export const useApiGroups = () => {
  const apiGroups = useAtomValue(apiGroupsAtom)
  const setApiGroups = useSetAtom(setApiGroupsAtom)
  
  return {
    apiGroups,
    setApiGroups
  }
}

export const useTransformedGroups = () => {
  return useAtomValue(transformedGroupsAtom)
}

export const useGroupsLoading = () => {
  const isLoading = useAtomValue(isLoadingAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  
  return {
    isLoading,
    setLoading
  }
}

export const useGroupsError = () => {
  const error = useAtomValue(errorAtom)
  const setError = useSetAtom(setErrorAtom)
  
  return {
    error,
    setError
  }
}

export const useCreateForm = () => {
  const showCreateForm = useAtomValue(showCreateFormAtom)
  const setShowCreateForm = useSetAtom(setShowCreateFormAtom)
  
  return {
    showCreateForm,
    setShowCreateForm
  }
}

export const useJoinForm = () => {
  const showJoinForm = useAtomValue(showJoinFormAtom)
  const setShowJoinForm = useSetAtom(setShowJoinFormAtom)
  
  return {
    showJoinForm,
    setShowJoinForm
  }
}

export const useGroupsPagination = () => {
  const pagination = useAtomValue(paginationAtom)
  const setPagination = useSetAtom(setPaginationAtom)
  
  return {
    pagination,
    setPagination
  }
}

export const useGroupsActions = () => {
  const setGroups = useSetAtom(setGroupsAtom)
  const setApiGroups = useSetAtom(setApiGroupsAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  const setError = useSetAtom(setErrorAtom)
  const setShowCreateForm = useSetAtom(setShowCreateFormAtom)
  const setShowJoinForm = useSetAtom(setShowJoinFormAtom)
  const setPagination = useSetAtom(setPaginationAtom)
  const resetState = useSetAtom(resetGroupsStateAtom)
  
  const handleCreateGroup = () => {
    setShowCreateForm(true)
  }
  
  const handleJoinGroup = () => {
    setShowJoinForm(true)
  }
  
  const handleFormSuccess = () => {
    setShowCreateForm(false)
    setShowJoinForm(false)
  }
  
  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }
  
  const handleCloseJoinForm = () => {
    setShowJoinForm(false)
  }
  
  const updateGroups = (groups: GroupData[]) => {
    setGroups(groups)
  }
  
  const updateApiGroups = (apiGroups: ApiGroup[]) => {
    setApiGroups(apiGroups)
  }
  
  const updateLoading = (loading: boolean) => {
    setLoading(loading)
  }
  
  const updateError = (error: string | null) => {
    setError(error)
  }
  
  const updatePagination = (pagination: Partial<{ page: number; limit: number; total: number }>) => {
    setPagination(pagination)
  }
  
  return {
    handleCreateGroup,
    handleJoinGroup,
    handleFormSuccess,
    handleCloseCreateForm,
    handleCloseJoinForm,
    updateGroups,
    updateApiGroups,
    updateLoading,
    updateError,
    updatePagination,
    resetState
  }
}