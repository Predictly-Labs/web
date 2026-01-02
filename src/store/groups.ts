import { atom } from 'jotai'
import { GroupData, ApiGroup } from '@/types/group'

export interface GroupsState {
  groups: GroupData[]
  apiGroups: ApiGroup[]
  isLoading: boolean
  error: string | null
  showCreateForm: boolean
  showJoinForm: boolean
  pagination: {
    page: number
    limit: number
    total: number
  }
}

export const groupsAtom = atom<GroupData[]>([])
export const apiGroupsAtom = atom<ApiGroup[]>([])
export const isLoadingAtom = atom(false)
export const errorAtom = atom<string | null>(null)
export const showCreateFormAtom = atom(false)
export const showJoinFormAtom = atom(false)
export const paginationAtom = atom({
  page: 1,
  limit: 20,
  total: 0
})

export const groupsStateAtom = atom((get) => ({
  groups: get(groupsAtom),
  apiGroups: get(apiGroupsAtom),
  isLoading: get(isLoadingAtom),
  error: get(errorAtom),
  showCreateForm: get(showCreateFormAtom),
  showJoinForm: get(showJoinFormAtom),
  pagination: get(paginationAtom)
}))

export const setGroupsAtom = atom(
  null,
  (_get, set, groups: GroupData[]) => {
    set(groupsAtom, groups)
  }
)

export const setApiGroupsAtom = atom(
  null,
  (_get, set, apiGroups: ApiGroup[]) => {
    set(apiGroupsAtom, apiGroups)
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

export const setShowCreateFormAtom = atom(
  null,
  (_get, set, show: boolean) => {
    set(showCreateFormAtom, show)
    if (show) {
      set(showJoinFormAtom, false)
    }
  }
)

export const setShowJoinFormAtom = atom(
  null,
  (_get, set, show: boolean) => {
    set(showJoinFormAtom, show)
    if (show) {
      set(showCreateFormAtom, false)
    }
  }
)

export const setPaginationAtom = atom(
  null,
  (_get, set, pagination: Partial<{ page: number; limit: number; total: number }>) => {
    set(paginationAtom, (prev) => ({ ...prev, ...pagination }))
  }
)

export const transformedGroupsAtom = atom((get) => {
  const groups = get(groupsAtom)
  const apiGroups = get(apiGroupsAtom)
  
  if (groups.length > 0) {
    return groups
  }
  
  return apiGroups.map((group): GroupData => {
    const memberCount = group.stats?.memberCount || group._count?.members || 0
    const activeMarkets = group.stats?.activeMarkets || group._count?.markets || 0
    const totalVolume = group.stats?.totalVolume || 0

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      avatar: group.iconUrl || "/assets/logo/logo.png",
      memberCount,
      activeMarkets,
      totalVolume,
      owner: "Group Owner",
      members: [],
      createdAt: group.createdAt,
      isPrivate: !group.isPublic,
      markets: [],
      iconUrl: group.iconUrl,
      inviteCode: undefined,
      isPublic: group.isPublic,
      createdById: undefined,
      updatedAt: undefined,
      createdBy: undefined,
      _count: group._count,
      userRole: undefined,
      isMember: false,
      stats: {
        memberCount,
        activeMarkets,
        totalVolume,
      },
    }
  })
})

export const resetGroupsStateAtom = atom(
  null,
  (_get, set) => {
    set(groupsAtom, [])
    set(apiGroupsAtom, [])
    set(isLoadingAtom, false)
    set(errorAtom, null)
    set(showCreateFormAtom, false)
    set(showJoinFormAtom, false)
    set(paginationAtom, { page: 1, limit: 20, total: 0 })
  }
)