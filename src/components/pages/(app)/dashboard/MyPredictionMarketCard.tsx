"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMyVotes } from "@/hooks/useMyVotes";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, TrendingUp } from "lucide-react";

export const MyPredictionMarketCard = () => {
  const { isAuthenticated } = useAuth();
  const { votes, isLoading, fetchVotes } = useMyVotes();

  useEffect(() => {
    if (isAuthenticated) {
      fetchVotes().catch(console.error);
    }
  }, [isAuthenticated, fetchVotes]);

  // Transform votes to predictions display format
  const predictions = votes.slice(0, 3).map((vote) => ({
    id: vote.id,
    title: vote.market?.title || 'Unknown Market',
    status: vote.market?.status === 'ACTIVE' ? 'Active' : 
            vote.market?.status === 'RESOLVED' ? 'Closed' : 'Pending',
    myBet: vote.amount,
    prediction: vote.prediction,
  }));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-600 text-white';
      case 'Closed': return 'bg-gray-600 text-white';
      case 'Pending': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      className="rounded-3xl p-4 sm:p-6 w-153 h-auto min-h-[300px] sm:min-h-[400px] relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/main/background/bg-nav.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-[-4]">
          <h3 className="text-lg font-medium text-gray-900 mb-4">My Predictions</h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        ) : predictions.length > 0 ? (
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="bg-gray-50 rounded-2xl p-3 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-xs font-medium text-gray-900 flex-1 line-clamp-2">{prediction.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ml-2 ${getStatusColor(prediction.status)}`}>
                    {prediction.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-500">My Vote: </span>
                    <span className={`font-semibold ${prediction.prediction === 'YES' ? 'text-green-600' : 'text-red-600'}`}>
                      {prediction.prediction}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Staked: </span>
                    <span className="font-semibold text-gray-900">{prediction.myBet}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No predictions yet</p>
          </div>
        )}

        <div className="mt-2 pt-3 border-t border-gray-100 text-center">
          <Link href="/app/rewards" className="bg-black text-white py-2 px-4 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mx-auto w-fit">
            <span>View All Predictions</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
