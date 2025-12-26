"use client";

import React, { useState } from 'react';
import { Gift, Star } from 'lucide-react';
import { RewardHistory } from './RewardHistory';
import Sidebar from "../../../ui/Sidebar";
import Image from "next/image";

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
  progress?: {
    current: number;
    total: number;
  };
  requirements: string[];
}

interface UserStats {
  totalPoints: number;
  totalRewards: number;
  currentStreak: number;
  rank: number;
  totalUsers: number;
  level: number;
  nextLevelPoints: number;
  currentLevelPoints: number;
}

interface RewardsProps {
  onRewardClick?: (reward: RewardData) => void;
  rewards?: RewardData[];
  userStats?: UserStats;
}


export const Rewards: React.FC<RewardsProps> = ({
  onRewardClick,
  rewards = [],
  userStats
}) => {

  const defaultStats: UserStats = {
    totalPoints: 3450,
    totalRewards: 12,
    currentStreak: 7,
    rank: 156,
    totalUsers: 2840,
    level: 8,
    nextLevelPoints: 4000,
    currentLevelPoints: 3450
  };

  const displayStats = userStats || defaultStats;

  const handleRewardClick = (reward: RewardData) => {
    onRewardClick?.(reward);
  };

  const earnedCount = rewards.filter(r => r.isUnlocked).length;
  const totalPoints = rewards
    .filter(r => r.isUnlocked)
    .reduce((sum, r) => sum + r.points, 0) || displayStats.totalPoints;

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-4">
          <div className="relative mb-6">
            <div 
              className="relative overflow-hidden rounded-2xl"
              style={{
                backgroundImage: "url('/assets/main/background/bg-main.png')",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-4 p-2">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 mb-1">
                    <h1 className="text-2xl font-medium text-pink-900">Rewards & Achievements</h1>
                    <Image
                      src="/assets/landing/cards/no-loss.png"
                      alt="Rewards Icon"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">Track your progress and earn rewards for your predictions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
          <div 
            className="space-y-8 relative p-6 rounded-3xl overflow-hidden"
            style={{
              backgroundImage: "url('/assets/main/background/bg-market.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-white/70"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Your Rewards</h2>
              </div>

              <div className="flex items-center gap-6 bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-4 mb-8 border border-white/30">
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
                    {earnedCount}
                  </div>
                  <p className="text-sm text-gray-600">Rewards Earned</p>
                </div>
              </div>

              <RewardHistory 
                rewards={rewards}
                onRewardClick={handleRewardClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};