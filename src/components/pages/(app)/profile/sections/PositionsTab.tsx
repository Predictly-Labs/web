import Image from "next/image"
import { BsSearch } from "react-icons/bs"

interface PositionsTabProps {
  myVotes: any[]
  activeFilter: 'active' | 'closed'
  setActiveFilter: (filter: 'active' | 'closed') => void
  isLoadingVotes: boolean
}

export const PositionsTab = ({ 
  myVotes, 
  activeFilter, 
  setActiveFilter, 
  isLoadingVotes 
}: PositionsTabProps) => {
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

  return (
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
  )
}