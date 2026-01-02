"use client";

import React, { useState } from "react";
import { Users, TrendingUp, Crown } from "lucide-react";
import Image from "next/image";
import { GroupData } from "@/types/group";

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
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all group overflow-hidden mt-4">
      <div className="bg-gray-50 p-4 pb-3">
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
              <div className="absolute -top-1 -right-1 bg-black rounded-full p-1 shadow-sm">
                <Crown className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {group.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-gray-600 mt-1.5">
              <span className="flex items-center gap-1.5 bg-white/80 px-2 py-1 rounded-full">
                <Users className="w-3 h-3 text-black" />
                <span className="font-medium">{group.memberCount}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 text-black" />
                <span className="font-medium">{group.activeMarkets}</span>
              </span>
              {group.totalVolume > 0 && (
                <span className="flex items-center gap-1.5 bg-white/80 px-2 py-1 rounded-full">
                  <Image
                    src="/assets/logo/logo-coin/move-logo.jpeg"
                    alt="Move Token"
                    width={12}
                    height={12}
                    className="rounded-full"
                  />
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
