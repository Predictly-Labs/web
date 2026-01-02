import { atom } from 'jotai'

export interface CardState {
  isLoading: boolean
  error: string | null
  data: any
}

export interface DashboardCardsState {
  prediction: CardState
  activity: CardState
  balance: CardState
  myPredictionMarket: CardState
  defi: CardState
  group: CardState
}

const createCardAtom = (defaultData: any = null) => ({
  isLoading: atom(false),
  error: atom<string | null>(null),
  data: atom(defaultData)
})

export const predictionCardAtom = createCardAtom()
export const activityCardAtom = createCardAtom([])
export const balanceCardAtom = createCardAtom({ balance: 0, currency: 'MOVE' })
export const myPredictionMarketCardAtom = createCardAtom([])
export const defiCardAtom = createCardAtom({ protocols: [], totalValue: 0 })
export const groupCardAtom = createCardAtom([])

export const dashboardCardsStateAtom = atom((get) => ({
  prediction: {
    isLoading: get(predictionCardAtom.isLoading),
    error: get(predictionCardAtom.error),
    data: get(predictionCardAtom.data)
  },
  activity: {
    isLoading: get(activityCardAtom.isLoading),
    error: get(activityCardAtom.error),
    data: get(activityCardAtom.data)
  },
  balance: {
    isLoading: get(balanceCardAtom.isLoading),
    error: get(balanceCardAtom.error),
    data: get(balanceCardAtom.data)
  },
  myPredictionMarket: {
    isLoading: get(myPredictionMarketCardAtom.isLoading),
    error: get(myPredictionMarketCardAtom.error),
    data: get(myPredictionMarketCardAtom.data)
  },
  defi: {
    isLoading: get(defiCardAtom.isLoading),
    error: get(defiCardAtom.error),
    data: get(defiCardAtom.data)
  },
  group: {
    isLoading: get(groupCardAtom.isLoading),
    error: get(groupCardAtom.error),
    data: get(groupCardAtom.data)
  }
}))

export const setCardStateAtom = atom(
  null,
  (_get, set, { 
    card, 
    isLoading, 
    error, 
    data 
  }: { 
    card: keyof DashboardCardsState
    isLoading?: boolean
    error?: string | null
    data?: any 
  }) => {
    const cardAtoms = {
      prediction: predictionCardAtom,
      activity: activityCardAtom,
      balance: balanceCardAtom,
      myPredictionMarket: myPredictionMarketCardAtom,
      defi: defiCardAtom,
      group: groupCardAtom
    }
    
    const cardAtom = cardAtoms[card]
    if (!cardAtom) return
    
    if (isLoading !== undefined) {
      set(cardAtom.isLoading, isLoading)
    }
    if (error !== undefined) {
      set(cardAtom.error, error)
    }
    if (data !== undefined) {
      set(cardAtom.data, data)
    }
  }
)