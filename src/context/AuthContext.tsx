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

interface AuthData {
  privyId: string
  walletAddress: string
  displayName: string
  avatarUrl: string
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
  login: (authData: AuthData) => Promise<void>
  logout: () => void
  getProfile: () => Promise<User | null>
  initializeAuth: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (authData: AuthData): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/privy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      })

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`)
      }

      const result: AuthResponse = await response.json()
      
      if (!result.success) {
        throw new Error(result.message)
      }

      setUser(result.data.user)
      setToken(result.data.token)
    
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('authToken', result.data.token)
        sessionStorage.setItem('user', JSON.stringify(result.data.user))
        localStorage.setItem('authToken', result.data.token)
        localStorage.setItem('user', JSON.stringify(result.data.user))
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed'
      setError(errorMessage)
      throw new Error(errorMessage)
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

  const getProfile = useCallback(async (): Promise<User | null> => {
    if (!token) return null

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          logout()
          return null
        }
        throw new Error(`Failed to get profile: ${response.statusText}`)
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get profile'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [token, logout])

  const initializeAuth = useCallback(async () => {
    return new Promise<void>((resolve) => {
      if (typeof window !== 'undefined') {
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
            
            if (sessionStorage.getItem('authToken') !== storedToken) {
              sessionStorage.setItem('authToken', storedToken)
              sessionStorage.setItem('user', storedUser)
            }
          } catch {
            logout()
          }
        } else {
          console.log('AuthContext - initializeAuth: No stored token/user found')
        }
      }
      resolve()
    })
  }, [logout])

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    getProfile,
    initializeAuth,
    isAuthenticated: !!user && !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}