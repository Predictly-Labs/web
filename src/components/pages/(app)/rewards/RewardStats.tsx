"use client";

import React from 'react';
import { Star, Gift, Trophy, TrendingUp, Zap, Award } from 'lucide-react';

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

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  subtitle?: string;
  color: string;
}

interface RewardStatsProps {
  stats: UserStats;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, subtitle, color }) => (
  <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  </div>
);

export const RewardStats: React.FC<RewardStatsProps> = ({ stats }) => {
  const levelProgress = stats.currentLevelPoints / stats.nextLevelPoints * 100;

  const formatRank = (rank: number, total: number) => {
    const percentage = ((total - rank + 1) / total * 100).toFixed(0);
    return `#${rank} (Top ${percentage}%)`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Level {stats.level}</h3>
            <p className="text-blue-100 text-sm">
              {stats.nextLevelPoints - stats.currentLevelPoints} points to next level
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</div>
            <p className="text-blue-100 text-sm">Total Points</p>
          </div>
        </div>
        
        <div className="w-full bg-blue-500/30 rounded-full h-2 mb-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-blue-100">
          <span>{stats.currentLevelPoints}</span>
          <span>{stats.nextLevelPoints}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={Trophy}
          label="Rank"
          value={`#${stats.rank}`}
          color="bg-yellow-500"
        />
        
        <StatCard
          icon={Zap}
          label="Streak"
          value={`${stats.currentStreak}d`}
          color="bg-orange-500"
        />
        
        <StatCard
          icon={TrendingUp}
          label="Accuracy"
          value="78%"
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};