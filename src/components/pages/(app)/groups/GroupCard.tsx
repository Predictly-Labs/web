"use client";

import React, { useState } from "react";
import { Users, TrendingUp, Clock, Crown } from "lucide-react";

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
  status: "active" | "closed" | "pending";
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
  iconUrl?: string;
  inviteCode?: string;
  isPublic?: boolean;
  createdById?: string;
  updatedAt?: string;
  createdBy?: {
    id: string;
    displayName: string;
    avatarUrl: string;
  };
  _count?: {
    members: number;
    markets: number;
  };
  userRole?: string | null;
  isMember?: boolean;
  stats?: {
    memberCount: number;
    totalMarkets: number;
  };
}

interface GroupCardProps {
  group: GroupData;
  onClick?: (group: GroupData) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => {
  const [groupImageError, setGroupImageError] = useState(false);

  const handleClick = () => {
    onClick?.(group);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}k`;
    }
    return `$${volume}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all group overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
            <img
              src={
                groupImageError
                  ? "/assets/main/background/bg-flower.png"
                  : group.avatar
              }
              alt={group.name}
              className="w-full h-full object-cover"
              onError={() => setGroupImageError(true)}
            />
            {group.isPrivate && (
              <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 shadow-sm">
                <Crown className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {group.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-gray-600 mt-1.5">
              <span className="flex items-center gap-1.5 bg-white/60 px-2 py-1 rounded-full">
                <Users className="w-3 h-3 text-blue-600" />
                <span className="font-medium">{group.memberCount}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/60 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="font-medium">{group.activeMarkets}</span>
              </span>
              {group.totalVolume > 0 && (
                <span className="flex items-center gap-1.5 bg-white/60 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3 text-orange-600" />
                  <span className="font-medium">
                    {formatVolume(group.totalVolume)}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-3">
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {group.description}
        </p>

        <div className="text-left mb-4">
          <span className="text-sm text-gray-600 font-medium">
            Created {formatDate(group.createdAt)}
          </span>
        </div>

        <button
          onClick={handleClick}
          className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer shadow-sm"
        >
          View Group Details
        </button>
      </div>
    </div>
  );
};
