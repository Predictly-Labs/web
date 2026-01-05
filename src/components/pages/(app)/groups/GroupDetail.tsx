"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Users, TrendingUp, Clock, Settings, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetGroup } from "@/hooks/useGetGroupbyId";
import { useGetGroupMarkets } from "@/hooks/useGetGroupMarkets";
import { useGetGroupMembers } from "@/hooks/useGetGroupMembers";
import Sidebar from "../../../ui/Sidebar";
import Image from "next/image";
import { JudgeManagement } from "./JudgeManagement";

interface GroupMarket {
  id: string;
  onChainId: string | null;
  groupId: string;
  title: string;
  description: string;
  imageUrl: string | null;
  marketType: string;
  endDate: string;
  minStake: number;
  maxStake: number;
  status: string;
  outcome: string | null;
  totalVolume: number;
  yesPool: number;
  noPool: number;
  yesPercentage: number;
  noPercentage: number;
  participantCount: number;
  resolvedById: string | null;
  resolvedAt: string | null;
  resolutionNote: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    walletAddress: string;
    displayName: string;
    avatarUrl: string;
  };
}

interface MarketCardProps {
  market: GroupMarket;
  onClick?: (market: GroupMarket) => void;
  groupName?: string;
}

interface GroupDetailProps {
  groupId: string;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onClick, groupName }) => {
  const handleClick = () => {
    onClick?.(market);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'numeric',
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' };
      case 'CLOSED': return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Closed' };
      case 'PENDING': return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
    }
  };

  const statusConfig = getStatusConfig(market.status);

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {market.imageUrl && (
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={market.imageUrl}
                alt={market.title}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
              {market.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-1">
              {market.description}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-md text-xs font-medium ml-2 ${statusConfig.bg} ${statusConfig.text}`}>
          {statusConfig.label}
        </span>
      </div>

      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-2">Group: {groupName || 'Unknown Group'}</div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 font-medium">Yes</span>
            <span className="text-green-600 font-medium">{market.yesPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all" 
              style={{ width: `${market.yesPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-600 font-medium">No</span>
            <span className="text-red-600 font-medium">{market.noPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all" 
              style={{ width: `${market.noPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
          <span>Yes: {market.yesPool} votes</span>
          <span>No: {market.noPool.toFixed(3)} votes</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(market.endDate)}</span>
          <Users className="w-3 h-3 ml-2" />
          <span>{market.participantCount} participants</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <div className="w-4 h-4 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <Image
              src={market.creator?.avatarUrl || '/default-avatar.png'}
              alt={market.creator?.displayName || 'Creator'}
              width={16}
              height={16}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium">{market.creator?.displayName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src="/assets/logo/logo-coin/move-logo.jpeg"
            alt="Move Token"
            width={14}
            height={14}
            className="rounded-full"
          />
          <span className="text-xs font-medium text-gray-900">{market.totalVolume.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
};

export const GroupDetail: React.FC<GroupDetailProps> = ({ groupId }) => {
  const router = useRouter();
  const { getGroup, group, isLoading: isLoadingGroup, error: groupError } = useGetGroup();
  const { getGroupMarkets, markets, isLoading: isLoadingMarkets, error: marketsError } = useGetGroupMarkets();
  const { getGroupMembers, members, isLoading: isLoadingMembers } = useGetGroupMembers();
  const [isJudgeManagementOpen, setIsJudgeManagementOpen] = useState(false);
  const [inviteCodeCopied, setInviteCodeCopied] = useState(false);
  const [activeMarketsPage, setActiveMarketsPage] = useState(1);
  const [closedMarketsPage, setClosedMarketsPage] = useState(1);
  const marketsPerPage = 3;

  useEffect(() => {
    if (groupId) {
      getGroup(groupId);
      getGroupMarkets(groupId, { status: 'ACTIVE', limit: 10, offset: 0 });
      getGroupMembers(groupId);
    }
  }, [groupId, getGroup, getGroupMarkets, getGroupMembers]);

  const handleBackToGroups = () => {
    router.push('/app/groups');
  };

  const handleMarketClick = (market: GroupMarket) => {
    router.push(`/app/${market.id}`);
  };

  const handleCopyInviteCode = async () => {
    if (group?.inviteCode) {
      try {
        await navigator.clipboard.writeText(group.inviteCode);
        setInviteCodeCopied(true);
        setTimeout(() => setInviteCodeCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy invite code:', err);
      }
    }
  };

  if (isLoadingGroup || isLoadingMarkets) {
    return (
      <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <Sidebar />
        <div className="max-w-7xl mx-auto relative z-10 flex items-center justify-center py-20">
          <div className="text-gray-500">Loading group details...</div>
        </div>
      </div>
    );
  }

  if (groupError || marketsError) {
    return (
      <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <Sidebar />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{groupError || marketsError}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <Sidebar />
        <div className="max-w-7xl mx-auto relative z-10 flex items-center justify-center py-20">
          <div className="text-gray-500">Group not found</div>
        </div>
      </div>
    );
  }

  const activeMarkets = markets.filter(m => m.status.toUpperCase() === 'ACTIVE');
  const closedMarkets = markets.filter(m => m.status.toUpperCase() === 'CLOSED');
  const judges = members.filter(member => member.role === 'JUDGE');

  const activeMarketsTotal = Math.ceil(activeMarkets.length / marketsPerPage);
  const activeMarketsStart = (activeMarketsPage - 1) * marketsPerPage;
  const activeMarketsEnd = activeMarketsStart + marketsPerPage;
  const currentActiveMarkets = activeMarkets.slice(activeMarketsStart, activeMarketsEnd);
  const showActiveMarketsPagination = activeMarkets.length > marketsPerPage;

  const closedMarketsTotal = Math.ceil(closedMarkets.length / marketsPerPage);
  const closedMarketsStart = (closedMarketsPage - 1) * marketsPerPage;
  const closedMarketsEnd = closedMarketsStart + marketsPerPage;
  const currentClosedMarkets = closedMarkets.slice(closedMarketsStart, closedMarketsEnd);
  const showClosedMarketsPagination = closedMarkets.length > marketsPerPage;

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
              <div className="relative z-10 flex items-center justify-center gap-4 p-4 sm:p-6">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={handleBackToGroups}
                      className="p-2 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-pink-900" />
                    </button>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-medium text-pink-900">
                        {group.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-500 text-center mt-2">
                    View and manage prediction markets created by this group.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
          <div
            className="space-y-6 sm:space-y-8 relative p-4 sm:p-6 rounded-3xl overflow-hidden min-h-[calc(100vh-200px)]"
            style={{
              backgroundImage: "url('/assets/main/background/bg-market.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-white/70 h-205"></div>
            <div className="relative z-10 space-y-6">
              
              <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="relative">
                    <img
                      src={group.iconUrl || '/assets/logo/logo.png'}
                      alt={group.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/main/background/bg-flower.png';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{group.name}</h1>
                    {group.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{group.description}</p>
                    )}
                    
                    {group.inviteCode && (
                      <div className="bg-gray-50 rounded-lg p-2 mb-4 max-w-[10rem]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-gray-500">Invite Code:</span>
                          <button
                            onClick={handleCopyInviteCode}
                            className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                            title={inviteCodeCopied ? "Copied!" : "Copy invite code"}
                          >
                            <Copy className={`w-4 h-4 ${inviteCodeCopied ? 'text-green-600' : 'text-gray-600'}`} />
                          </button>
                        </div>
                        <code className="text-xs font-mono bg-white px-2 py-1 rounded border text-gray-900 block mt-1">
                          {group.inviteCode}
                        </code>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        {group.members?.length || 0}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Members</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        {markets.length}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Total Markets</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        {activeMarkets.length}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Active</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setIsJudgeManagementOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <Settings className="w-4 h-4" />
                      Manage Resolver
                    </button>
                    
                    {judges.length > 0 && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Current Groups Resolver :</span>
                        <div className="flex items-center gap-2">
                          {judges.slice(0, 3).map((judge) => (
                            <div key={judge.id} className="flex items-center gap-1">
                              <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                <Image
                                  src={judge.user.avatarUrl || '/default-avatar.png'}
                                  alt={judge.user.displayName}
                                  width={24}
                                  height={24}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {judge.user.displayName}
                              </span>
                            </div>
                          ))}
                          {judges.length > 3 && (
                            <span className="text-sm text-gray-500">
                              +{judges.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {activeMarkets.length > 0 && (
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    Active Markets ({activeMarkets.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentActiveMarkets.map(market => (
                      <MarketCard 
                        key={market.id} 
                        market={market}
                        onClick={handleMarketClick}
                        groupName={group?.name}
                      />
                    ))}
                  </div>
                  
                  {showActiveMarketsPagination && (
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-6 p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 text-center sm:text-left">
                        Showing {activeMarketsStart + 1}-{Math.min(activeMarketsEnd, activeMarkets.length)} of {activeMarkets.length} markets
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setActiveMarketsPage(prev => Math.max(prev - 1, 1))}
                          disabled={activeMarketsPage === 1}
                          className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        <div className="flex items-center gap-1">
                          {Array.from({ length: activeMarketsTotal }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => setActiveMarketsPage(pageNum)}
                              className={`w-8 h-8 rounded text-xs font-medium transition-colors cursor-pointer ${
                                pageNum === activeMarketsPage
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => setActiveMarketsPage(prev => Math.min(prev + 1, activeMarketsTotal))}
                          disabled={activeMarketsPage === activeMarketsTotal}
                          className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {closedMarkets.length > 0 && (
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    Closed Markets ({closedMarkets.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentClosedMarkets.map(market => (
                      <MarketCard 
                        key={market.id} 
                        market={market}
                        onClick={handleMarketClick}
                        groupName={group?.name}
                      />
                    ))}
                  </div>
                  
                  {showClosedMarketsPagination && (
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-6 p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 text-center sm:text-left">
                        Showing {closedMarketsStart + 1}-{Math.min(closedMarketsEnd, closedMarkets.length)} of {closedMarkets.length} markets
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setClosedMarketsPage(prev => Math.max(prev - 1, 1))}
                          disabled={closedMarketsPage === 1}
                          className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        <div className="flex items-center gap-1">
                          {Array.from({ length: closedMarketsTotal }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => setClosedMarketsPage(pageNum)}
                              className={`w-8 h-8 rounded text-xs font-medium transition-colors cursor-pointer ${
                                pageNum === closedMarketsPage
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => setClosedMarketsPage(prev => Math.min(prev + 1, closedMarketsTotal))}
                          disabled={closedMarketsPage === closedMarketsTotal}
                          className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {markets.length === 0 && (
                <div className="text-center py-16">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Markets Yet</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    This group has not created any prediction markets yet. Be the first to create one!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <JudgeManagement
          groupId={groupId}
          isOpen={isJudgeManagementOpen}
          onClose={() => setIsJudgeManagementOpen(false)}
        />
      </div>
    </div>
  );
};