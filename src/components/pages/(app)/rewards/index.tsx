"use client";

import React, { useEffect } from 'react';
import { Gift, Star, TrendingUp, DollarSign, Loader2, History } from 'lucide-react';
import { RewardHistory } from './RewardHistory';
import { VoteHistoryCard } from './VoteHistoryCard';
import Sidebar from "../../../ui/Sidebar";
import Image from "next/image";
import { useMyVotes } from '@/hooks/useMyVotes';
import { useAuth } from '@/contexts/AuthContext';

interface RewardData {
  id: string;
  title: string;
  description: string;
  type: 'achievement' | 'milestone' | 'seasonal' | 'prediction';
  points: number;
  tokenReward?: number;
  badge?: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: { current: number; total: number };
  requirements: string[];
}

interface RewardsProps {
  onRewardClick?: (reward: RewardData) => void;
  rewards?: RewardData[];
}

export const Rewards: React.FC<RewardsProps> = ({ onRewardClick, rewards = [] }) => {
  const { isAuthenticated, user } = useAuth();
  const { votes, isLoading, error, fetchVotes, totalStaked, totalYield, pendingRewards } = useMyVotes();

  // Fetch votes when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchVotes().catch(console.error);
    }
  }, [isAuthenticated, fetchVotes]);

  // Use real data from API - no mockup fallback
  const handleRewardClick = (reward: RewardData) => onRewardClick?.(reward);
  const totalPoints = user?.totalEarnings || 0;
  const earnedCount = rewards.filter(r => r.isUnlocked).length;


  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-4">
          <div className="relative mb-6">
            <div className="relative overflow-hidden rounded-2xl" style={{ backgroundImage: "url('/assets/main/background/bg-flower.png')", backgroundRepeat: "no-repeat" }}>
              <div className="relative z-10 flex items-center justify-center gap-4 p-2">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 mb-1">
                    <h1 className="text-2xl font-medium text-pink-900">Rewards & Achievements</h1>
                    <Image src="/assets/landing/cards/no-loss.png" alt="Rewards Icon" width={40} height={40} className="object-contain" />
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">Track your progress and earn rewards for your predictions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
          <div className="space-y-8 relative p-6 rounded-3xl overflow-hidden" style={{ backgroundImage: "url('/assets/main/background/bg-market.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <div className="absolute inset-0 bg-white/70"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Your Rewards</h2>
              </div>

              {/* Stats from API */}
              <div className="flex flex-wrap items-center gap-6 bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-4 mb-8 border border-white/30">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900">
                    <Star className="w-6 h-6 text-yellow-500" />
                    {totalPoints.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Total Points</p>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900">
                    <Gift className="w-6 h-6 text-green-500" />
                    {earnedCount || votes.length}
                  </div>
                  <p className="text-sm text-gray-600">Votes Made</p>
                </div>
                {isAuthenticated && (
                  <>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900">
                        <TrendingUp className="w-6 h-6 text-blue-500" />
                        {totalStaked.toFixed(2)}
                      </div>
                      <p className="text-sm text-gray-600">Total Staked</p>
                    </div>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900">
                        <DollarSign className="w-6 h-6 text-purple-500" />
                        {pendingRewards.toFixed(2)}
                      </div>
                      <p className="text-sm text-gray-600">Pending Rewards</p>
                    </div>
                  </>
                )}
              </div>

              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Loading your votes...</span>
                </div>
              )}

              {error && (
                <div className="text-center py-4 mb-4">
                  <p className="text-amber-600 text-sm">{error}</p>
                </div>
              )}

              {/* Vote History Section */}
              {votes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-500" />
                    Your Vote History ({votes.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {votes.map((vote) => (
                      <VoteHistoryCard 
                        key={vote.id} 
                        vote={vote} 
                        onClaimed={() => fetchVotes()}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && votes.length === 0 && isAuthenticated && (
                <div className="text-center py-8 mb-8 bg-gray-50 rounded-xl">
                  <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Votes Yet</h3>
                  <p className="text-gray-500 text-sm">Start voting on predictions to see your history here</p>
                </div>
              )}

              <RewardHistory rewards={rewards} onRewardClick={handleRewardClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
