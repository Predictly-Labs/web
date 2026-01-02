import Image from "next/image"
import { BsPencil } from "react-icons/bs"

interface ProfileStatsProps {
  user?: any
  moveBalance?: any
  votesStats?: any
  isLoadingStats: boolean
  isLoadingBalance: boolean
  onEditProfile: () => void
}

export const ProfileStats = ({ 
  user, 
  moveBalance, 
  votesStats, 
  isLoadingStats,
  isLoadingBalance,
  onEditProfile 
}: ProfileStatsProps) => {
  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
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
              • {votesStats?.totalVotes || 0} predictions
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
            onClick={onEditProfile}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <BsPencil className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">
            Wallet Balance
          </div>
          <div className="flex items-center gap-1 text-2xl font-light text-gray-900">
            <Image
              src="/assets/logo/logo-coin/move-logo.jpeg"
              alt="Move Token"
              width={20}
              height={20}
              className="rounded-full"
            />
            {moveBalance?.balance ? Math.floor(moveBalance.balance).toString() : "0"}
          </div>
        </div>
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
  )
}