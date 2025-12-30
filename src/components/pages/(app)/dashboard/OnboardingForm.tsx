'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useWallet } from '@/providers/WalletProvider'
import { useAuth } from '@/hooks/useAuth'

interface OnboardingFormProps {
  walletAddress: string
  onSubmit: (data: { signature: string; publicKey: string }) => void
  onDisconnect: () => void
  isLoading: boolean
  error: string | null
}

export const OnboardingForm = ({ walletAddress, onSubmit, onDisconnect, isLoading, error }: OnboardingFormProps) => {
  const [isSigning, setIsSigning] = useState(false)
  const { signMessage } = useWallet()
  const { getSignMessage } = useAuth()


  const handleSignAndLogin = async () => {
    try {
      setIsSigning(true)
      
      const { message } = await getSignMessage(walletAddress)
      
      const signResult = await signMessage(message)
      
      onSubmit({
        signature: signResult.signature,
        publicKey: signResult.publicKey
      })
    } catch (error) {
      console.error('Signing failed:', error)
    } finally {
      setIsSigning(false)
    }
  }

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-4">
          <div className="relative mb-6">
            <div 
              className="relative overflow-hidden rounded-2xl"
              style={{
                backgroundImage: "url('/assets/main/background/bg-main.png')",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-4 p-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-medium text-pink-900">Login to Dashboard</h1>
                    <Image
                      src="/assets/main/icon/dashboard-icon.png"
                      alt="Dashboard Icon"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">Sign message to authenticate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div 
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 max-w-sm w-full mx-4"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.div 
                className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Image
                  src="/assets/logo/logo.png"
                  alt="Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </motion.div>
              
              <button
                onClick={onDisconnect}
                disabled={isLoading}
                className="w-8 h-8 text-gray-300 hover:text-gray-500 transition-colors disabled:opacity-50 flex items-center justify-center rounded-full hover:bg-gray-50 cursor-pointer"
                title="Disconnect"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-6">
              <motion.h2 
                className="text-lg font-medium text-gray-900 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Login with Wallet
              </motion.h2>
              <motion.p 
                className="text-gray-400 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </motion.p>
            </div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-2">Ready to authenticate with your wallet</p>
                <p className="text-xs text-gray-400">You'll be prompted to sign a message to verify ownership</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}

              <button
                onClick={handleSignAndLogin}
                disabled={isLoading || isSigning}
                className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
              >
                {isSigning ? 'Please sign message...' : isLoading ? 'Authenticating...' : 'Sign & Login'}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}