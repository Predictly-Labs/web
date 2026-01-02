"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetGroups } from "@/hooks/useGetGroups";
import Sidebar from "../../../ui/Sidebar";
import { GroupData } from "@/types/group";
import { CreateGroupForm } from "./CreateGroupForm";
import { JoinGroupForm } from "./JoinGroupForm";
import { GroupsHeader } from "./sections/GroupsHeader";
import { GroupsActions } from "./sections/GroupsActions";
import { GroupsGrid } from "./sections/GroupsGrid";
import { LoadingGrid } from "./sections/LoadingGrid";
import { EmptyGroupsState } from "./sections/EmptyGroupsState";
import { 
  useTransformedGroups,
  useGroupsLoading,
  useGroupsError,
  useCreateForm,
  useJoinForm,
  useGroupsActions
} from "@/hooks/useGroupsState";

interface GroupsProps {
  onGroupClick?: (group: GroupData) => void;
  groups?: GroupData[];
}

export const Groups: React.FC<GroupsProps> = ({
  onGroupClick,
  groups = [],
}) => {
  const router = useRouter();
  const { getGroups, groups: apiGroups, isLoading, error } = useGetGroups();
  
  const displayGroups = useTransformedGroups();
  const { isLoading: globalLoading } = useGroupsLoading();
  const { error: globalError } = useGroupsError();
  const { showCreateForm } = useCreateForm();
  const { showJoinForm } = useJoinForm();
  const { 
    handleCreateGroup,
    handleJoinGroup,
    handleFormSuccess,
    handleCloseCreateForm,
    handleCloseJoinForm,
    updateApiGroups,
    updateLoading,
    updateError,
    updateGroups
  } = useGroupsActions();

  useEffect(() => {
    updateLoading(true);
    getGroups({ page: 1, limit: 20 })
      .then(() => {
        updateApiGroups(apiGroups);
        updateLoading(false);
      })
      .catch((err) => {
        updateError(err.message);
        updateLoading(false);
      });
  }, [getGroups, updateApiGroups, updateLoading, updateError]);

  useEffect(() => {
    if (groups.length > 0) {
      updateGroups(groups);
    }
  }, [groups, updateGroups]);

  useEffect(() => {
    updateApiGroups(apiGroups);
  }, [apiGroups, updateApiGroups]);

  useEffect(() => {
    updateLoading(isLoading);
  }, [isLoading, updateLoading]);

  useEffect(() => {
    updateError(error);
  }, [error, updateError]);


  const handleGroupClick = (group: GroupData) => {
    router.push(`/app/groups/${group.id}`);
    onGroupClick?.(group);
  };

  const handleFormSuccessWithRefresh = () => {
    handleFormSuccess();
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

              {(globalError || error) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{globalError || error}</p>
                </div>
              )}

              {(globalLoading || isLoading) ? (
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
        onClose={handleCloseCreateForm}
        onSuccess={handleFormSuccessWithRefresh}
      />

      <JoinGroupForm
        isOpen={showJoinForm}
        onClose={handleCloseJoinForm}
        onSuccess={handleFormSuccessWithRefresh}
      />
    </div>
  );
};