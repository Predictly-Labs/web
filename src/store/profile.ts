import { atom } from 'jotai'

export interface ActivityData {
  day: string
  value: number
}

export interface EditForm {
  displayName: string
  avatarUrl: string
}

export interface ProfileState {
  userStats: any
  groups: any[]
  myVotes: any[]
  votesStats: any
  moveBalance: any
  activeTab: 'positions' | 'activity'
  activeFilter: 'active' | 'closed'
  isEditModalOpen: boolean
  editForm: EditForm
  previewUrl: string
  selectedFile: File | null
  searchQuery: string
  isLoadingUserStats: boolean
  isLoadingGroups: boolean
  isLoadingVotes: boolean
  isLoadingVotesStats: boolean
  isLoadingBalance: boolean
  isUpdatingProfile: boolean
  updateError: string | null
}

export const userStatsAtom = atom<any>(null)
export const groupsAtom = atom<any[]>([])
export const myVotesAtom = atom<any[]>([])
export const votesStatsAtom = atom<any>(null)
export const moveBalanceAtom = atom<any>(null)
export const activeTabAtom = atom<'positions' | 'activity'>('positions')
export const activeFilterAtom = atom<'active' | 'closed'>('active')
export const isEditModalOpenAtom = atom(false)
export const editFormAtom = atom<EditForm>({ displayName: '', avatarUrl: '' })
export const previewUrlAtom = atom('')
export const selectedFileAtom = atom<File | null>(null)
export const searchQueryAtom = atom('')
export const isLoadingUserStatsAtom = atom(false)
export const isLoadingGroupsAtom = atom(false)
export const isLoadingVotesAtom = atom(false)
export const isLoadingVotesStatsAtom = atom(false)
export const isLoadingBalanceAtom = atom(false)
export const isUpdatingProfileAtom = atom(false)
export const updateErrorAtom = atom<string | null>(null)

export const profileStateAtom = atom((get) => ({
  userStats: get(userStatsAtom),
  groups: get(groupsAtom),
  myVotes: get(myVotesAtom),
  votesStats: get(votesStatsAtom),
  moveBalance: get(moveBalanceAtom),
  activeTab: get(activeTabAtom),
  activeFilter: get(activeFilterAtom),
  isEditModalOpen: get(isEditModalOpenAtom),
  editForm: get(editFormAtom),
  previewUrl: get(previewUrlAtom),
  selectedFile: get(selectedFileAtom),
  searchQuery: get(searchQueryAtom),
  isLoadingUserStats: get(isLoadingUserStatsAtom),
  isLoadingGroups: get(isLoadingGroupsAtom),
  isLoadingVotes: get(isLoadingVotesAtom),
  isLoadingVotesStats: get(isLoadingVotesStatsAtom),
  isLoadingBalance: get(isLoadingBalanceAtom),
  isUpdatingProfile: get(isUpdatingProfileAtom),
  updateError: get(updateErrorAtom)
}))

export const filteredVotesAtom = atom((get) => {
  const myVotes = get(myVotesAtom)
  const activeFilter = get(activeFilterAtom)
  const searchQuery = get(searchQueryAtom).toLowerCase()
  
  let filtered = myVotes.filter(vote => {
    if (activeFilter === 'active') {
      return vote.market.status.toLowerCase() === 'active'
    } else {
      return vote.market.status.toLowerCase() === 'closed'
    }
  })
  
  if (searchQuery) {
    filtered = filtered.filter(vote => 
      vote.market.title.toLowerCase().includes(searchQuery) ||
      vote.market.marketType.toLowerCase().includes(searchQuery)
    )
  }
  
  return filtered
})

export const recentActivityAtom = atom((get) => {
  const myVotes = get(myVotesAtom)
  return myVotes.slice(0, 10)
})

export const groupsLimitedAtom = atom((get) => {
  const groups = get(groupsAtom)
  return groups.slice(0, 3)
})

