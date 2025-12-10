"use client";

import { PredictionCard } from "./PredictionCard";
import { ActivityCard } from "./ActivityCard";
import { BalanceCard } from "./BalanceCard";
import { MyPredictionMarketCard } from "./MyPredictionMarketCard";
import { DefiCard } from "./DeFiCard";
import { GroupCard } from "./GroupCard";
import Sidebar from "../../../ui/Sidebar";

export const Dashboard = () => {
  return (
    <div
      className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]"
      // style={{
      //   backgroundImage: "url('/assets/main/background/1.jpeg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   backgroundAttachment: "fixed"
      // }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3">Welcome back! Here's what's happening with your predictions.</p>
            <div className="border-b border-gray-200"></div>
          </div>
        </div>

        <div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-3 rounded-4xl p-5 bg-white/50 relative overflow-hidden"
          style={{
            backgroundImage: "url('/assets/main/background/bg-main.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="lg:col-span-1 flex flex-col h-full">
            <PredictionCard />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            <div className="flex-1">
              <ActivityCard />
            </div>
            <div className="flex-1">
              <MyPredictionMarketCard />
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col h-full">
            <BalanceCard />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            <div className="flex-1">
              <DefiCard />
            </div>
            <div className="flex-1">
              <GroupCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
