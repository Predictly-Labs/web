"use client";

import React from 'react';
import { Star, Gift, Lock, Trophy } from 'lucide-react';
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
  // No mockup data - only use rewards from props (API)
  const unlockedRewards = rewards.filter(r => r.isUnlocked);
  const availableRewards = rewards.filter(r => !r.isUnlocked && r.progress);
  const lockedRewards = rewards.filter(r => !r.isUnlocked && !r.progress);

  const handleRewardClick = (reward: RewardData) => {
    onRewardClick?.(reward);
  };

  return (
    <div className="space-y-8">
      {unlockedRewards.length > 0 && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
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

      {rewards.length === 0 && (
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
