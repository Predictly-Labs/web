'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import api from '@/lib/api';
import type { User, ApiResponse } from '@/types/api';
import type { LoginInput } from '@/types/requests';

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
const isPrivyEnabled = PRIVY_APP_ID && PRIVY_APP_ID !== 'your_privy_app_id_here' && PRIVY_APP_ID.length > 10;

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  login: () => Promise<void>;
  loginDemo: (privyId: string, walletAddress?: string, displayName?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo mode provider (when Privy is not configured)
function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async () => {
    console.warn('[Auth] Privy not configured. Use loginDemo() for testing.');
  }, []);

  const loginDemo = useCallback(async (privyId: string, walletAddress?: string, displayName?: string) => {
    setIsLoading(true);
    try {
      const loginData: LoginInput = { privyId, walletAddress, displayName };
      const response = await api.post<ApiResponse<{ user: User; token: string }>>(
        '/api/users/auth/privy',
        loginData
      );
      if (response.data.success) {
        const { user: userData, token: newToken } = response.data.data;
        setUser(userData);
        setToken(newToken);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Demo login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    try {
      const response = await api.get<ApiResponse<User>>('/api/users/me');
      if (response.data.success) {
        setUser(response.data.data);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAuthenticated: !!user && !!token, isDemoMode: true, login, loginDemo, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Full Privy provider - uses usePrivy hook properly
function PrivyAuthProviderInner({ children }: { children: React.ReactNode }) {
  const { ready, authenticated, user: privyUser, login: privyLogin, logout: privyLogout } = usePrivy();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const syncAuth = async () => {
      if (authenticated && privyUser) {
        try {
          const walletAddress = privyUser.wallet?.address;
          const loginData: LoginInput = {
            privyId: privyUser.id,
            walletAddress,
            displayName: privyUser.email?.address?.split('@')[0],
          };
          const response = await api.post<ApiResponse<{ user: User; token: string }>>('/api/users/auth/privy', loginData);
          if (response.data.success) {
            const { user: userData, token: newToken } = response.data.data;
            setUser(userData);
            setToken(newToken);
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Failed to sync auth with backend:', error);
        }
      } else if (!authenticated) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    };
    syncAuth();
  }, [ready, authenticated, privyUser]);

  const login = useCallback(async () => { privyLogin(); }, [privyLogin]);
  const loginDemo = useCallback(async () => { console.warn('Use Privy login instead'); }, []);
  const logout = useCallback(() => {
    privyLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, [privyLogout]);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    try {
      const response = await api.get<ApiResponse<User>>('/api/users/me');
      if (response.data.success) {
        setUser(response.data.data);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading: isLoading || !ready, isAuthenticated: !!user && !!token, isDemoMode: false, login, loginDemo, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Main AuthProvider - chooses between Demo and Privy based on config
export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!isPrivyEnabled) {
    return <DemoAuthProvider>{children}</DemoAuthProvider>;
  }
  return <PrivyAuthProviderInner>{children}</PrivyAuthProviderInner>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
