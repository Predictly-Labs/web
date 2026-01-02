import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const LiveYieldCounter = () => {
  const [currentYield, setCurrentYield] = useState(0.0001)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYield(prev => {
        const increment = Math.random() * 0.000005 + 0.000001
        return prev + increment
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="flex justify-between items-center py-2 border-t border-gray-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <span className="text-gray-500">Live Yield</span>
      <div className="flex items-center gap-1">
        <motion.span 
          className="text-green-600 font-medium"
          key={currentYield}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          +{currentYield.toFixed(6)}
        </motion.span>
        <Image
          src="/assets/logo/logo-coin/move-logo.jpeg"
          alt="Move Token"
          width={14}
          height={14}
          className="rounded-full"
        />
      </div>
    </motion.div>
  )
}