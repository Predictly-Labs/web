"use client";

import Image from "next/image";

export const BalanceCard = () => {
  return (
    <div className="bg-white rounded-3xl p-8 h-80 w-80 border border-gray-50">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-medium text-gray-900">Token Balance</h3>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM6 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <Image 
              src="/assets/logo/logo-coin/move-logo.jpeg"
              alt="Movement Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Movement</h4>
            <p className="text-sm text-gray-500">$MOVE Token</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-gray-900">2,847.52</h2>
            <span className="text-lg text-gray-400 mb-1">MOVE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-600">≈ $12,435.78</span>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              +12.4%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};