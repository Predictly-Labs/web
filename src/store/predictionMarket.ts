import { atom } from 'jotai'

export interface MarketFormData {
  title: string
  description: string
  endDate: string
  endTime: string
  poolSize: string
  category: string
  isPrivate: boolean
}

export interface PredictionFormData {
  groupId: string
  title: string
  description: string
  imageUrl: string
  marketType: 'STANDARD' | 'NO_LOSS'
  endDate: string
  minStake: number | string
  maxStake: number | string
}

export interface MarketData {
  id: string
  title: string
  description: string
  creator: string
  createdAt: string
  endDate: string
  totalPool: number
  participants: number
  status: 'active' | 'closed' | 'pending'
  category: string
  myPosition?: string
  currentOdds?: number
  groupImage?: string
  groupName?: string
  creatorAvatar?: string
  yesVotes?: number
  noVotes?: number
  yesPercentage?: number
  noPercentage?: number
}

export interface PredictionMarketState {
  predictions: any[]
  markets: MarketData[]
  isLoading: boolean
  error: string | null
  showCreateForm: boolean
  createFormData: PredictionFormData
  imageFile: File | null
  previewUrl: string
  isGroupDropdownOpen: boolean
  isCreating: boolean
  createError: string | null
  activeCurrentPage: number
  closedCurrentPage: number
  groups: any[]
  groupsLoading: boolean
  groupsError: string | null
}

export const predictionsAtom = atom<any[]>([])
export const marketsAtom = atom<MarketData[]>([])
export const isLoadingAtom = atom(false)
export const errorAtom = atom<string | null>(null)
export const showCreateFormAtom = atom(false)
export const createFormDataAtom = atom<PredictionFormData>({
  groupId: '',
  title: '',
  description: '',
  imageUrl: '',
  marketType: 'STANDARD',
  endDate: '',
  minStake: '',
  maxStake: ''
})
export const imageFileAtom = atom<File | null>(null)
export const previewUrlAtom = atom('')
export const isGroupDropdownOpenAtom = atom(false)
export const isCreatingAtom = atom(false)
export const createErrorAtom = atom<string | null>(null)
export const activeCurrentPageAtom = atom(1)
export const closedCurrentPageAtom = atom(1)
export const groupsAtom = atom<any[]>([])
export const groupsLoadingAtom = atom(false)
export const groupsErrorAtom = atom<string | null>(null)

export const predictionMarketStateAtom = atom((get) => ({
  predictions: get(predictionsAtom),
  markets: get(marketsAtom),
  isLoading: get(isLoadingAtom),
  error: get(errorAtom),
  showCreateForm: get(showCreateFormAtom),
  createFormData: get(createFormDataAtom),
  imageFile: get(imageFileAtom),
  previewUrl: get(previewUrlAtom),
  isGroupDropdownOpen: get(isGroupDropdownOpenAtom),
  isCreating: get(isCreatingAtom),
  createError: get(createErrorAtom),
  activeCurrentPage: get(activeCurrentPageAtom),
  closedCurrentPage: get(closedCurrentPageAtom),
  groups: get(groupsAtom),
  groupsLoading: get(groupsLoadingAtom),
  groupsError: get(groupsErrorAtom)
}))

export const transformedMarketsAtom = atom((get) => {
  const predictions = get(predictionsAtom)
  const propMarkets = get(marketsAtom)
  
  if (propMarkets.length > 0) return propMarkets
  
  return predictions.map(prediction => ({
    id: prediction.id,
    title: prediction.title,
    description: prediction.description,
    creator: prediction.creator?.displayName || 'User',
    createdAt: prediction.createdAt,
    endDate: prediction.endDate,
    totalPool: prediction.totalVolume || 0,
    participants: prediction.participantCount || 0,
    status: prediction.status?.toLowerCase() as 'active' | 'closed' | 'pending',
    category: prediction.marketType,
    groupImage: prediction.imageUrl,
    groupName: prediction.group?.name || 'Unknown Group',
    creatorAvatar: prediction.creator?.avatarUrl,
    yesVotes: prediction.yesPool || 0,
    noVotes: prediction.noPool || 0,
    yesPercentage: prediction.yesPercentage || 50,
    noPercentage: prediction.noPercentage || 50
  }))
})

export const activeMarketsAtom = atom((get) => {
  const markets = get(transformedMarketsAtom)
  return markets.filter(market => market.status === 'active')
})

export const closedMarketsAtom = atom((get) => {
  const markets = get(transformedMarketsAtom)
  return markets.filter(market => market.status === 'closed')
})

export const paginatedActiveMarketsAtom = atom((get) => {
  const activeMarkets = get(activeMarketsAtom)
  const currentPage = get(activeCurrentPageAtom)
  const ITEMS_PER_PAGE = 9
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  return activeMarkets.slice(startIndex, endIndex)
})

