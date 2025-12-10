"use client";

import React, { useState } from 'react';
import { Users, ArrowLeft } from 'lucide-react';
import { GroupCard } from './GroupCard';
import { GroupMarkets } from './GroupMarkets';
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

interface GroupsProps {
  onGroupClick?: (group: GroupData) => void;
  onMarketClick?: (market: MarketData) => void;
  groups?: GroupData[];
}

export const Groups: React.FC<GroupsProps> = ({
  onGroupClick,
  onMarketClick,
  groups = []
}) => {
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);

  const defaultGroups: GroupData[] = [
    {
      id: '1',
      name: 'Crypto Bulls',
      description: 'A group of cryptocurrency enthusiasts making predictions about digital assets and blockchain technology.',
      avatar: '/assets/logo/defi-protocol-logo/Layer Bank.jpg',
      memberCount: 24,
      activeMarkets: 8,
      totalVolume: 12500,
      owner: 'Alex Chen',
      members: [
        { id: '1', name: 'Alex Chen', avatar: '/assets/logo/defi-protocol-logo/Layer Bank.jpg', isOwner: true },
        { id: '2', name: 'Sarah Kim', avatar: '/assets/logo/defi-protocol-logo/Canopy.jpg' },
        { id: '3', name: 'Mike Johnson', avatar: '/assets/logo/defi-protocol-logo/MovePosition.jpg' },
        { id: '4', name: 'Lisa Wong', avatar: '/assets/logo/defi-protocol-logo/Layer Bank.jpg' }
      ],
      createdAt: '2024-11-15',
      isPrivate: false,
      markets: [
        {
          id: '1',
          title: 'Will Bitcoin reach $100k by end of 2024?',
          description: 'Prediction on Bitcoin price reaching $100,000 before December 31, 2024',
          endDate: '2024-12-31',
          totalPool: 2500,
          participants: 18,
          status: 'active',
          category: 'Crypto',
          currentOdds: 65,
          createdBy: 'Alex Chen',
          createdAt: '2024-12-01'
        },
        {
          id: '2',
          title: 'Ethereum 2.0 staking rewards above 5% in 2025?',
          description: 'Will Ethereum staking APY exceed 5% at any point in 2025?',
          endDate: '2025-12-31',
          totalPool: 1800,
          participants: 12,
          status: 'active',
          category: 'Crypto',
          currentOdds: 42,
          createdBy: 'Sarah Kim',
          createdAt: '2024-12-05'
        }
      ]
    },
    {
      id: '2',
      name: 'DeFi Degens',
      description: 'High-risk, high-reward DeFi predictions and yield farming strategies.',
      avatar: '/assets/logo/defi-protocol-logo/Canopy.jpg',
      memberCount: 15,
      activeMarkets: 5,
      totalVolume: 8300,
      owner: 'John Doe',
      members: [
        { id: '1', name: 'John Doe', avatar: '/assets/logo/defi-protocol-logo/Canopy.jpg', isOwner: true },
        { id: '2', name: 'Emma Davis', avatar: '/assets/logo/defi-protocol-logo/MovePosition.jpg' },
        { id: '3', name: 'Ryan Miller', avatar: '/assets/logo/defi-protocol-logo/Layer Bank.jpg' }
      ],
      createdAt: '2024-10-20',
      isPrivate: true,
      markets: [
        {
          id: '3',
          title: 'New DeFi protocol will reach $1B TVL in Q1 2025?',
          description: 'Will any new DeFi protocol launched in 2024 reach $1 billion total value locked by March 2025?',
          endDate: '2025-03-31',
          totalPool: 3200,
          participants: 14,
          status: 'active',
          category: 'DeFi',
          currentOdds: 28,
          createdBy: 'John Doe',
          createdAt: '2024-11-20'
        }
      ]
    },
    {
      id: '3',
      name: 'Market Makers',
      description: 'Professional traders and analysts predicting market movements and economic events.',
      avatar: '/assets/logo/defi-protocol-logo/MovePosition.jpg',
      memberCount: 32,
      activeMarkets: 12,
      totalVolume: 25600,
      owner: 'Maria Garcia',
      members: [
        { id: '1', name: 'Maria Garcia', avatar: '/assets/logo/defi-protocol-logo/MovePosition.jpg', isOwner: true },
        { id: '2', name: 'David Lee', avatar: '/assets/logo/defi-protocol-logo/Layer Bank.jpg' },
        { id: '3', name: 'Sophie Turner', avatar: '/assets/logo/defi-protocol-logo/Canopy.jpg' },
        { id: '4', name: 'James Wilson', avatar: '/assets/logo/defi-protocol-logo/MovePosition.jpg' }
      ],
      createdAt: '2024-09-10',
      isPrivate: false,
      markets: [
        {
          id: '4',
          title: 'S&P 500 will hit 6000 before 2025?',
          description: 'Will the S&P 500 index reach 6000 points before January 1, 2025?',
          endDate: '2024-12-31',
          totalPool: 5000,
          participants: 28,
          status: 'active',
          category: 'Markets',
          currentOdds: 73,
          createdBy: 'Maria Garcia',
          createdAt: '2024-11-10'
        },
        {
          id: '5',
          title: 'Fed will cut rates 3 times in 2024?',
          description: 'Will the Federal Reserve cut interest rates at least 3 times during 2024?',
          endDate: '2024-12-31',
          totalPool: 4200,
          participants: 22,
          status: 'closed',
          category: 'Economics',
          createdBy: 'David Lee',
          createdAt: '2024-08-15'
        }
      ]
    }
  ];

  const displayGroups = groups.length > 0 ? groups : defaultGroups;

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
              style={{
                backgroundImage: "url('/assets/main/background/bg-flower.png')",
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
                    <div className="flex items-center gap-1">
                      <h1 className="text-2xl font-medium text-pink-900">
                        {selectedGroup ? selectedGroup.name : 'Groups'}
                      </h1>
                      <Image
                        src="/assets/landing/cards/no-loss.png"
                        alt="Groups Icon"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center mt-1">
                    {selectedGroup 
                      ? 'View and manage prediction markets created by this group.'
                      : 'Join groups and participate in their prediction markets.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-100">
          {selectedGroup ? (
            <GroupMarkets 
              group={selectedGroup}
              onMarketClick={handleMarketClick}
            />
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">All Groups</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{displayGroups.length} groups available</span>
                </div>
              </div>

              {displayGroups.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayGroups.map(group => (
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
  );
};