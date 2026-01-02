import { atom } from 'jotai'

export interface DashboardState {
  isInitialized: boolean
  isConnecting: boolean
  isLoading: boolean
  error: string | null
  walletConnected: boolean
  walletAddress: string | null
  isAuthenticated: boolean
  user: any
  token: string | null
  profileLoading: boolean
}

export const isInitializedAtom = atom(false)
export const isConnectingAtom = atom(false)
export const isLoadingAtom = atom(false)
export const errorAtom = atom<string | null>(null)
export const walletConnectedAtom = atom(false)
export const walletAddressAtom = atom<string | null>(null)
export const isAuthenticatedAtom = atom(false)
export const userAtom = atom<any>(null)
export const tokenAtom = atom<string | null>(null)
export const profileLoadingAtom = atom(false)

export const dashboardStateAtom = atom((get) => ({
  isInitialized: get(isInitializedAtom),
  isConnecting: get(isConnectingAtom),
  isLoading: get(isLoadingAtom),
  error: get(errorAtom),
  walletConnected: get(walletConnectedAtom),
  walletAddress: get(walletAddressAtom),
  isAuthenticated: get(isAuthenticatedAtom),
  user: get(userAtom),
  token: get(tokenAtom),
  profileLoading: get(profileLoadingAtom)
}))

export const setInitializedAtom = atom(
  null,
  (_get, set, initialized: boolean) => {
    set(isInitializedAtom, initialized)
  }
)

export const setConnectingAtom = atom(
  null,
  (_get, set, connecting: boolean) => {
    set(isConnectingAtom, connecting)
    if (connecting) {
      set(errorAtom, null)
    }
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
      set(isConnectingAtom, false)
    }
  }
)

export const setWalletStateAtom = atom(
  null,
  (_get, set, { connected, address }: { connected: boolean; address: string | null }) => {
    set(walletConnectedAtom, connected)
    set(walletAddressAtom, address)
    if (!connected) {
      set(isAuthenticatedAtom, false)
      set(userAtom, null)
      set(tokenAtom, null)
    }
  }
)

export const setAuthStateAtom = atom(
  null,
  (_get, set, { authenticated, user, token }: { authenticated: boolean; user: any; token: string | null }) => {
    set(isAuthenticatedAtom, authenticated)
    set(userAtom, user)
    set(tokenAtom, token)
    set(profileLoadingAtom, false)
    if (!authenticated) {
      set(userAtom, null)
      set(tokenAtom, null)
    }
  }
)

export const setProfileLoadingAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(profileLoadingAtom, loading)
  }
)

export const logoutAtom = atom(
  null,
  (_get, set) => {
    set(isAuthenticatedAtom, false)
    set(userAtom, null)
    set(tokenAtom, null)
    set(walletConnectedAtom, false)
    set(walletAddressAtom, null)
    set(errorAtom, null)
    set(profileLoadingAtom, false)
  }
)