export const paginatedClosedMarketsAtom = atom((get) => {
  const closedMarkets = get(closedMarketsAtom)
  const currentPage = get(closedCurrentPageAtom)
  const ITEMS_PER_PAGE = 9
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  return closedMarkets.slice(startIndex, endIndex)
})

export const activeTotalPagesAtom = atom((get) => {
  const activeMarkets = get(activeMarketsAtom)
  const ITEMS_PER_PAGE = 9
  return Math.ceil(activeMarkets.length / ITEMS_PER_PAGE)
})

export const closedTotalPagesAtom = atom((get) => {
  const closedMarkets = get(closedMarketsAtom)
  const ITEMS_PER_PAGE = 9
  return Math.ceil(closedMarkets.length / ITEMS_PER_PAGE)
})

export const selectedGroupAtom = atom((get) => {
  const groups = get(groupsAtom)
  const formData = get(createFormDataAtom)
  return groups.find(group => group.id === formData.groupId)
})

export const setPredictionsAtom = atom(
  null,
  (_get, set, predictions: any[]) => {
    set(predictionsAtom, predictions)
  }
)

export const setMarketsAtom = atom(
  null,
  (_get, set, markets: MarketData[]) => {
    set(marketsAtom, markets)
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
    if (!show) {
      set(createFormDataAtom, {
        groupId: '',
        title: '',
        description: '',
        imageUrl: '',
        marketType: 'STANDARD',
        endDate: '',
        minStake: '',
        maxStake: ''
      })
      set(imageFileAtom, null)
      set(previewUrlAtom, '')
      set(isGroupDropdownOpenAtom, false)
      set(createErrorAtom, null)
    }
  }
)

export const setCreateFormDataAtom = atom(
  null,
  (_get, set, formData: PredictionFormData) => {
    set(createFormDataAtom, formData)
  }
)

export const updateCreateFormDataAtom = atom(
  null,
  (get, set, update: Partial<PredictionFormData>) => {
    const currentForm = get(createFormDataAtom)
    set(createFormDataAtom, { ...currentForm, ...update })
  }
)

export const setImageFileAtom = atom(
  null,
  (_get, set, file: File | null) => {
    set(imageFileAtom, file)
  }
)

export const setPreviewUrlAtom = atom(
  null,
  (_get, set, url: string) => {
    set(previewUrlAtom, url)
  }
)

export const setGroupDropdownOpenAtom = atom(
  null,
  (_get, set, open: boolean | ((prev: boolean) => boolean)) => {
    if (typeof open === 'function') {
      const currentValue = _get(isGroupDropdownOpenAtom)
      set(isGroupDropdownOpenAtom, open(currentValue))
    } else {
      set(isGroupDropdownOpenAtom, open)
    }
  }
)

export const setCreatingAtom = atom(
  null,
  (_get, set, creating: boolean) => {
    set(isCreatingAtom, creating)
    if (creating) {
      set(createErrorAtom, null)
    }
  }
)

export const setCreateErrorAtom = atom(
  null,
  (_get, set, error: string | null) => {
    set(createErrorAtom, error)
    if (error) {
      set(isCreatingAtom, false)
    }
  }
)

export const setActiveCurrentPageAtom = atom(
  null,
  (_get, set, page: number) => {
    set(activeCurrentPageAtom, page)
  }
)

export const setClosedCurrentPageAtom = atom(
  null,
  (_get, set, page: number) => {
    set(closedCurrentPageAtom, page)
  }
)

export const setGroupsAtom = atom(
  null,
  (_get, set, groups: any[]) => {
    set(groupsAtom, groups)
  }
)

export const setGroupsLoadingAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(groupsLoadingAtom, loading)
    if (loading) {
      set(groupsErrorAtom, null)
    }
  }
)

export const setGroupsErrorAtom = atom(
  null,
  (_get, set, error: string | null) => {
    set(groupsErrorAtom, error)
    if (error) {
      set(groupsLoadingAtom, false)
    }
  }
)

export const resetPredictionMarketStateAtom = atom(
  null,
  (_get, set) => {
    set(predictionsAtom, [])
    set(marketsAtom, [])
    set(isLoadingAtom, false)
    set(errorAtom, null)
    set(showCreateFormAtom, false)
    set(createFormDataAtom, {
      groupId: '',
      title: '',
      description: '',
      imageUrl: '',
      marketType: 'STANDARD',
      endDate: '',
      minStake: '',
      maxStake: ''
    })
    set(imageFileAtom, null)
    set(previewUrlAtom, '')
    set(isGroupDropdownOpenAtom, false)
    set(isCreatingAtom, false)
    set(createErrorAtom, null)
    set(activeCurrentPageAtom, 1)
    set(closedCurrentPageAtom, 1)
    set(groupsAtom, [])
    set(groupsLoadingAtom, false)
    set(groupsErrorAtom, null)
  }
)