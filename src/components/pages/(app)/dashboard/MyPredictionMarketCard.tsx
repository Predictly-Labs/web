"use client";

import Image from "next/image";

export const MyPredictionMarketCard = () => {
  const predictions = [
    {
      id: 1,
      title: "ETH will reach $4000 by December",
      status: "Active",
      participants: 5,
      pool: 250,
      myBet: 50,
      protocol: "Layer Bank",
      protocolLogo: "/assets/logo/defi-protocol-logo/Layer Bank.jpg"
    },
    {
      id: 2,
      title: "BTC dominance below 50%",
      status: "Closed",
      participants: 8,
      pool: 420,
      myBet: 30,
      protocol: "Canopy",
      protocolLogo: "/assets/logo/defi-protocol-logo/Canopy.jpg"
    },
    {
      id: 3,
      title: "MOVE token $10 EOY",
      status: "Pending",
      participants: 3,
      pool: 180,
      myBet: 60,
      protocol: "MovePosition",
      protocolLogo: "/assets/logo/defi-protocol-logo/MovePosition.jpg"
    }
  ];

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
        backgroundImage: "url('/assets/main/background/bg-nav-move.png')",
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

      <div className="space-y-4">
        {predictions.map((prediction) => (
          <div key={prediction.id} className="bg-gray-50 rounded-2xl p-3 hover:bg-gray-100 transition-colors h-20">
            <div className="flex items-start justify-between mb-1">
              <h4 className="text-xs font-medium text-gray-900 flex-1">{prediction.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(prediction.status)}`}>
                {prediction.status}
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
                <span className="text-gray-500">My Bet</span>
                <div className="font-semibold text-green-600">${prediction.myBet}</div>
              </div>
              <div>
                <span className="text-gray-500">Protocol</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <Image
                      src={prediction.protocolLogo}
                      alt={prediction.protocol}
                      width={12}
                      height={12}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-gray-900 text-xs">{prediction.protocol}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-3 border-t border-gray-100 text-center">
        <button className="bg-black text-white py-2 px-4 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mx-auto">
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