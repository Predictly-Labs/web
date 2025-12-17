"use client";

import React, { useState, useEffect } from 'react';
import { Users, ArrowLeft, Plus, Loader2, UserPlus } from 'lucide-react';
import { GroupCard } from './GroupCard';
import { GroupMarkets } from './GroupMarkets';
import { CreateGroupModal } from './CreateGroupModal';
import { JoinGroupModal } from './JoinGroupModal';
import Sidebar from "../../../ui/Sidebar";
import Image from "next/image";
import { useGroups } from '@/hooks/useGroups';
import type { Group } from '@/types/api';

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

// Transform API Group to UI GroupData format
function transformGroup(group: Group): GroupData {
  return {
    id: group.id,
    name: group.name,
    description: group.description || '',
    avatar: group.iconUrl || '/assets/logo/defi-protocol-logo/Layer Bank.jpg',
    memberCount: group._count?.members || 0,
    activeMarkets: group._count?.markets || 0,
    totalVolume: 0,
    owner: 'Creator',
    members: [],
    createdAt: group.createdAt,
    isPrivate: !group.isPublic,
    markets: [],
  };
}

interface GroupsProps {
  onGroupClick?: (group: GroupData) => void;
  onMarketClick?: (market: MarketData) => void;
}

export const Groups: React.FC<GroupsProps> = ({ onGroupClick, onMarketClick }) => {
  const { groups: apiGroups, isLoading, error, fetchGroups } = useGroups();
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Fetch groups on mount
  useEffect(() => {
    fetchGroups().catch(console.error);
  }, [fetchGroups]);

  const handleGroupCreated = () => {
    fetchGroups().catch(console.error);
  };

  const handleGroupJoined = () => {
    fetchGroups().catch(console.error);
  };

  // Transform API groups - no fallback to mockup
  const displayGroups: GroupData[] = apiGroups.map(transformGroup);

  const handleGroupClick = (group: GroupData) => {
    setSelectedGroup(group);
    onGroupClick?.(group);
  };

  const handleMarketClick = (market: MarketData) => {
    onMarketClick?.(market);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
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
              style={{ backgroundImage: "url('/assets/main/background/bg-flower.png')", backgroundRepeat: "no-repeat" }}
            >
              <div className="relative z-10 flex items-center justify-center gap-4 p-2">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-4">
                    {selectedGroup && (
                      <button onClick={handleBackToGroups} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                        <ArrowLeft className="w-6 h-6 text-pink-900" />
                      </button>
                    )}
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-medium text-pink-900">
                        {selectedGroup ? selectedGroup.name : 'Groups'}
                      </h1>
                      <Image src="/assets/main/icon/groups-icon.png" alt="Groups Icon" width={30} height={30} className="object-contain" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center mt-1">
                    {selectedGroup ? 'View and manage prediction markets created by this group.' : 'Join groups and participate in their prediction markets.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
          <div 
            className="space-y-8 relative p-6 rounded-3xl overflow-hidden"
            style={{ backgroundImage: "url('/assets/main/background/bg-market.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
          >
            <div className="absolute inset-0 bg-white/70"></div>
            <div className="relative z-10">
              {selectedGroup ? (
                <GroupMarkets group={selectedGroup} onMarketClick={handleMarketClick} />
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-8 gap-3">
                    <button 
                      onClick={() => setShowCreateModal(true)}
                      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <div className="bg-white rounded-full p-1">
                        <Plus className="w-2 h-2 text-black" />
                      </div>
                      Create New Group
                    </button>
                    <button 
                      onClick={() => setShowJoinModal(true)}
                      className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                    >
                      <UserPlus className="w-4 h-4" />
                      Join with Code
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{displayGroups.length} groups available</span>
                  </div>

                  {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                      <span className="ml-2 text-gray-500">Loading groups...</span>
                    </div>
                  ) : error ? (
                    <div className="text-center py-16">
                      <p className="text-red-500 mb-4">{error}</p>
                      <button onClick={() => fetchGroups()} className="text-blue-600 hover:underline">
                        Try again
                      </button>
                    </div>
                  ) : displayGroups.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {displayGroups.map(group => (
                        <GroupCard key={group.id} group={group} onClick={handleGroupClick} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No Groups Yet</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Start by creating your first group to organize prediction markets with friends.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateGroupModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onSuccess={handleGroupCreated}
      />
      <JoinGroupModal 
        isOpen={showJoinModal} 
        onClose={() => setShowJoinModal(false)} 
        onSuccess={handleGroupJoined}
      />
    </div>
  );
};
