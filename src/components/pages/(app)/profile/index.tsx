"use client";

import React, { useEffect, useState } from "react";
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
  const { user } = useAuth();
  const { userStats, fetchUserStats } = useGetUserStats();
  const { getMyGroups, groups, isLoading: isLoadingGroups } = useGetMyGroups();
  const { myVotes, isLoading: isLoadingVotes, fetchMyVotes } = useGetMyVotes();
  const { stats: votesStats, fetchMyVotesStats, isLoading: isLoadingStats } = useGetMyVotesStats();
  const { updateUserProfile, isLoading: isUpdatingProfile, error: updateError } = useUpdateUserProfile();
  const { balance: moveBalance, getMoveBalance, isLoading: isLoadingBalance } = useGetMoveBalance();
  const [activeTab, setActiveTab] = useState<"positions" | "activity">("positions");
  const [activeFilter, setActiveFilter] = useState<"active" | "closed">("active");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ displayName: "", avatarUrl: "" });
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (user?.id) {
      fetchUserStats(user.id);
      getMyGroups({ limit: 3 });
      fetchMyVotes({ page: 1, limit: 20 });
      fetchMyVotesStats();
      getMoveBalance();
      setEditForm({
        displayName: user.displayName || "",
        avatarUrl: user.avatarUrl || ""
      });
      setPreviewUrl(user.avatarUrl || "");
    }
  }, [user, fetchUserStats, getMyGroups, fetchMyVotes, fetchMyVotesStats, getMoveBalance]);


  const handleEditProfile = () => {
    setIsEditModalOpen(true);
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

    const result = await updateUserProfile({
      displayName: editForm.displayName,
      avatarUrl: avatarUrl
    });
    
    if (result) {
      toast.success('Profile updated successfully');
      setIsEditModalOpen(false);
      setPreviewUrl("");
      window.location.reload();
    } else if (updateError) {
      toast.error(updateError);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setPreviewUrl(user?.avatarUrl || "");
    setEditForm({
      displayName: user?.displayName || "",
      avatarUrl: user?.avatarUrl || ""
    });
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
                moveBalance={moveBalance}
                votesStats={votesStats}
                isLoadingStats={isLoadingStats}
                isLoadingBalance={isLoadingBalance}
                onEditProfile={handleEditProfile}
              />

              <div className="bg-white rounded-2xl border border-gray-200 h-102">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab("positions")}
                      className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                        activeTab === "positions"
                          ? "border-gray-900 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Positions
                    </button>
                    <button
                      onClick={() => setActiveTab("activity")}
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
                  {activeTab === "positions" && (
                    <PositionsTab
                      myVotes={myVotes}
                      activeFilter={activeFilter}
                      setActiveFilter={setActiveFilter}
                      isLoadingVotes={isLoadingVotes}
                    />
                  )}

                  {activeTab === "activity" && (
                    <ActivityTab
                      myVotes={myVotes}
                      isLoadingVotes={isLoadingVotes}
                    />
                  )}
                </div>
              </div>
            </div>

            <ProfileSidebar
              groups={groups}
              isLoadingGroups={isLoadingGroups}
              activityData={activityData}
            />
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        user={user}
        editForm={editForm}
        setEditForm={setEditForm}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        isUpdatingProfile={isUpdatingProfile}
      />
    </div>
  );
};