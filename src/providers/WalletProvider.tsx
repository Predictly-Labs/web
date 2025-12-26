'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface WalletContextType {
  connected: boolean
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export function WalletProvider({ children }: Props) {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const walletProviders = [
          () => (window as any).nightly?.aptos,
          () => (window as any).aptos,
          () => (window as any).petra,
          () => (window as any).martian
        ]
        
        for (const getWallet of walletProviders) {
          try {
            const wallet = getWallet()
            if (wallet) {
              const account = await wallet.account()
              if (account) {
                setAddress(account.address)
                setConnected(true)
                return
              }
            }
          } catch (error) {
            console.log('No existing connection for this provider')
          }
        }
      }
    }
    checkConnection()
  }, [])

  const connect = async () => {
    try {
      if (typeof window !== 'undefined') {
        const walletProviders = [
          { name: 'Nightly', wallet: () => (window as any).nightly?.aptos },
          { name: 'Generic Aptos', wallet: () => (window as any).aptos },
          { name: 'Petra', wallet: () => (window as any).petra },
          { name: 'Martian', wallet: () => (window as any).martian }
        ]
        
        for (const provider of walletProviders) {
          try {
            const wallet = provider.wallet()
            if (wallet) {
              const response = await wallet.connect()
              setAddress(response.address)
              setConnected(true)
              return
            }
          } catch (error) {
            console.log(`Failed to connect with ${provider.name}:`, error)
          }
        }
        
        alert('No compatible Aptos wallet found. Please install Nightly, Petra, or Martian wallet.')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    }
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
    if (typeof window !== 'undefined') {
      const walletProviders = [
        () => (window as any).nightly?.aptos,
        () => (window as any).aptos,
        () => (window as any).petra,
        () => (window as any).martian
      ]
      
      for (const getWallet of walletProviders) {
        try {
          const wallet = getWallet()
          if (wallet && wallet.disconnect) {
            wallet.disconnect()
          }
        } catch (error) {
          console.log('Error disconnecting wallet:', error)
        }
      }
    }
  }

  const value = {
    connected,
    address,
    connect,
    disconnect
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}