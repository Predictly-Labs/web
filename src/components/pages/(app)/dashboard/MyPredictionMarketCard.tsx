"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useGetMyCreatedPredictions } from "@/hooks/useGetMyCreatedPredictions";
import { useEffect, useState } from "react";

interface MyPrediction {
  id: string;
  title: string;
  status: string;
  participants: number;
  pool: number;
  myBet?: number;
  protocol: string;
  protocolLogo: string;
  createdAt: string;
}

export const MyPredictionMarketCard = () => {
  const router = useRouter();
  const { myCreatedPredictions, isLoading } = useGetMyCreatedPredictions();
  const [predictions, setPredictions] = useState<MyPrediction[]>([]);

  useEffect(() => {
    if (myCreatedPredictions && myCreatedPredictions.length > 0) {
      const transformedPredictions = myCreatedPredictions.slice(0, 3).map(prediction => ({
        id: prediction.id,
        title: prediction.title,
        status: prediction.status || "Active",
        participants: prediction.participantCount || 0,
        pool: prediction.totalVolume || 0,
        myBet: 0,
        protocol: prediction.group?.name || "Unknown",
        protocolLogo: prediction.imageUrl || "/assets/logo/defi-protocol-logo/default.jpg",
        createdAt: prediction.createdAt
      }));
      setPredictions(transformedPredictions);
    }
  }, [myCreatedPredictions]);

  const getStatusColor = (status: string) => {
    const lowerStatus = status?.toLowerCase();
    switch(lowerStatus) {
      case 'active': return 'bg-green-600 text-white';
      case 'closed': return 'bg-gray-600 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateMarket = () => {
    router.push('/app/create-market');
  };

  return (
    <div 
      className="rounded-3xl p-4 sm:p-6 w-153 h-auto min-h-[300px] sm:min-h-[400px] relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/main/background/bg-main.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">My Predictions</h3>
        <button
          onClick={handleCreateMarket}
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <div className="bg-white rounded-full p-0.5">
            <Plus className="w-2 h-2 text-black" />
          </div>
          Create Prediction Market
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : predictions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No created markets found</p>
            <p className="text-gray-400 text-xs mt-1">Start by creating your first market</p>
          </div>
        ) : (
          predictions.map((prediction) => (
          <div key={prediction.id} className="bg-gray-50 rounded-2xl p-3 hover:bg-gray-100 transition-colors h-20">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2 flex-1">
                <div className="w-4 h-4 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
                  <Image
                    src={prediction.protocolLogo}
                    alt={prediction.protocol}
                    width={16}
                    height={16}
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="text-xs font-medium text-gray-900 flex-1">{prediction.title}</h4>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(prediction.status)}`}>
                {prediction.status?.toLowerCase() === 'active' ? 'Active' : prediction.status}
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Pool</span>
                <div className="font-semibold text-gray-900">${prediction.pool}</div>
              </div>
              <div>
                <span className="text-gray-500">Players</span>
                <div className="font-semibold text-gray-900">{prediction.participants}</div>
              </div>
              <div>
                <span className="text-gray-500">Volume</span>
                <div className="font-semibold text-green-600">${prediction.pool}</div>
              </div>
              <div>
                <span className="text-gray-500">Date</span>
                <div className="font-semibold text-gray-900">{new Date(prediction.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      <div className="mt-2 pt-3 border-t border-gray-100 text-center">
        <button 
          onClick={handleCreateMarket}
          className="bg-black text-white py-2 px-4 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <span>View All Predictions</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
      </div>
    </div>
  );
};