"use client";

import React from 'react';
import { Star, Gift, Calendar, CheckCircle, Lock } from 'lucide-react';
import { RewardCard } from './RewardCard';

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

interface RewardHistoryProps {
  rewards?: RewardData[];
  onRewardClick?: (reward: RewardData) => void;
}


export const RewardHistory: React.FC<RewardHistoryProps> = ({ 
  rewards = [], 
  onRewardClick 
}) => {
  const defaultRewards: RewardData[] = [
    {
      id: '1',
      title: 'First Prediction',
      description: 'Made your very first prediction on the platform',
      type: 'milestone',
      points: 100,
      tokenReward: 5,
      icon: '/assets/logo/defi-protocol-logo/Layer Bank.jpg',
      rarity: 'common',
      isUnlocked: true,
      unlockedAt: '2024-11-15',
      requirements: ['Make your first prediction']
    },
    {
      id: '2',
      title: 'Crypto Master',
      description: 'Achieved 80% accuracy in cryptocurrency predictions',
      type: 'achievement',
      points: 500,
      tokenReward: 25,
      icon: '/assets/logo/defi-protocol-logo/Canopy.jpg',
      rarity: 'epic',
      isUnlocked: true,
      unlockedAt: '2024-12-01',
      requirements: ['Make 20+ crypto predictions', 'Achieve 80% accuracy']
    },
    {
      id: '3',
      title: 'Group Leader',
      description: 'Created a group with 10+ active members',
      type: 'milestone',
      points: 750,
      tokenReward: 50,
      icon: '/assets/logo/defi-protocol-logo/MovePosition.jpg',
      rarity: 'rare',
      isUnlocked: true,
      unlockedAt: '2024-12-05',
      requirements: ['Create a group', 'Get 10+ active members']
    },
    {
      id: '4',
      title: 'Fortune Teller',
      description: 'Predict 10 consecutive outcomes correctly',
      type: 'achievement',
      points: 1000,
      tokenReward: 100,
      icon: '/assets/logo/defi-protocol-logo/Layer Bank.jpg',
      rarity: 'legendary',
      isUnlocked: false,
      progress: { current: 7, total: 10 },
      requirements: ['Get 10 consecutive predictions correct', 'Must be in different markets']
    },
    {
      id: '5',
      title: 'Market Maker',
      description: 'Created 5 successful prediction markets',
      type: 'milestone',
      points: 300,
      tokenReward: 15,
      icon: '/assets/logo/defi-protocol-logo/Canopy.jpg',
      rarity: 'rare',
      isUnlocked: false,
      progress: { current: 3, total: 5 },
      requirements: ['Create 5 markets', 'Each market must have 5+ participants']
    },
    {
      id: '6',
      title: 'Social Butterfly',
      description: 'Invited 20 friends to the platform',
      type: 'milestone',
      points: 400,
      icon: '/assets/logo/defi-protocol-logo/MovePosition.jpg',
      rarity: 'rare',
      isUnlocked: false,
      progress: { current: 12, total: 20 },
      requirements: ['Invite 20 friends', 'Friends must make at least 1 prediction']
    },
    {
      id: '7',
      title: 'Holiday Champion',
      description: 'Special reward for New Year 2025 predictions',
      type: 'seasonal',
      points: 200,
      tokenReward: 10,
      icon: '/assets/logo/defi-protocol-logo/Layer Bank.jpg',
      rarity: 'common',
      isUnlocked: false,
      requirements: ['Available only during New Year event', 'Make 3 predictions in December']
    },
    {
      id: '8',
      title: 'Diamond Hands',
      description: 'Hold prediction positions for 30+ days',
      type: 'achievement',
      points: 600,
      tokenReward: 30,
      icon: '/assets/logo/defi-protocol-logo/Canopy.jpg',
      rarity: 'epic',
      isUnlocked: false,
      progress: { current: 18, total: 30 },
      requirements: ['Hold positions for 30+ days', 'Minimum 5 positions', 'Must be profitable']
    }
  ];

  const displayRewards = rewards.length > 0 ? rewards : defaultRewards;
  
  const unlockedRewards = displayRewards.filter(r => r.isUnlocked);
  const availableRewards = displayRewards.filter(r => !r.isUnlocked && r.progress);
  const lockedRewards = displayRewards.filter(r => !r.isUnlocked && !r.progress);

  const handleRewardClick = (reward: RewardData) => {
    onRewardClick?.(reward);
  };

  return (
    <div className="space-y-8">
      {unlockedRewards.length > 0 && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-black" />
            Earned Rewards ({unlockedRewards.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedRewards.map(reward => (
              <RewardCard 
                key={reward.id} 
                reward={reward}
                onClick={handleRewardClick}
              />
            ))}
          </div>
        </section>
      )}

      {availableRewards.length > 0 && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-black" />
            In Progress ({availableRewards.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.map(reward => (
              <RewardCard 
                key={reward.id} 
                reward={reward}
                onClick={handleRewardClick}
              />
            ))}
          </div>
        </section>
      )}

      {lockedRewards.length > 0 && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-500" />
            Locked Rewards ({lockedRewards.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedRewards.map(reward => (
              <RewardCard 
                key={reward.id} 
                reward={reward}
                onClick={handleRewardClick}
              />
            ))}
          </div>
        </section>
      )}

      {displayRewards.length === 0 && (
        <div className="text-center py-16">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Rewards Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Start making predictions and participating in groups to earn your first rewards!
          </p>
        </div>
      )}
    </div>
  );
};