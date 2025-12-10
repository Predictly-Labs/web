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
  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Level {stats.level}</h3>
            <p className="text-blue-100">
              {stats.nextLevelPoints - stats.currentLevelPoints} points to next level
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats.totalPoints.toLocaleString()}</div>
            <p className="text-blue-100">Total Points</p>
          </div>
        </div>
        
        <div className="w-full bg-blue-500/30 rounded-full h-3 mb-2">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-blue-100">
          <span>{stats.currentLevelPoints}</span>
          <span>{stats.nextLevelPoints}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Trophy}
          label="Current Rank"
          value={formatRank(stats.rank, stats.totalUsers)}
          color="bg-yellow-500"
        />
        
        <StatCard
          icon={Gift}
          label="Rewards Earned"
          value={stats.totalRewards}
          subtitle="Achievements unlocked"
          color="bg-green-500"
        />
        
        <StatCard
          icon={Zap}
          label="Current Streak"
          value={`${stats.currentStreak} days`}
          subtitle="Daily predictions"
          color="bg-orange-500"
        />
        
        <StatCard
          icon={Star}
          label="This Month"
          value="1,250"
          subtitle="Points earned"
          color="bg-blue-500"
        />
        
        <StatCard
          icon={TrendingUp}
          label="Accuracy Rate"
          value="78%"
          subtitle="Correct predictions"
          color="bg-purple-500"
        />
        
        <StatCard
          icon={Award}
          label="Best Category"
          value="Crypto"
          subtitle="85% accuracy"
          color="bg-indigo-500"
        />
      </div>
    </div>
  );
};