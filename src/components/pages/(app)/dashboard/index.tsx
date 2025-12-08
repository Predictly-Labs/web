"use client";

import { PredictionCard } from "./PredictionCard";
import { ActivityCard } from "./ActivityCard";
import { BalanceCard } from "./BalanceCard";
import { SpentCard } from "./SpentCard";
import { DefiCard } from "./DeFiCard";
import { StatsCard } from "./StatsCard";

export const Dashboard = () => {
  return (
    <div 
      className="p-6 min-h-screen relative bg-[#f7f5fa]"
      // style={{
      //   backgroundImage: "url('/assets/main/background/1.jpeg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   backgroundAttachment: "fixed"
      // }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-black mb-2">My Dashboard</h1>
          <div className="flex items-center gap-4 text-sm text-white/80">
          
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1">
            <PredictionCard />
          </div>
          
          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 ml-22">
            <ActivityCard />
          </div>
          
          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 ml-24">
            <BalanceCard />
          </div>
          
          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 ml-26">
            <DefiCard />
          </div>
          
          {/* <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
            <SpentCard />
          </div> */}
          
          {/* <div className="md:col-span-2 lg:col-span-1 xl:col-span-2 grid grid-cols-3 gap-4">
            <StatsCard title="Predictions" value="140" subtitle="Active" backgroundImage="/assets/main/background/2.jpeg" />
            <StatsCard title="Revenue" value="48" subtitle="This week" backgroundImage="/assets/main/background/3.jpeg" />
            <StatsCard title="Wins" value="16" subtitle="This month" backgroundImage="/assets/main/background/4.jpeg" />
          </div> */}
        </div>
      </div>
    </div>
  );
};