export const hasMoreGroupsAtom = atom((get) => {
  const groups = get(groupsAtom)
  return groups.length > 3
})

export const setUserStatsAtom = atom(
  null,
  (_get, set, stats: any) => {
    set(userStatsAtom, stats)
  }
)

export const setGroupsAtom = atom(
  null,
  (_get, set, groups: any[]) => {
    set(groupsAtom, groups)
  }
)

export const setMyVotesAtom = atom(
  null,
  (_get, set, votes: any[]) => {
    set(myVotesAtom, votes)
  }
)

export const setVotesStatsAtom = atom(
  null,
  (_get, set, stats: any) => {
    set(votesStatsAtom, stats)
  }
)

export const setMoveBalanceAtom = atom(
  null,
  (_get, set, balance: any) => {
    set(moveBalanceAtom, balance)
  }
)

export const setActiveTabAtom = atom(
  null,
  (_get, set, tab: 'positions' | 'activity') => {
    set(activeTabAtom, tab)
  }
)

export const setActiveFilterAtom = atom(
  null,
  (_get, set, filter: 'active' | 'closed') => {
    set(activeFilterAtom, filter)
  }
)

export const setEditModalOpenAtom = atom(
  null,
  (_get, set, open: boolean) => {
    set(isEditModalOpenAtom, open)
    if (!open) {
      set(previewUrlAtom, '')
      set(selectedFileAtom, null)
    }
  }
)

export const setEditFormAtom = atom(
  null,
  (_get, set, form: EditForm) => {
    set(editFormAtom, form)
  }
)

export const updateEditFormAtom = atom(
  null,
  (get, set, update: Partial<EditForm>) => {
    const currentForm = get(editFormAtom)
    set(editFormAtom, { ...currentForm, ...update })
  }
)

export const setPreviewUrlAtom = atom(
  null,
  (_get, set, url: string) => {
    set(previewUrlAtom, url)
  }
)

export const setSelectedFileAtom = atom(
  null,
  (_get, set, file: File | null) => {
    set(selectedFileAtom, file)
  }
)

export const setSearchQueryAtom = atom(
  null,
  (_get, set, query: string) => {
    set(searchQueryAtom, query)
  }
)

export const setLoadingUserStatsAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(isLoadingUserStatsAtom, loading)
  }
)

export const setLoadingGroupsAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(isLoadingGroupsAtom, loading)
  }
)

export const setLoadingVotesAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(isLoadingVotesAtom, loading)
  }
)

export const setLoadingVotesStatsAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(isLoadingVotesStatsAtom, loading)
  }
)

export const setLoadingBalanceAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(isLoadingBalanceAtom, loading)
  }
)

export const setUpdatingProfileAtom = atom(
  null,
  (_get, set, updating: boolean) => {
    set(isUpdatingProfileAtom, updating)
    if (updating) {
      set(updateErrorAtom, null)
    }
  }
)

export const setUpdateErrorAtom = atom(
  null,
  (_get, set, error: string | null) => {
    set(updateErrorAtom, error)
    if (error) {
      set(isUpdatingProfileAtom, false)
    }
  }
)

export const resetProfileStateAtom = atom(
  null,
  (_get, set) => {
    set(userStatsAtom, null)
    set(groupsAtom, [])
    set(myVotesAtom, [])
    set(votesStatsAtom, null)
    set(moveBalanceAtom, null)
    set(activeTabAtom, 'positions')
    set(activeFilterAtom, 'active')
    set(isEditModalOpenAtom, false)
    set(editFormAtom, { displayName: '', avatarUrl: '' })
    set(previewUrlAtom, '')
    set(selectedFileAtom, null)
    set(searchQueryAtom, '')
    set(isLoadingUserStatsAtom, false)
    set(isLoadingGroupsAtom, false)
    set(isLoadingVotesAtom, false)
    set(isLoadingVotesStatsAtom, false)
    set(isLoadingBalanceAtom, false)
    set(isUpdatingProfileAtom, false)
    set(updateErrorAtom, null)
  }
)