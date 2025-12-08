"use client";

import { PredictionCard } from "./PredictionCard";
import { ActivityCard } from "./ActivityCard";
import { BalanceCard } from "./BalanceCard";
import { MyPredictionMarketCard } from "./MyPredictionMarketCard";
import { DefiCard } from "./DeFiCard";
import { GroupCard } from "./GroupCard";

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
          <div>
            <h1 className="text-4xl font-medium text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-lg text-gray-600 mb-3">Welcome back! Here's what's happening with your predictions.</p>
            <div className="border-b border-gray-200"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-12">
          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1">
            <PredictionCard />
          </div>

          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col gap-6 ml-20">
            <ActivityCard />
            <MyPredictionMarketCard />
          </div>

          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 ml-20">
            <BalanceCard />
          </div>

          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 ml-20">
            <DefiCard />
            <GroupCard />
          </div>
        </div>
      </div>
    </div>
  );
};
