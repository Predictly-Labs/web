"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useGetUserStats } from "@/hooks/useGetUserStats";
import { useGetMyGroups } from "@/hooks/useGetMyGroups";
import { useGetMyVotes } from "@/hooks/useGetMyVotes";
import { useGetMyVotesStats } from "@/hooks/useGetMyVotesStats";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import { useGetMoveBalance } from "@/hooks/useGetMoveBalance";
import { toast } from "sonner";
import { ProfileHeader } from "./sections/ProfileHeader";
import { ProfileStats } from "./sections/ProfileStats";
import { PositionsTab } from "./sections/PositionsTab";
import { ActivityTab } from "./sections/ActivityTab";
import { ProfileSidebar } from "./sections/ProfileSidebar";
import { EditProfileModal } from "./sections/EditProfileModal";
import {
  useActiveTab,
  useEditModal,
  useProfileActions
} from "@/hooks/useProfileState";

interface ActivityData {
  day: string;
  value: number;
}

const activityData: ActivityData[] = [
  { day: "Mon", value: 20 },
  { day: "Tue", value: 35 },
  { day: "Wed", value: 15 },
  { day: "Thu", value: 45 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 25 },
  { day: "Sun", value: 40 },
];

export const ProfilePage: React.FC = () => {
  const { user, getProfile, updateUserState } = useAuth();
  const { userStats, fetchUserStats } = useGetUserStats();
  const { getMyGroups, groups, isLoading: isLoadingGroups } = useGetMyGroups();
  const { myVotes, isLoading: isLoadingVotes, fetchMyVotes } = useGetMyVotes();
  const { stats: votesStats, fetchMyVotesStats, isLoading: isLoadingStats } = useGetMyVotesStats();
  const { updateUserProfile, isLoading: isUpdatingProfile, error: updateError } = useUpdateUserProfile();
  const { balance: moveBalance, getMoveBalance, isLoading: isLoadingBalance } = useGetMoveBalance();
  
  const { activeTab } = useActiveTab();
  const {
    isEditModalOpen,
    editForm,
    previewUrl,
    isUpdating,
    updateError: globalUpdateError
  } = useEditModal();
  
  const {
    updateUserStats,
    updateGroups,
    updateMyVotes,
    updateVotesStats,
    updateMoveBalance,
    updateActiveTab,
    openEditModal,
    closeEditModal,
    updateEditForm,
    updatePreviewUrl,
    updateLoadingUserStats,
    updateLoadingGroups,
    updateLoadingVotes,
    updateLoadingVotesStats,
    updateLoadingBalance,
    updateUpdating,
    updateUpdateError
  } = useProfileActions();

  useEffect(() => {
    if (user?.id) {
      updateLoadingUserStats(true);
      updateLoadingGroups(true);
      updateLoadingVotes(true);
      updateLoadingVotesStats(true);
      updateLoadingBalance(true);
      
      fetchUserStats(user.id)
        .then(() => {
          updateUserStats(userStats);
          updateLoadingUserStats(false);
        })
        .catch(() => updateLoadingUserStats(false));
        
      getMyGroups({ limit: 3 })
        .then(() => {
          updateGroups(groups);
          updateLoadingGroups(false);
        })
        .catch(() => updateLoadingGroups(false));
        
      fetchMyVotes({ page: 1, limit: 20 })
        .then(() => {
          updateMyVotes(myVotes);
          updateLoadingVotes(false);
        })
        .catch(() => updateLoadingVotes(false));
        
      fetchMyVotesStats()
        .then(() => {
          updateVotesStats(votesStats);
          updateLoadingVotesStats(false);
        })
        .catch(() => updateLoadingVotesStats(false));
        
      getMoveBalance()
        .then(() => {
          updateMoveBalance(moveBalance);
          updateLoadingBalance(false);
        })
        .catch(() => updateLoadingBalance(false));
    }
  }, [user?.id]);

  useEffect(() => {
    updateUserStats(userStats);
  }, [userStats, updateUserStats]);

  useEffect(() => {
    updateGroups(groups);
  }, [groups, updateGroups]);

  useEffect(() => {
    updateMyVotes(myVotes);
  }, [myVotes, updateMyVotes]);

  useEffect(() => {
    updateVotesStats(votesStats);
  }, [votesStats, updateVotesStats]);

  useEffect(() => {
    updateMoveBalance(moveBalance);
  }, [moveBalance, updateMoveBalance]);

  useEffect(() => {
    updateLoadingGroups(isLoadingGroups);
  }, [isLoadingGroups, updateLoadingGroups]);

  useEffect(() => {
    updateLoadingVotes(isLoadingVotes);
  }, [isLoadingVotes, updateLoadingVotes]);

  useEffect(() => {
    updateLoadingVotesStats(isLoadingStats);
  }, [isLoadingStats, updateLoadingVotesStats]);

  useEffect(() => {
    updateLoadingBalance(isLoadingBalance);
  }, [isLoadingBalance, updateLoadingBalance]);

  useEffect(() => {
    updateUpdating(isUpdatingProfile);
  }, [isUpdatingProfile, updateUpdating]);

  useEffect(() => {
    updateUpdateError(updateError);
  }, [updateError, updateUpdateError]);

  useEffect(() => {
    if (user) {
      updateEditForm({
        displayName: user.displayName || "",
        avatarUrl: user.avatarUrl || ""
      });
      updatePreviewUrl(user.avatarUrl || "");
    }
  }, [user?.displayName, user?.avatarUrl, updateEditForm, updatePreviewUrl]);


  const handleEditProfile = () => {
    openEditModal();
  };

  const handleSaveProfile = async () => {
    if (!editForm.displayName.trim()) {
      toast.error('Display name is required');
      return;
    }

    let avatarUrl = editForm.avatarUrl;
    
    if (previewUrl && previewUrl !== user?.avatarUrl) {
      avatarUrl = previewUrl;
    }

    updateUpdating(true);
    const result = await updateUserProfile({
      displayName: editForm.displayName,
      avatarUrl: avatarUrl
    });
    
    if (result) {
      updateUserState({
        displayName: result.displayName,
        avatarUrl: result.avatarUrl
      });
      
      toast.success('Profile updated successfully');
      closeEditModal();
    } else if (globalUpdateError || updateError) {
      toast.error(globalUpdateError || updateError);
    }
    updateUpdating(false);
  };

  const handleCloseModal = () => {
    closeEditModal();
  };

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />

      <div className="max-w-7xl mx-auto relative z-10">
        <ProfileHeader />

        <div
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-4 border-white h-195"
          style={{
            backgroundImage: "url('/assets/main/background/bg-market.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.8,
          }}
        >
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ProfileStats 
                user={user}
                onEditProfile={handleEditProfile}
              />

              <div className="bg-white rounded-2xl border border-gray-200 h-102">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => updateActiveTab("positions")}
                      className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                        activeTab === "positions"
                          ? "border-gray-900 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Positions
                    </button>
                    <button
                      onClick={() => updateActiveTab("activity")}
                      className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                        activeTab === "activity"
                          ? "border-gray-900 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Activity
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "positions" && <PositionsTab />}
                  {activeTab === "activity" && <ActivityTab />}
                </div>
              </div>
            </div>

            <ProfileSidebar
              activityData={activityData}
            />
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        user={user}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
      />
    </div>
  );
};