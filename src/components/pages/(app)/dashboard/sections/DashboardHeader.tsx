"use client";

import { useState } from "react";

interface DashboardHeaderProps {
  user?: any;
  address?: string | null;
  onLogout: () => void;
  isAuthenticated?: boolean;
}

export const DashboardHeader = ({ user, address, onLogout, isAuthenticated }: DashboardHeaderProps) => {
  const [userImageError, setUserImageError] = useState(false);

  return (
    <div className="mb-4">
      <div className="relative mb-6">
        <div 
          className="relative overflow-hidden rounded-2xl"
          style={{
            backgroundImage: "url('/assets/main/background/bg-main.png')",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-medium text-pink-900">My Dashboard</h1>
                </div>
                <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">
                  {isAuthenticated ? "Welcome back! Here's what's happening with your predictions." : "Connect your wallet to start predicting"}
                </p>
              </div>
              <div className="flex-1 flex justify-end">
                {isAuthenticated && (
                  <div className="flex items-center gap-3">
                    {user && (
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img
                          src={userImageError ? "/assets/main/background/bg-flower.png" : (user.avatarUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${user.walletAddress}`)}
                          alt={user.displayName}
                          className="object-cover w-full h-full"
                          onError={() => setUserImageError(true)}
                        />
                      </div>
                    )}
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Connected</div>
                      <div className="text-sm font-medium text-gray-700">
                        {user?.displayName ? user.displayName : `${address?.slice(0, 4)}...${address?.slice(-4)}`}
                      </div>
                    </div>
                    <button
                      onClick={onLogout}
                      className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-2 rounded-lg text-xs font-medium transition-colors"
                      title="Logout"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};