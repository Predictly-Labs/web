import { useSetAtom, useAtomValue } from 'jotai'
import { 
  dashboardStateAtom,
  isInitializedAtom,
  isConnectingAtom,
  isLoadingAtom,
  errorAtom,
  walletConnectedAtom,
  walletAddressAtom,
  isAuthenticatedAtom,
  userAtom,
  tokenAtom,
  profileLoadingAtom,
  setInitializedAtom,
  setConnectingAtom,
  setLoadingAtom,
  setErrorAtom,
  setWalletStateAtom,
  setAuthStateAtom,
  setProfileLoadingAtom,
  logoutAtom
} from '@/store/dashboard'

export const useDashboardState = () => {
  return useAtomValue(dashboardStateAtom)
}

export const useInitialized = () => {
  const isInitialized = useAtomValue(isInitializedAtom)
  const setInitialized = useSetAtom(setInitializedAtom)
  
  return {
    isInitialized,
    setInitialized
  }
}

export const useWalletState = () => {
  const walletConnected = useAtomValue(walletConnectedAtom)
  const walletAddress = useAtomValue(walletAddressAtom)
  const isConnecting = useAtomValue(isConnectingAtom)
  const setConnecting = useSetAtom(setConnectingAtom)
  const setWalletState = useSetAtom(setWalletStateAtom)
  
  return {
    walletConnected,
    walletAddress,
    isConnecting,
    setConnecting,
    setWalletState
  }
}

export const useAuthState = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const user = useAtomValue(userAtom)
  const token = useAtomValue(tokenAtom)
  const setAuthState = useSetAtom(setAuthStateAtom)
  
  return {
    isAuthenticated,
    user,
    token,
    setAuthState
  }
}

export const useProfileLoading = () => {
  const profileLoading = useAtomValue(profileLoadingAtom)
  const setProfileLoading = useSetAtom(setProfileLoadingAtom)
  
  return {
    profileLoading,
    setProfileLoading
  }
}

export const useLoadingState = () => {
  const isLoading = useAtomValue(isLoadingAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  
  return {
    isLoading,
    setLoading
  }
}

export const useErrorState = () => {
  const error = useAtomValue(errorAtom)
  const setError = useSetAtom(setErrorAtom)
  
  return {
    error,
    setError
  }
}

export const useDashboardActions = () => {
  const setInitialized = useSetAtom(setInitializedAtom)
  const setConnecting = useSetAtom(setConnectingAtom)
  const setLoading = useSetAtom(setLoadingAtom)
  const setError = useSetAtom(setErrorAtom)
  const setWalletState = useSetAtom(setWalletStateAtom)
  const setAuthState = useSetAtom(setAuthStateAtom)
  const setProfileLoading = useSetAtom(setProfileLoadingAtom)
  const logout = useSetAtom(logoutAtom)
  
  return {
    setInitialized,
    setConnecting,
    setLoading,
    setError,
    setWalletState,
    setAuthState,
    setProfileLoading,
    logout
  }
}