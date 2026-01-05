import Image from "next/image"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useMyVotes, useActiveFilter, useSearchQuery, useProfileActions } from "@/hooks/useProfileState"

export const PositionsTab = () => {
  const { filteredVotes, isLoading: isLoadingVotes } = useMyVotes();
  const { activeFilter } = useActiveFilter();
  const { searchQuery } = useSearchQuery();
  const { updateActiveFilter, updateSearchQuery } = useProfileActions();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const getStatusColor = (prediction: 'YES' | 'NO') => {
    return prediction === 'YES' 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  const totalPages = Math.ceil(filteredVotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVotes = filteredVotes.slice(startIndex, endIndex);
  const showPagination = filteredVotes.length > itemsPerPage;

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-1">
        <div className="flex gap-2">
          <button
            onClick={() => updateActiveFilter("active")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              activeFilter === "active"
                ? "bg-gray-100 text-gray-900"
                : "bg-gray-50 text-gray-500 hover:text-gray-700"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => updateActiveFilter("closed")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              activeFilter === "closed"
                ? "bg-gray-100 text-gray-900"
                : "bg-gray-50 text-gray-500 hover:text-gray-700"
            }`}
          >
            Closed
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search positions"
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300"
            />
          </div>
          <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-gray-100 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
            <span>⚖</span>
            <span className="hidden sm:inline">Value</span>
          </button>
        </div>
      </div>

      <div className="border border-gray-100 rounded-lg overflow-hidden">
        <div className="hidden sm:grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-700 uppercase tracking-wider">
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
        ) : filteredVotes.length === 0 ? (
          <div className="p-8 text-center bg-white">
            <div className="text-gray-500 text-sm">
              No {activeFilter} positions found
            </div>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-100">
              {currentVotes.map((vote) => (
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
                        {vote.market.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {vote.market.marketType}
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
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredVotes.length)} of {filteredVotes.length} positions
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