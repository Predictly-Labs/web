"use client";

import React, { useState, useEffect } from "react";
import { Users, ArrowLeft, Plus } from "lucide-react";
import { GroupCard } from "./GroupCard";
import { GroupMarkets } from "./GroupMarkets";
import { CreateGroupForm } from "./CreateGroupForm";
import { JoinGroupForm } from "./JoinGroupForm";
import { useGetGroups } from "@/hooks/useGetGroups";
import { useGetGroup } from "@/hooks/useGetGroupbyId";
import Sidebar from "../../../ui/Sidebar";
import Image from "next/image";

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

interface ApiGroup {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  isPublic: boolean;
  createdAt: string;
  stats?: {
    memberCount: number;
    activeMarkets: number;
    totalVolume: number;
  };
  _count?: {
    members: number;
    markets: number;
  };
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
}

interface GroupsProps {
  onGroupClick?: (group: GroupData) => void;
  onMarketClick?: (market: MarketData) => void;
  groups?: GroupData[];
}

export const Groups: React.FC<GroupsProps> = ({
  onGroupClick,
  onMarketClick,
  groups = [],
}) => {
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
  const [detailedGroup, setDetailedGroup] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const { getGroups, groups: apiGroups, isLoading, error } = useGetGroups();
  const {
    getGroup,
    group: detailedGroupData,
    isLoading: isLoadingDetail,
  } = useGetGroup();

  useEffect(() => {
    getGroups({ page: 1, limit: 20 });
  }, [getGroups]);

  useEffect(() => {
    if (selectedGroup) {
      getGroup(selectedGroup.id);
    }
  }, [selectedGroup, getGroup]);

  useEffect(() => {
    if (detailedGroupData) {
      setDetailedGroup(detailedGroupData);
    }
  }, [detailedGroupData]);

  const transformApiGroups = (apiGroups: ApiGroup[]): GroupData[] => {
    return apiGroups.map((group) => {
      const memberCount =
        group.stats?.memberCount || group._count?.members || 0;
      const activeMarkets =
        group.stats?.activeMarkets || group._count?.markets || 0;
      const totalVolume = group.stats?.totalVolume || 0;

      return {
        id: group.id,
        name: group.name,
        description: group.description,
        avatar: group.iconUrl || "/assets/logo/logo.png",
        memberCount,
        activeMarkets,
        totalVolume,
        owner: "Group Owner",
        members: [],
        createdAt: group.createdAt,
        isPrivate: !group.isPublic,
        markets: [],
      };
    });
  };

  const displayGroups =
    groups.length > 0 ? groups : transformApiGroups(apiGroups);

  const handleGroupClick = (group: GroupData) => {
    setSelectedGroup(group);
    onGroupClick?.(group);
  };

  const handleMarketClick = (market: MarketData) => {
    onMarketClick?.(market);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setDetailedGroup(null);
  };

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
                  <div className="flex items-center gap-4">
                    {selectedGroup && (
                      <button
                        onClick={handleBackToGroups}
                        className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                      >
                        <ArrowLeft className="w-6 h-6 text-pink-900" />
                      </button>
                    )}
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-medium text-pink-900">
                        {selectedGroup ? selectedGroup.name : "Groups"}
                      </h1>
                      <Image
                        src="/assets/main/icon/groups-icon.png"
                        alt="Groups Icon"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center mt-1">
                    {selectedGroup
                      ? "View and manage prediction markets created by this group."
                      : "Join groups and participate in their prediction markets."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
          <div
            className="space-y-8 relative p-6 rounded-3xl overflow-hidden min-h-[calc(100vh-300px)]"
            style={{
              backgroundImage: "url('/assets/main/background/bg-market.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-white/70"></div>
            <div className="relative z-10">
              {selectedGroup ? (
                isLoadingDetail ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-gray-500">
                      Loading group details...
                    </div>
                  </div>
                ) : detailedGroup ? (
                  <GroupMarkets
                    group={detailedGroup}
                    onMarketClick={handleMarketClick}
                  />
                ) : (
                  <GroupMarkets
                    group={selectedGroup}
                    onMarketClick={handleMarketClick}
                  />
                )
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-8">
                    {/* <h2 className="text-2xl font-semibold text-gray-900">All Groups</h2> */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowJoinForm(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        <Users className="w-4 h-4" />
                        Join Group
                      </button>
                      <button
                        onClick={() => setShowCreateForm(true)}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <div className="bg-white rounded-full p-1">
                          <Plus className="w-2 h-2 text-black" />
                        </div>
                        Create New Groups
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{displayGroups.length} groups available</span>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  {isLoading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gray-200 animate-pulse rounded-xl h-48"
                        ></div>
                      ))}
                    </div>
                  ) : displayGroups.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {displayGroups.map((group) => (
                        <GroupCard
                          key={group.id}
                          group={group}
                          onClick={handleGroupClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        No Groups Yet
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Start by creating your first group to organize
                        prediction markets with friends.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateGroupForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSuccess={() => {
          setShowCreateForm(false);
          getGroups({ page: 1, limit: 20 });
        }}
      />

      <JoinGroupForm
        isOpen={showJoinForm}
        onClose={() => setShowJoinForm(false)}
        onSuccess={() => {
          setShowJoinForm(false);
          getGroups({ page: 1, limit: 20 });
        }}
      />
    </div>
  );
};
