import { useEffect, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

interface AnimatedYieldProps {
  targetYield: number
}

export const AnimatedYield = ({ targetYield }: AnimatedYieldProps) => {
  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState('0.0000')

  useEffect(() => {
    const controls = animate(count, targetYield, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(4))
      }
    })
    return controls.stop
  }, [count, targetYield])

  return (
    <motion.span 
      className="text-gray-900 font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayValue}%
    </motion.span>
  )
}