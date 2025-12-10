"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Image from 'next/image';
import fullDegenAnimation from '../../../../../public/assets/main/animation/full-degen-animation.json';
import noRiskAnimation from '../../../../../public/assets/main/animation/no-risk-animation.json';

export type RiskType = 'full' | 'zero';

interface RiskSelectionStepProps {
  onNext: (riskType: RiskType) => void;
  onBack: () => void;
}

export const RiskSelectionStep: React.FC<RiskSelectionStepProps> = ({
  onNext,
  onBack
}) => {
  const [selectedRisk, setSelectedRisk] = useState<RiskType | null>(null);

  const handleNext = () => {
    if (selectedRisk) {
      onNext(selectedRisk);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Choose Your Risk Level
        </h3>
        <p className="text-gray-600">
          Select the trading mode for your prediction market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          onClick={() => setSelectedRisk('full')}
          className={`relative p-8 rounded-3xl cursor-pointer transition-all overflow-hidden ${
            selectedRisk === 'full'
              ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white border-4 border-yellow-400'
              : 'bg-white border-2 border-gray-200 hover:border-yellow-300 hover:shadow-lg'
          }`}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                selectedRisk === 'full' ? '' : ''
              }`}>
                <Lottie 
                  animationData={fullDegenAnimation} 
                  loop={true} 
                  className="w-20 h-20"
                />
              </div>
              {/* <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedRisk === 'full'
                  ? 'border-white bg-white'
                  : 'border-gray-300'
              }`}>
                {selectedRisk === 'full' && (
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                )}
              </div> */}
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className={`text-2xl font-bold mb-2 ${
                  selectedRisk === 'full' ? 'text-white' : 'text-gray-900'
                }`}>
                  Degen Mode
                </h4>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedRisk === 'full' 
                    ? 'bg-white/20 text-white' 
                    : 'text-yellow-700 border-yellow-500 border'
                }`}>
                  <div className="flex items-center -space-x-1">
                    <Image src="/assets/logo/defi-protocol-logo/Canopy.jpg" alt="Canopy" width={16} height={16} className="rounded-full" />
                    <Image src="/assets/logo/defi-protocol-logo/Layer Bank.jpg" alt="Layer Bank" width={16} height={16} className="rounded-full" />
                    <Image src="/assets/logo/defi-protocol-logo/MovePosition.jpg" alt="MovePosition" width={16} height={16} className="rounded-full" />
                  </div>
                  Principal & yield from DeFi
                </div>
              </div>
              
              <p className={`text-sm leading-relaxed ${
                selectedRisk === 'full' ? 'text-white/90' : 'text-gray-600'
              }`}>
                Maximum risk, maximum reward. Your principal and DeFi yield are both at stake.
              </p>
            </div>
          </div>
          
          {selectedRisk === 'full' && (
            <div className="absolute inset-0 bg-yellow-500 to-white/10" />
          )}
        </motion.div>

        <motion.div
          onClick={() => setSelectedRisk('zero')}
          className={`relative p-8 rounded-3xl cursor-pointer transition-all overflow-hidden ${
            selectedRisk === 'zero'
              ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white border-4 border-green-400'
              : 'bg-white border-2 border-gray-200 hover:border-green-300 hover:shadow-lg'
          }`}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                selectedRisk === 'zero' ? '' : ''
              }`}>
                <Lottie 
                  animationData={noRiskAnimation} 
                  loop={true} 
                  className="w-20 h-20"
                />
              </div>
              {/* <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedRisk === 'zero'
                  ? 'border-white bg-white'
                  : 'border-gray-300'
              }`}>
                {selectedRisk === 'zero' && (
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                )}
              </div> */}
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className={`text-2xl font-bold mb-2 ${
                  selectedRisk === 'zero' ? 'text-white' : 'text-gray-900'
                }`}>
                  Zero Risk Mode
                </h4>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedRisk === 'zero' 
                    ? 'bg-white/20 text-white' 
                    : 'text-green-700 border border-green-600'
                }`}>
                  <div className="flex items-center -space-x-1">
                    <Image src="/assets/logo/defi-protocol-logo/Canopy.jpg" alt="Canopy" width={16} height={16} className="rounded-full" />
                    <Image src="/assets/logo/defi-protocol-logo/Layer Bank.jpg" alt="Layer Bank" width={16} height={16} className="rounded-full" />
                    <Image src="/assets/logo/defi-protocol-logo/MovePosition.jpg" alt="MovePosition" width={16} height={16} className="rounded-full" />
                  </div>
                  Only yield from DeFi
                </div>
              </div>
              
              <p className={`text-sm leading-relaxed ${
                selectedRisk === 'zero' ? 'text-white/90' : 'text-gray-600'
              }`}>
                Your principal is safe. Only DeFi yield earnings are at risk for maximum security.
              </p>
            </div>
          </div>
          
          {selectedRisk === 'zero' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
          )}
        </motion.div>
      </div>

      <motion.div 
        className="flex items-center justify-between pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedRisk}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all cursor-pointer ${
            selectedRisk
              ? 'bg-black text-white hover:bg-gray-800 shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};