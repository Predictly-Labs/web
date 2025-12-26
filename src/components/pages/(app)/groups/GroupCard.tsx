"use client";

import React, { useState } from 'react';
import { Users, TrendingUp, Clock, Crown } from 'lucide-react';
import Image from 'next/image';

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isOwner?: boolean;
}

interface MarketData {
  id: string;
  title: string;
  description: string;
  endDate: string;
  totalPool: number;
  participants: number;
  status: 'active' | 'closed' | 'pending';
  category: string;
  currentOdds?: number;
  createdBy: string;
  createdAt: string;
}

interface GroupData {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  activeMarkets: number;
  totalVolume: number;
  owner: string;
  members: GroupMember[];
  createdAt: string;
  isPrivate: boolean;
  markets: MarketData[];
}

interface GroupCardProps {
  group: GroupData;
  onClick?: (group: GroupData) => void;
}

interface GroupStatsProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

const GroupStats: React.FC<GroupStatsProps> = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-2 text-sm">
    <Icon className="w-4 h-4 text-gray-500" />
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

export const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => {
  const [groupImageError, setGroupImageError] = useState(false);
  const [memberImageErrors, setMemberImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleClick = () => {
    onClick?.(group);
  };

  const handleMemberImageError = (memberId: string) => {
    setMemberImageErrors(prev => ({ ...prev, [memberId]: true }));
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}k`;
    }
    return `$${volume}`;
  };

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
      className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-[60px] h-[60px] rounded-2xl overflow-hidden">
          <img
            src={groupImageError ? "/assets/main/background/bg-flower.png" : group.avatar}
            alt={group.name}
            className="w-full h-full object-cover"
            onError={() => setGroupImageError(true)}
          />
          {group.isPrivate && (
            <div className="absolute -top-1 -right-1 bg-yellow-100 border-2 border-white rounded-full p-1">
              <Crown className="w-3 h-3 text-yellow-600" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {group.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {group.description}
          </p>
          <p className="text-xs text-gray-500">
            Created {formatDate(group.createdAt)} • by {group.owner}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <GroupStats
          label="Members"
          value={group.memberCount}
          icon={Users}
        />
        <GroupStats
          label="Active Markets"
          value={group.activeMarkets}
          icon={TrendingUp}
        />
        <GroupStats
          label="Volume"
          value={formatVolume(group.totalVolume)}
          icon={Clock}
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex -space-x-2">
          {group.members.slice(0, 4).map((member, index) => (
            <div
              key={member.id}
              className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white"
              style={{ zIndex: 4 - index }}
            >
              <img
                src={memberImageErrors[member.id] ? "/assets/main/background/bg-flower.png" : member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={() => handleMemberImageError(member.id)}
              />
              {member.isOwner && (
                <div className="absolute -top-1 -right-1 bg-blue-100 border border-white rounded-full p-0.5">
                  <Crown className="w-2.5 h-2.5 text-blue-600" />
                </div>
              )}
            </div>
          ))}
          {group.memberCount > 4 && (
            <div className="w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                +{group.memberCount - 4}
              </span>
            </div>
          )}
        </div>
        
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          View Details →
        </button>
      </div>
    </div>
  );
};