import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useMyVotes } from "@/hooks/useProfileState"

export const ActivityTab = () => {
  const { recentActivity, isLoading: isLoadingVotes } = useMyVotes();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  const getStatusColor = (prediction: 'YES' | 'NO') => {
    return prediction === 'YES' 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  const totalPages = Math.ceil(recentActivity.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivity = recentActivity.slice(startIndex, endIndex);
  const showPagination = recentActivity.length > itemsPerPage;

  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="hidden sm:grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-700 uppercase tracking-wider">
          <div>Activity</div>
          <div className="text-right">Prediction</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Date</div>
        </div>

        {isLoadingVotes ? (
          <div className="p-8 text-center bg-white">
            <div className="text-gray-500 text-sm">
              Loading activity...
            </div>
          </div>
        ) : recentActivity.length === 0 ? (
          <div className="p-8 text-center bg-white">
            <div className="text-gray-500 text-sm">
              No activity found
            </div>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-100">
              {currentActivity.map((vote) => (
                <div key={vote.id} className="sm:grid sm:grid-cols-4 sm:gap-4 px-4 sm:px-6 py-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-3 sm:mb-0">
                    {vote.market.imageUrl && (
                      <div className="w-10 sm:w-8 h-10 sm:h-8 rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={vote.market.imageUrl}
                          alt={vote.market.title}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        Placed {vote.prediction} vote on "{vote.market.title}"
                      </div>
                      <div className="text-xs text-gray-500">
                        {vote.market.group?.name && `in ${vote.market.group.name}`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex sm:block items-center justify-between mb-2 sm:mb-0 sm:text-right">
                    <span className="text-xs text-gray-500 sm:hidden">Prediction:</span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vote.prediction)}`}>
                      {vote.prediction}
                    </span>
                  </div>
                  
                  <div className="flex sm:block items-center justify-between mb-2 sm:mb-0 sm:text-right">
                    <span className="text-xs text-gray-500 sm:hidden">Amount:</span>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/assets/logo/logo-coin/move-logo.jpeg"
                        alt="Move Token"
                        width={14}
                        height={14}
                        className="rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {vote.amount}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex sm:block items-center justify-between sm:text-right">
                    <span className="text-xs text-gray-500 sm:hidden">Date:</span>
                    <div className="text-sm text-gray-900">
                      {new Date(vote.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {showPagination && (
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 border-t border-gray-200">
                <div className="text-xs text-gray-500 text-center sm:text-left">
                  Showing {startIndex + 1}-{Math.min(endIndex, recentActivity.length)} of {recentActivity.length} activities
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-gray-50 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded text-xs font-medium transition-colors cursor-pointer ${
                          pageNum === currentPage
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-gray-50 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}