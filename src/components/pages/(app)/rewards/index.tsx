"use client";

import React, { useState } from 'react';
import { Gift, BarChart3, Star } from 'lucide-react';
import { RewardHistory } from './RewardHistory';
import { RewardStats } from './RewardStats';
import Sidebar from "../../../ui/Sidebar";

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

type ActiveTab = 'rewards' | 'stats';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
      ${active 
        ? 'bg-black text-white shadow-lg' 
        : 'bg-white/20 text-gray-700 hover:bg-white/30'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    {children}
  </button>
);

export const Rewards: React.FC<RewardsProps> = ({
  onRewardClick,
  rewards = [],
  userStats
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('rewards');

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

  const renderContent = () => {
    switch (activeTab) {
      case 'rewards':
        return (
          <RewardHistory 
            rewards={rewards}
            onRewardClick={handleRewardClick}
          />
        );
      
      case 'stats':
        return (
          <RewardStats stats={displayStats} />
        );
      
      default:
        return null;
    }
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
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-2">
                Rewards & Achievements
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3">
                Track your progress and earn rewards for your predictions.
              </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-6 bg-white/50 rounded-2xl px-6 py-3">
              <div className="text-center">
                <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                  <Star className="w-6 h-6 text-yellow-500" />
                  {totalPoints.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Total Points</p>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                  <Gift className="w-6 h-6 text-green-500" />
                  {earnedCount}
                </div>
                <p className="text-sm text-gray-600">Rewards Earned</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <TabButton
              active={activeTab === 'rewards'}
              onClick={() => setActiveTab('rewards')}
              icon={Gift}
            >
              Rewards
            </TabButton>
            
            <TabButton
              active={activeTab === 'stats'}
              onClick={() => setActiveTab('stats')}
              icon={BarChart3}
            >
              Statistics
            </TabButton>
          </div>
          
          <div className="border-b border-gray-200"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-100">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};