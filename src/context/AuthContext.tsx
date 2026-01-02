'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface User {
  id: string
  privyId: string
  walletAddress: string
  displayName: string
  avatarUrl: string
  totalPredictions: number
  correctPredictions: number
  totalEarnings: number
  currentStreak: number
  isPro: boolean
  proExpiresAt: string | null
  createdAt: string
  updatedAt: string
}

interface WalletMessageResponse {
  success: boolean
  data: {
    message: string
    nonce: string
    expiresAt: string
  }
}

interface AuthData {
  walletAddress: string
  signature: string
  publicKey: string
  message: string
}

interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
  }
}

interface ProfileResponse {
  success: boolean
  message: string
  data: {
    user: User
  }
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  getSignMessage: (walletAddress: string) => Promise<{ message: string; nonce: string }>
  login: (authData: AuthData) => Promise<void>
  logout: () => void
  getProfile: () => Promise<User | null>
  updateUserState: (userData: Partial<User>) => void
  initializeAuth: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getSignMessage = useCallback(async (walletAddress: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/wallet/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const result: WalletMessageResponse = await response.json()

      if (!result.success) {
        throw new Error('Failed to get sign message')
      }

      return {
        message: result.data.message,
        nonce: result.data.nonce,
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to get sign message'
      setError(msg)
      throw new Error(msg)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (authData: AuthData) => {
    setIsLoading(true)
    setError(null)

    try {
      // console.log('AuthContext - signature type:', typeof authData.signature)
      // console.log('AuthContext - signature value:', authData.signature)
      // console.log('AuthContext - publicKey type:', typeof authData.publicKey)
      // console.log('AuthContext - publicKey value:', authData.publicKey)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/wallet/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      })

      const result: AuthResponse = await response.json()
      // console.log('AuthContext - API Response:', result)

      if (!response.ok || !result.success) {
        console.error('AuthContext - API Error:', {
          status: response.status,
          statusText: response.statusText,
          result
        })
        throw new Error(result.message || 'Authentication failed')
      }

      setUser(result.data.user)
      setToken(result.data.token)

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('authToken', result.data.token)
        sessionStorage.setItem('user', JSON.stringify(result.data.user))
        localStorage.setItem('authToken', result.data.token)
        localStorage.setItem('user', JSON.stringify(result.data.user))
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Authentication failed'
      setError(msg)
      throw new Error(msg)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    setError(null)

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken')
      sessionStorage.removeItem('user')
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  }, [])

  const getProfile = useCallback(async () => {
    if (!token) return null

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          logout()
          return null
        }
        throw new Error(response.statusText)
      }

      const result: ProfileResponse = await response.json()

      if (!result.success) {
        throw new Error(result.message)
      }

      setUser(result.data.user)

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify(result.data.user))
        localStorage.setItem('user', JSON.stringify(result.data.user))
      }

      return result.data.user
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to get profile'
      setError(msg)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token, logout])

  const updateUserState = useCallback((userData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null
      
      const updatedUser = { ...prevUser, ...userData }
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify(updatedUser))
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
      
      return updatedUser
    })
  }, [])

  const initializeAuth = useCallback(async () => {
    if (typeof window === 'undefined') return

    let storedToken = sessionStorage.getItem('authToken')
    let storedUser = sessionStorage.getItem('user')

    if (!storedToken || !storedUser) {
      storedToken = localStorage.getItem('authToken')
      storedUser = localStorage.getItem('user')
    }

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
        sessionStorage.setItem('authToken', storedToken)
        sessionStorage.setItem('user', storedUser)
      } catch {
        logout()
      }
    }
  }, [logout])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    error,
    getSignMessage,
    login,
    logout,
    getProfile,
    updateUserState,
    initializeAuth,
    isAuthenticated: !!user && !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
