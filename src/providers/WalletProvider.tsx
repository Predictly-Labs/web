'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface WalletContextType {
  connected: boolean
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
  signMessage: (message: string) => Promise<{ signature: string; publicKey: string }>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export function WalletProvider({ children }: Props) {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [currentWallet, setCurrentWallet] = useState<any>(null)

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
                setCurrentWallet(wallet)
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
              setCurrentWallet(wallet)
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

  const signMessage = async (message: string): Promise<{ signature: string; publicKey: string }> => {
    if (!currentWallet) {
      throw new Error('No wallet connected')
    }

    try {
      let response
      
      if (currentWallet.signMessage) {
        response = await currentWallet.signMessage({
          message,
          nonce: Math.random().toString()
        })
      } else if (currentWallet.sign) {
        response = await currentWallet.sign(message)
      } else {
        throw new Error('Wallet does not support message signing')
      }
      
      // console.log('Raw wallet response:', response)

      
      let signature = ''
      if (typeof response === 'object') {
        if (response.args) {
          if (typeof response.args.signature === 'string') {
            signature = response.args.signature
          } else if (response.args.fullMessage && typeof response.args.fullMessage === 'object') {
            signature = response.args.fullMessage.signature || ''
          } else if (typeof response.args === 'object') {
            const argsKeys = Object.keys(response.args)
            for (const key of argsKeys) {
              if (key.includes('signature') || key.includes('sig')) {
                signature = response.args[key]
                break
              }
            }
          }
        } else if (typeof response.signature === 'string') {
          signature = response.signature  
        } else if (typeof response.signedMessage === 'string') {
          signature = response.signedMessage
        }
      } else if (typeof response === 'string') {
        signature = response
      }
      
      if (!signature && typeof response === 'object') {
        const responseStr = JSON.stringify(response)
        const hexPattern = /0x[a-fA-F0-9]{128,}/g
        const matches = responseStr.match(hexPattern)
        if (matches && matches.length > 0) {
          signature = matches[0]
        }
      }
      
      signature = String(signature).trim()
      
      let publicKey = ''
      if (typeof response === 'object') {
        if (typeof response.publicKey === 'string') {
          publicKey = response.publicKey
        } else if (response.args && typeof response.args.publicKey === 'string') {
          publicKey = response.args.publicKey
        } else if (response.fullMessage && typeof response.fullMessage.publicKey === 'string') {
          publicKey = response.fullMessage.publicKey
        }
      }
      
      if (!publicKey) {
        try {
          const account = await currentWallet.account()
          // console.log('Account data:', account)
          
          if (account.publicKey && typeof account.publicKey === 'string') {
            publicKey = account.publicKey
          } else if (account.authentication_key) {
            publicKey = account.authentication_key.slice(0, 66)
          } else {
            console.warn('No publicKey found in account, using address')
            publicKey = address || ''
          }
        } catch (e) {
          console.error('Failed to get account info:', e)
          publicKey = address || ''
        }
      }
      
      publicKey = String(publicKey || '').trim()
      
      // console.log('Final publicKey length:', publicKey.length)
      // console.log('Final publicKey:', publicKey)
      
      const result = {
        signature: signature,
        publicKey: publicKey
      }
      
      // console.log('Final sign result:', result)
      return result
    } catch (error) {
      console.error('Failed to sign message:', error)
      throw new Error('Failed to sign message')
    }
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
    setCurrentWallet(null)
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
    disconnect,
    signMessage
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