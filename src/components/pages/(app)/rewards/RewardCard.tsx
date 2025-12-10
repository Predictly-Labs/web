"use client";

import React from 'react';
import { Gift, Star, Clock, CheckCircle, Users } from 'lucide-react';
import Image from 'next/image';

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

interface RewardCardProps {
  reward: RewardData;
  onClick?: (reward: RewardData) => void;
}

interface ProgressBarProps {
  current: number;
  total: number;
  rarity: RewardData['rarity'];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, rarity }) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  const getRarityColor = (rarity: RewardData['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full transition-all duration-300 ${getRarityColor(rarity)}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export const RewardCard: React.FC<RewardCardProps> = ({ reward, onClick }) => {
  const handleClick = () => {
    onClick?.(reward);
  };

  const getRarityConfig = (rarity: RewardData['rarity']) => {
    switch (rarity) {
      case 'common': 
        return { 
          bg: 'bg-gray-50 border-gray-200', 
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-700',
          glow: ''
        };
      case 'rare': 
        return { 
          bg: 'bg-blue-50 border-blue-200', 
          text: 'text-blue-700',
          badge: 'bg-blue-100 text-blue-700',
          glow: 'shadow-blue-100'
        };
      case 'epic': 
        return { 
          bg: 'bg-purple-50 border-purple-200', 
          text: 'text-purple-700',
          badge: 'bg-purple-100 text-purple-700',
          glow: 'shadow-purple-100'
        };
      case 'legendary': 
        return { 
          bg: 'bg-yellow-50 border-yellow-200', 
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-700',
          glow: 'shadow-yellow-100 shadow-lg'
        };
      default: 
        return { 
          bg: 'bg-gray-50 border-gray-200', 
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-700',
          glow: ''
        };
    }
  };

  const rarityConfig = getRarityConfig(reward.rarity);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer
        ${rarityConfig.bg} ${rarityConfig.glow}
        ${reward.isUnlocked 
          ? 'hover:scale-105 hover:shadow-lg' 
          : 'opacity-75 hover:opacity-90'
        }
      `}
    >
      {reward.isUnlocked && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className={`
          w-16 h-16 rounded-2xl flex items-center justify-center
          ${reward.isUnlocked ? rarityConfig.bg : 'bg-gray-200'}
        `}>
          <Image
            src={reward.icon}
            alt={reward.title}
            width={40}
            height={40}
            className={`object-cover ${reward.isUnlocked ? '' : 'grayscale'}`}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-semibold ${reward.isUnlocked ? 'text-gray-900' : 'text-gray-600'}`}>
              {reward.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${rarityConfig.badge}`}>
              {reward.rarity}
            </span>
          </div>
          
          <p className={`text-sm mb-3 ${reward.isUnlocked ? 'text-gray-600' : 'text-gray-500'}`}>
            {reward.description}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reward.progress && !reward.isUnlocked && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className={`font-medium ${rarityConfig.text}`}>
                {reward.progress.current}/{reward.progress.total}
              </span>
            </div>
            <ProgressBar 
              current={reward.progress.current}
              total={reward.progress.total}
              rarity={reward.rarity}
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-gray-900">{reward.points}</span>
              <span className="text-gray-600">pts</span>
            </div>
            
            {reward.tokenReward && (
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4 text-green-500" />
                <span className="font-medium text-gray-900">${reward.tokenReward}</span>
              </div>
            )}
          </div>

          {reward.isUnlocked && reward.unlockedAt && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formatDate(reward.unlockedAt)}</span>
            </div>
          )}
        </div>

        {!reward.isUnlocked && reward.requirements.length > 0 && (
          <div className="mt-4 p-3 bg-white/50 rounded-lg">
            <p className="text-xs font-medium text-gray-700 mb-2">Requirements:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {reward.requirements.slice(0, 2).map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  {req}
                </li>
              ))}
              {reward.requirements.length > 2 && (
                <li className="text-gray-500">+{reward.requirements.length - 2} more...</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};