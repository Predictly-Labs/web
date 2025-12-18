"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";

export const BalanceCard = () => {
  const { isAuthenticated } = useAuth();
  const { user, isLoading, fetchUser } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser().catch(console.error);
    }
  }, [isAuthenticated, fetchUser]);

  // Use real user data or defaults
  const totalEarnings = user?.totalEarnings || 0;
  const totalPredictions = user?.totalPredictions || 0;
  const correctPredictions = user?.correctPredictions || 0;
  const accuracy = totalPredictions > 0 ? Math.round((correctPredictions / totalPredictions) * 100) : 0;

  return (
    <div 
      className="rounded-3xl p-4 sm:p-8 h-auto min-h-[280px] w-full sm:min-h-[320px] relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/main/background/bg-nav.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-medium text-gray-900">My Stats</h3>
          <div className="flex gap-2">
            <button className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM6 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" />
              </svg>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/assets/logo/logo-coin/move-logo.jpeg"
                  alt="Movement Logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Total Earnings</h4>
                <p className="text-sm text-gray-500">From predictions</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-end gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{totalEarnings.toFixed(2)}</h2>
                <Image
                  src="/assets/logo/logo-coin/move-logo.jpeg"
                  alt="Movement Logo"
                  width={22}
                  height={22}
                  className="rounded-full mb-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Total Predictions</p>
                  <p className="text-lg font-bold text-gray-900">{totalPredictions}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Accuracy</p>
                  <p className="text-lg font-bold text-green-600">{accuracy}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
