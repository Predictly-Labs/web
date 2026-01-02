"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/ui/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useGetUserStats } from "@/hooks/useGetUserStats";
import { useGetMyGroups } from "@/hooks/useGetMyGroups";
import { useGetMyVotes } from "@/hooks/useGetMyVotes";
import { useGetMyVotesStats } from "@/hooks/useGetMyVotesStats";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import { BsSearch, BsPencil } from "react-icons/bs";
import { toast } from "sonner";
import { X, Upload } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"positions" | "activity">(
    "positions"
  );
  const [activeFilter, setActiveFilter] = useState<"active" | "closed">(
    "active"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ displayName: "", avatarUrl: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [stats, setStats] = useState({
    totalPredictions: 0,
    correctPredictions: 0,
    totalEarnings: 0,
    currentStreak: 0,
    accuracy: 0,
  });

  useEffect(() => {
    if (user?.id) {
      fetchUserStats(user.id);
      getMyGroups({ limit: 3 });
      fetchMyVotes({ page: 1, limit: 20 });
      fetchMyVotesStats();
      setEditForm({
        displayName: user.displayName || "",
        avatarUrl: user.avatarUrl || ""
      });
      setPreviewUrl(user.avatarUrl || "");
    }
  }, [user, fetchUserStats, getMyGroups, fetchMyVotes, fetchMyVotesStats]);

  useEffect(() => {
    if (userStats) {
      setStats({
        ...userStats,
        totalPredictions: user?.totalPredictions || userStats.totalPredictions || 0
      });
    } else if (user) {
      setStats(prev => ({
        ...prev,
        totalPredictions: user.totalPredictions
      }));
    }
  }, [userStats, user]);

  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const getFilteredVotes = () => {
    return myVotes.filter(vote => {
      if (activeFilter === 'active') {
        return vote.market.status.toLowerCase() === 'active';
      } else {
        return vote.market.status.toLowerCase() === 'closed';
      }
    });
  };

  const getStatusColor = (prediction: 'YES' | 'NO') => {
    return prediction === 'YES' 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!editForm.displayName.trim()) {
      toast.error('Display name is required');
      return;
    }

    let avatarUrl = editForm.avatarUrl;
    
    if (selectedFile) {
      avatarUrl = previewUrl;
    }

    const result = await updateUserProfile({
      displayName: editForm.displayName,
      avatarUrl: avatarUrl
    });
    
    if (result) {
      toast.success('Profile updated successfully');
      setIsEditModalOpen(false);
      setSelectedFile(null);
      setPreviewUrl("");
      window.location.reload();
    } else if (updateError) {
      toast.error(updateError);
    }
  };

  const handleFormChange = (field: 'displayName' | 'avatarUrl', value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(user?.avatarUrl || "");
    setEditForm({
      displayName: user?.displayName || "",
      avatarUrl: user?.avatarUrl || ""
    });
  };

  const maxValue = Math.max(...activityData.map((d) => d.value));

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="relative mb-6">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                backgroundImage: "url('/assets/main/background/bg-main.png')",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-4 p-6">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-medium text-pink-900">
                      Profile
                    </h1>
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center max-w-2xl">
                    Your prediction market statistics and performance overview
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16">
                      {user?.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt={user.displayName || "User"}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-500 text-xl font-light">
                            {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h1 className="text-xl font-light text-gray-900 mb-1">
                        {user?.displayName || "Anonymous User"}
                      </h1>
                      <div className="text-sm text-gray-500 mb-2">
                        {user?.walletAddress && formatWalletAddress(user.walletAddress)} •{" "}
                        Joined{" "}
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "short", year: "numeric" }
                            )
                          : "Unknown"}{" "}
                        • {votesStats?.totalVotes || stats.totalPredictions || 0} predictions
                      </div>
                      <div className="w-[45%]">
                        <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          Free version
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleEditProfile}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <BsPencil className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Total Invested
                    </div>
                    <div className="flex items-center gap-1 text-2xl font-light text-gray-900">
                      <Image
                        src="/assets/logo/logo-coin/move-logo.jpeg"
                        alt="Move Token"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      {isLoadingStats ? "..." : votesStats?.totalInvested?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Total Earnings
                    </div>
                    <div className="flex items-center gap-1 text-2xl font-light text-gray-900">
                      <Image
                        src="/assets/logo/logo-coin/move-logo.jpeg"
                        alt="Move Token"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      {isLoadingStats ? "..." : votesStats?.totalEarnings?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      ROI
                    </div>
                    <div className={`text-2xl font-light ${(votesStats?.roi || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {isLoadingStats ? "..." : `${((votesStats?.roi || 0) * 100).toFixed(1)}%`}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Win Rate
                    </div>
                    <div className="text-2xl font-light text-gray-900">
                      {isLoadingStats ? "..." : `${((votesStats?.winRate || 0) * 100).toFixed(1)}%`}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Active Votes
                    </div>
                    <div className="text-lg font-light text-gray-900">
                      {isLoadingStats ? "..." : votesStats?.activeVotes || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Won / Lost
                    </div>
                    <div className="text-lg font-light text-gray-900">
                      {isLoadingStats ? "..." : `${votesStats?.wonVotes || 0} / ${votesStats?.lostVotes || 0}`}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Avg Stake
                    </div>
                    <div className="flex items-center gap-1 text-lg font-light text-gray-900">
                      <Image
                        src="/assets/logo/logo-coin/move-logo.jpeg"
                        alt="Move Token"
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                      {isLoadingStats ? "..." : votesStats?.averageStake?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                </div>
              </div>

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
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setActiveFilter("active")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                              activeFilter === "active"
                                ? "bg-gray-100 text-gray-900"
                                : "bg-gray-50 text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            Active
                          </button>
                          <button
                            onClick={() => setActiveFilter("closed")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                              activeFilter === "closed"
                                ? "bg-gray-100 text-gray-900"
                                : "bg-gray-50 text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            Closed
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search positions"
                              className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300"
                            />
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                            <span>⚖</span>
                            Value
                          </button>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-700 uppercase tracking-wider">
                          <div>Market</div>
                          <div className="text-right">Prediction</div>
                          <div className="text-right">Amount</div>
                          <div className="text-right">Date</div>
                        </div>

                        {isLoadingVotes ? (
                          <div className="p-8 text-center bg-white">
                            <div className="text-gray-500 text-sm">
                              Loading positions...
                            </div>
                          </div>
                        ) : getFilteredVotes().length === 0 ? (
                          <div className="p-8 text-center bg-white">
                            <div className="text-gray-500 text-sm">
                              No {activeFilter} positions found
                            </div>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-100">
                            {getFilteredVotes().map((vote) => (
                              <div key={vote.id} className="grid grid-cols-4 gap-4 px-6 py-4 bg-white hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                  {vote.market.imageUrl && (
                                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-200">
                                      <Image
                                        src={vote.market.imageUrl}
                                        alt={vote.market.title}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                      {vote.market.title}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {vote.market.marketType}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vote.prediction)}`}>
                                    {vote.prediction}
                                  </span>
                                </div>
                                
                                <div className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Image
                                      src="/assets/logo/logo-coin/move-logo.jpeg"
                                      alt="Move Token"
                                      width={12}
                                      height={12}
                                      className="rounded-full"
                                    />
                                    <span className="text-sm font-medium text-gray-900">
                                      {vote.amount}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <div className="text-sm text-gray-900">
                                    {new Date(vote.createdAt).toLocaleDateString()}
                                  </div>
                                </div>

                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {activeTab === "activity" && (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                      </div>
                      
                      {isLoadingVotes ? (
                        <div className="p-8 text-center">
                          <div className="text-gray-500 text-sm">
                            Loading activity...
                          </div>
                        </div>
                      ) : myVotes.length === 0 ? (
                        <div className="p-8 text-center">
                          <div className="text-gray-500 text-sm">
                            No activity found
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {myVotes.slice(0, 10).map((vote) => (
                            <div key={vote.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                              <div className="flex-shrink-0">
                                {vote.market.imageUrl && (
                                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200">
                                    <Image
                                      src={vote.market.imageUrl}
                                      alt={vote.market.title}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                  Placed {vote.prediction} vote on "{vote.market.title}"
                                </div>
                                <div className="text-sm text-gray-500">
                                  {vote.market.group?.name && `in ${vote.market.group.name} • `}
                                  {new Date(vote.createdAt).toLocaleString()}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                                  <Image
                                    src="/assets/logo/logo-coin/move-logo.jpeg"
                                    alt="Move Token"
                                    width={14}
                                    height={14}
                                    className="rounded-full"
                                  />
                                  {vote.amount}
                                </div>
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vote.prediction)}`}>
                                  {vote.prediction}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">Profit/Loss</div>
                  <div className="flex gap-1 text-xs">
                    <button className="px-2 py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                      1D
                    </button>
                    <button className="px-2 py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                      1W
                    </button>
                    <button className="px-2 py-1 bg-gray-100 text-gray-900 rounded cursor-pointer">
                      1M
                    </button>
                    <button className="px-2 py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                      ALL
                    </button>
                  </div>
                </div>

                <div className="text-2xl font-light text-gray-900 mb-1">
                  $0.00
                </div>
                <div className="text-sm text-gray-500 mb-6">Past Month</div>

                <div className="h-32 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                  <div className="flex items-end gap-1 h-16">
                    {activityData.map((item, index) => (
                      <div
                        key={item.day}
                        className="bg-gray-300 w-3 rounded-t transition-all duration-300"
                        style={{ height: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-400 text-right">
                  Polymarket
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 mt-6">
                <h3 className="text-sm text-gray-500 mb-4">My Groups</h3>
                {isLoadingGroups ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : groups.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-gray-500 text-xs">No groups found</div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                      {groups.slice(0, 3).map((group) => (
                        <div key={group.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="relative w-10 h-10 sm:w-8 sm:h-8 shrink-0">
                            {group.iconUrl ? (
                              <Image
                                src={group.iconUrl}
                                alt={group.name}
                                fill
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 text-xs font-medium">
                                  {group.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {group.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {group.stats.memberCount} member{group.stats.memberCount !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {groups.length > 3 && (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                          View all groups ({groups.length})
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Profile Preview"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={() => setPreviewUrl("")}
                      />
                    ) : user?.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt="Current Avatar"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={() => setPreviewUrl("")}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-light">
                          {editForm.displayName?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <BsPencil className="w-4 h-4 text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Click the pencil to upload photo</p>
                  <p className="text-xs text-gray-400">Maximum file size: 5MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editForm.displayName}
                  onChange={(e) => handleFormChange('displayName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                  placeholder="Enter your display name"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 p-6">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isUpdatingProfile || !editForm.displayName.trim()}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer font-medium"
                >
                  {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
