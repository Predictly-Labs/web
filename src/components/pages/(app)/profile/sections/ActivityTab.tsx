import Image from "next/image"
import { useMyVotes } from "@/hooks/useProfileState"

export const ActivityTab = () => {
  const { recentActivity, isLoading: isLoadingVotes } = useMyVotes();
  const getStatusColor = (prediction: 'YES' | 'NO') => {
    return prediction === 'YES' 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  return (
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
      ) : recentActivity.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-gray-500 text-sm">
            No activity found
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {recentActivity.map((vote) => (
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
  )
}