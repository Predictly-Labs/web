import { motion } from 'framer-motion'
import Image from 'next/image'

interface DefiProtocolDisplayProps {
  protocols: Array<{ name: string; logo: string }>
}

export const DefiProtocolDisplay = ({ protocols }: DefiProtocolDisplayProps) => {
  return (
    <div className="flex flex-col gap-3 mt-4 pt-3 border-t border-gray-100">
      <span className="text-gray-500 text-sm">Supported DeFi Protocols</span>
      <div className="flex flex-wrap gap-3">
        {protocols.map((protocol, index) => (
          <motion.div
            key={protocol.name}
            className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-white border border-gray-200">
              <Image
                src={protocol.logo}
                alt={protocol.name}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{protocol.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}