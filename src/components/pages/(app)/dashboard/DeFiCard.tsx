"use client";

import Image from "next/image";

export const DefiCard = () => {
  const defiProtocols = [
    {
      name: "Layer Bank",
      logo: "/assets/logo/defi-protocol-logo/Layer Bank.jpg",
      apy: "18.2%",
      tvl: "$2.4M",
      type: "Lending",
    },
    {
      name: "Canopy",
      logo: "/assets/logo/defi-protocol-logo/Canopy.jpg",
      apy: "24.7%",
      tvl: "$1.8M",
      type: "DEX",
    },
    {
      name: "MovePosition",
      logo: "/assets/logo/defi-protocol-logo/MovePosition.jpg",
      apy: "15.4%",
      tvl: "$980K",
      type: "Liquid Staking",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-8 border border-gray-50 w-full h-auto min-h-[280px] sm:min-h-[320px]">
      <h3 className="text-xl font-medium text-black mb-6">
        DeFi Protocol
      </h3>
      <div className="space-y-7">
        {defiProtocols.map((protocol, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full overflow-hidden shadow-sm">
                <Image
                  src={protocol.logo}
                  alt={protocol.name}
                  width={30}
                  height={30}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {protocol.name}
                </h4>
                <p className="text-xs text-gray-500">{protocol.type}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-green-600 font-bold text-lg">{protocol.apy}</p>
              <p className="text-xs text-gray-400">APY</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
