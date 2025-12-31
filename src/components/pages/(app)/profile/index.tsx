"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/ui/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useGetUserStats } from '@/hooks/useGetUserStats';
import { BsSearch, BsPencil } from 'react-icons/bs';

interface ActivityData {
  day: string;
  value: number;
}

const activityData: ActivityData[] = [
  { day: 'Mon', value: 20 },
  { day: 'Tue', value: 35 },
  { day: 'Wed', value: 15 },
  { day: 'Thu', value: 45 },
  { day: 'Fri', value: 60 },
  { day: 'Sat', value: 25 },
  { day: 'Sun', value: 40 },
];

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { userStats, fetchUserStats, isLoading } = useGetUserStats();
  const [activeTab, setActiveTab] = useState<'positions' | 'activity'>('positions');
  const [activeFilter, setActiveFilter] = useState<'active' | 'closed'>('active');
  const [stats, setStats] = useState({
    totalPredictions: 0,
    correctPredictions: 0,
    totalEarnings: 0,
    currentStreak: 0,
    accuracy: 0
  });

  useEffect(() => {
    if (user?.id) {
      fetchUserStats(user.id);
    }
  }, [user, fetchUserStats]);

  useEffect(() => {
    if (userStats) {
      setStats(userStats);
    }
  }, [userStats]);

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const maxValue = Math.max(...activityData.map(d => d.value));

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="relative mb-6">
            <div 
              className="relative overflow-hidden rounded-2xl"
              style={{
                backgroundImage: "url('/assets/main/background/bg-main.png')",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-4 p-6">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-light text-pink-900">Profile</h1>
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center max-w-2xl">
                    Your prediction market statistics and performance overview
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16">
                      {user?.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt={user.displayName || 'User'}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-500 text-xl font-light">
                            {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h1 className="text-xl font-light text-gray-900 mb-1">
                        {user?.walletAddress ? formatWalletAddress(user.walletAddress) : 'Not connected'}
                      </h1>
                      <div className="text-sm text-gray-500 mb-2">
                        Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Unknown'} • {stats.totalPredictions || 0} predictions
                      </div>
                      <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        Free
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                      <BsPencil className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Positions Value</div>
                    <div className="text-2xl font-light text-gray-900">
                      ${isLoading ? '...' : stats.totalEarnings?.toFixed(2) || '0.00'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Biggest Win</div>
                    <div className="text-2xl font-light text-gray-900">—</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Predictions</div>
                    <div className="text-2xl font-light text-gray-900">
                      {isLoading ? '...' : stats.totalPredictions || 0}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('positions')}
                      className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                        activeTab === 'positions'
                          ? 'border-gray-900 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Positions
                    </button>
                    <button
                      onClick={() => setActiveTab('activity')}
                      className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                        activeTab === 'activity'
                          ? 'border-gray-900 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Activity
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'positions' && (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setActiveFilter('active')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                              activeFilter === 'active'
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-gray-50 text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Active
                          </button>
                          <button
                            onClick={() => setActiveFilter('closed')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                              activeFilter === 'closed'
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-gray-50 text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Closed
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search positions"
                              className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300"
                            />
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                            <span>⚖</span>
                            Value
                          </button>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-700 uppercase tracking-wider">
                          <div>Market</div>
                          <div className="text-right">Avg</div>
                          <div className="text-right">Current</div>
                          <div className="text-right">Value</div>
                        </div>
                        
                        <div className="p-8 text-center bg-white">
                          <div className="text-gray-500 text-sm">No positions found</div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'activity' && (
                    <div className="p-8 text-center">
                      <div className="text-gray-500 text-sm">Activity data will be shown here</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">Profit/Loss</div>
                  <div className="flex gap-1 text-xs">
                    <button className="px-2 py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">1D</button>
                    <button className="px-2 py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">1W</button>
                    <button className="px-2 py-1 bg-gray-100 text-gray-900 rounded cursor-pointer">1M</button>
                    <button className="px-2 py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">ALL</button>
                  </div>
                </div>

                <div className="text-2xl font-light text-gray-900 mb-1">$0.00</div>
                <div className="text-sm text-gray-500 mb-6">Past Month</div>

                <div className="h-32 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                  <div className="flex items-end gap-1 h-16">
                    {activityData.map((item, index) => (
                      <div
                        key={item.day}
                        className="bg-gray-300 w-3 rounded-t transition-all duration-300"
                        style={{ height: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-400 text-right">Polymarket</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};