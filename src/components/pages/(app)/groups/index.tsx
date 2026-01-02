"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetGroups } from "@/hooks/useGetGroups";
import Sidebar from "../../../ui/Sidebar";
import { GroupData, ApiGroup } from "@/types/group";
import { CreateGroupForm } from "./CreateGroupForm";
import { JoinGroupForm } from "./JoinGroupForm";
import { GroupsHeader } from "./sections/GroupsHeader";
import { GroupsActions } from "./sections/GroupsActions";
import { GroupsGrid } from "./sections/GroupsGrid";
import { LoadingGrid } from "./sections/LoadingGrid";
import { EmptyGroupsState } from "./sections/EmptyGroupsState";

interface GroupsProps {
  onGroupClick?: (group: GroupData) => void;
  groups?: GroupData[];
}

export const Groups: React.FC<GroupsProps> = ({
  onGroupClick,
  groups = [],
}) => {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const { getGroups, groups: apiGroups, isLoading, error } = useGetGroups();

  useEffect(() => {
    getGroups({ page: 1, limit: 20 });
  }, [getGroups]);

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
        iconUrl: group.iconUrl,
        inviteCode: undefined,
        isPublic: group.isPublic,
        createdById: undefined,
        updatedAt: undefined,
        createdBy: undefined,
        _count: group._count,
        userRole: undefined,
        isMember: false,
        stats: {
          memberCount,
          activeMarkets,
          totalVolume,
        },
      };
    });
  };

  const displayGroups =
    groups.length > 0 ? groups : transformApiGroups(apiGroups);

  const handleGroupClick = (group: GroupData) => {
    router.push(`/app/groups/${group.id}`);
    onGroupClick?.(group);
  };

  const handleCreateGroup = () => setShowCreateForm(true);
  const handleJoinGroup = () => setShowJoinForm(true);

  const handleFormSuccess = () => {
    setShowCreateForm(false);
    setShowJoinForm(false);
    getGroups({ page: 1, limit: 20 });
  };

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />

      <div className="max-w-7xl mx-auto relative z-10">
        <GroupsHeader />

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 border border-gray-100">
          <div
            className="space-y-8 relative p-6 rounded-3xl overflow-hidden min-h-[calc(100vh-200px)]"
            style={{
              backgroundImage: "url('/assets/main/background/bg-market.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-white/70 h-192"></div>
            <div className="relative z-10">
              <GroupsActions
                onJoinGroup={handleJoinGroup}
                onCreateGroup={handleCreateGroup}
                groupCount={displayGroups.length}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {isLoading ? (
                <LoadingGrid />
              ) : displayGroups.length > 0 ? (
                <GroupsGrid groups={displayGroups} onGroupClick={handleGroupClick} />
              ) : (
                <EmptyGroupsState />
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateGroupForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSuccess={handleFormSuccess}
      />

      <JoinGroupForm
        isOpen={showJoinForm}
        onClose={() => setShowJoinForm(false)}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};