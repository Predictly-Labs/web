"use client";

import React, { useState } from 'react';
import { Shield, AlertTriangle, ArrowRight, ArrowLeft, TrendingDown, TrendingUp } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Choose Your Risk Level
        </h3>
        <p className="text-gray-600">
          Select the risk level for your prediction market participants.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Risk Option */}
        <div
          onClick={() => setSelectedRisk('full')}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedRisk === 'full'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  Full Risk
                </h4>
                <div className="flex items-center gap-1 text-red-600 text-sm">
                  <TrendingDown className="w-4 h-4" />
                  <span className="font-medium">High Risk</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Participants can lose both their principal (invested money) and yield from DeFi protocols.
              </p>
              <div className="bg-red-100 border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-red-800 mb-1">Risk Warning:</p>
                    <p className="text-red-700">
                      Participants can lose up to 100% of their invested money plus any yield earned.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p>• Higher potential returns</p>
                <p>• Maximum risk exposure</p>
                <p>• Suitable for experienced traders</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedRisk === 'full'
                ? 'border-red-500 bg-red-500'
                : 'border-gray-300'
            }`}>
              {selectedRisk === 'full' && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </div>
        </div>

        {/* Zero Risk Option */}
        <div
          onClick={() => setSelectedRisk('zero')}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedRisk === 'zero'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  Zero Risk (Principal Protected)
                </h4>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Low Risk</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Participants only risk the yield from DeFi protocols, their principal (invested money) is protected.
              </p>
              <div className="bg-green-100 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-800 mb-1">Principal Protection:</p>
                    <p className="text-green-700">
                      Your invested money (principal) is safe. Only DeFi yield earnings are at risk.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p>• Principal investment protected</p>
                <p>• Only yield earnings at risk</p>
                <p>• Perfect for conservative investors</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedRisk === 'zero'
                ? 'border-green-500 bg-green-500'
                : 'border-gray-300'
            }`}>
              {selectedRisk === 'zero' && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedRisk}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            selectedRisk
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};