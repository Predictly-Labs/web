"use client";

import { useEffect } from "react";
import { PredictionCard } from "./PredictionCard";
import { ActivityCard } from "./ActivityCard";
import { BalanceCard } from "./BalanceCard";
import { MyPredictionMarketCard } from "./MyPredictionMarketCard";
import { DefiCard } from "./DeFiCard";
import { GroupCard } from "./GroupCard";
import Sidebar from "../../../ui/Sidebar";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/hooks/useUser";

export const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const { user, fetchUser, accuracy } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser().catch(console.error);
    }
  }, [isAuthenticated, fetchUser]);

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
          <div className="relative mb-6">
            <div 
              className="relative overflow-hidden rounded-2xl"
              style={{
                backgroundImage: "url('/assets/main/background/bg-flower.png')",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* <div className="absolute inset-0 bg-black/10"></div> */}
              <div className="relative z-10 flex items-center  justify-center gap-4 p-2">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-medium text-pink-900">My Dashboard</h1>
                    <Image
                      src="/assets/main/icon/dashboard-icon.png"
                      alt="Dashboard Icon"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">
                    {user ? `Welcome back, ${user.displayName || 'Predictor'}! ` : 'Welcome back! '}
                    Here's what's happening with your predictions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-3 rounded-4xl p-3   bg-white/50 relative overflow-hidden"
          // style={{
          //   backgroundImage: "url('/assets/main/background/bg-main.png')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          // }}
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
