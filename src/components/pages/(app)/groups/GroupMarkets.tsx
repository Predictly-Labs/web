"use client";

import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, Clock, DollarSign, Target, Copy, Shield, Globe, Lock, Crown, Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { MarketData, GroupMemberData } from '@/types/group';

interface DetailedGroupData {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  inviteCode: string;
  isPublic: boolean;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    displayName: string;
    avatarUrl: string;
  };
  members: GroupMemberData[];
  markets: MarketData[];
  _count: {
    members: number;
    markets: number;
  };
  userRole: string | null;
  isMember: boolean;
  stats: {
    memberCount: number;
    totalMarkets: number;
  };
  // Legacy support
  avatar?: string;
}

interface MarketCardProps {
  market: MarketData;
  groupName: string;
  onClick?: (market: MarketData) => void;
}

interface GroupMarketsProps {
  group: DetailedGroupData;
  onMarketClick?: (market: MarketData) => void;
}

interface StatusBadgeProps {
  status: MarketData['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: MarketData['status']) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' };
      case 'closed': return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Closed' };
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Unknown' };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

const MarketCard: React.FC<MarketCardProps> = ({ market, groupName, onClick }) => {
  const handleClick = () => {
    onClick?.(market);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const formatPool = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount}`;
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {market.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {market.description}
          </p>
        </div>
        <StatusBadge status={market.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Ends {formatDate(market.endDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{market.participants} participants</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>{formatPool(market.totalPool)} pool</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Target className="w-4 h-4" />
          <span>{market.category}</span>
        </div>
      </div>

      {market.currentOdds && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 font-medium">Current Odds</span>
            <span className="text-lg font-bold text-blue-800">{market.currentOdds}%</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Created by <span className="font-medium text-gray-700">{market.createdBy}</span> • {formatDate(market.createdAt)}
        </div>
        <div className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View Market →
        </div>
      </div>
    </div>
  );
};

const GroupInfoHeader: React.FC<{ group: DetailedGroupData }> = ({ group }) => {
  const [copiedInvite, setCopiedInvite] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(group.inviteCode);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  const groupIcon = group.iconUrl || group.avatar || '/assets/logo/logo.png';

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      {/* Main Group Header */}
      <div className="flex items-start gap-6">
        <div className="relative">
          <img
            src={groupIcon}
            alt={group.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-200"
            onError={(e) => {
              e.currentTarget.src = '/assets/main/background/bg-flower.png';
            }}
          />
          <div className="absolute -bottom-1 -right-1">
            {group.isPublic ? (
              <div className="bg-green-100 border-2 border-white rounded-full p-1">
                <Globe className="w-3 h-3 text-green-600" />
              </div>
            ) : (
              <div className="bg-yellow-100 border-2 border-white rounded-full p-1">
                <Lock className="w-3 h-3 text-yellow-600" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{group.name}</h1>
              {group.description && (
                <p className="text-gray-600 text-sm leading-relaxed">{group.description}</p>
              )}
            </div>
            {!group.isPublic && group.inviteCode && (
              <button
                onClick={copyInviteCode}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                title="Copy invite code"
              >
                <Copy className="w-4 h-4" />
                {copiedInvite ? 'Copied!' : group.inviteCode}
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            {group.createdAt && (
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                Created {formatDate(group.createdAt)}
              </div>
            )}
            <div className="flex items-center gap-1">
              {group.isPublic !== false ? (
                <>
                  <Globe className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Public</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-yellow-600" />
                  <span className="text-yellow-600">Private</span>
                </>
              )}
            </div>
          </div>

          {/* Group Creator */}
          {group.createdBy && (
            <div className="flex items-center gap-2">
              <img
                src={group.createdBy.avatarUrl || '/assets/main/background/bg-flower.png'}
                alt={group.createdBy.displayName || 'Creator'}
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets/main/background/bg-flower.png';
                }}
              />
              <span className="text-sm text-gray-600">
                Created by <span className="font-medium text-gray-900">{group.createdBy.displayName || 'Unknown'}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">
              {group.stats?.memberCount || group._count?.members || group.members?.length || 0}
            </span>
          </div>
          <p className="text-xs text-gray-600">Members</p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-gray-900">
              {group.stats?.totalMarkets || group._count?.markets || group.markets?.length || 0}
            </span>
          </div>
          <p className="text-xs text-gray-600">Markets</p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-lg font-bold text-gray-900">
              {(group.markets || []).filter(m => m.status === 'active').length}
            </span>
          </div>
          <p className="text-xs text-gray-600">Active</p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-purple-600" />
            <span className="text-lg font-bold text-gray-900">{group.userRole || 'Guest'}</span>
          </div>
          <p className="text-xs text-gray-600">Your Role</p>
        </div>
      </div>

      {/* Members Section */}
      {group.members && group.members.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Members ({group.members.length})
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {group.members.slice(0, 8).map((member) => (
                <div
                  key={member.id}
                  className="relative"
                  title={`${member.user.displayName} (${member.role})`}
                >
                  <img
                    src={member.user.avatarUrl}
                    alt={member.user.displayName}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/main/background/bg-flower.png';
                    }}
                  />
                  {member.role === 'ADMIN' && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 border border-white rounded-full p-0.5">
                      <Crown className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {group.members.length > 8 && (
                <div className="w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    +{group.members.length - 8}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const GroupMarkets: React.FC<GroupMarketsProps> = ({ group, onMarketClick }) => {
  const activeMarkets = group.markets.filter(m => m.status === 'active');
  const closedMarkets = group.markets.filter(m => m.status === 'closed');

  const handleMarketClick = (market: MarketData) => {
    onMarketClick?.(market);
  };

  return (
    <div className="space-y-6">
      <GroupInfoHeader group={group} />

      {activeMarkets.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-green-500" />
            Active Markets ({activeMarkets.length})
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeMarkets.map(market => (
              <MarketCard 
                key={market.id} 
                market={market}
                groupName={group.name}
                onClick={handleMarketClick}
              />
            ))}
          </div>
        </section>
      )}

      {closedMarkets.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-gray-500" />
            Closed Markets ({closedMarkets.length})
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {closedMarkets.map(market => (
              <MarketCard 
                key={market.id} 
                market={market}
                groupName={group.name}
                onClick={handleMarketClick}
              />
            ))}
          </div>
        </section>
      )}

      {group.markets.length === 0 && (
        <div className="text-center py-16">
          <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Markets Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            This group hasn't created any prediction markets yet. Be the first to create one!
          </p>
        </div>
      )}
    </div>
  );
};