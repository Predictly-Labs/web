"use client";

import { useWallet } from "@/providers/WalletProvider";
import { PredictionCard } from "./PredictionCard";
import { ActivityCard } from "./ActivityCard";
import { BalanceCard } from "./BalanceCard";
import { MyPredictionMarketCard } from "./MyPredictionMarketCard";
import { DefiCard } from "./DeFiCard";
import { GroupCard } from "./GroupCard";
import Sidebar from "../../../ui/Sidebar";
import Image from "next/image";

export const Dashboard = () => {
  const { connected, address, connect, disconnect } = useWallet();


  if (!connected) {
    return (
      <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
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
                <div className="relative z-10 flex items-center justify-center gap-4 p-4">
                  <div className="flex flex-col items-center justify-center">
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
                    <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">Connect your wallet to start predicting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[400px] mt-30">
            <div className="text-center max-w-sm mx-4">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Connect Wallet</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Connect to access prediction markets and compete with friends
              </p>
              <button
                onClick={connect}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors cursor-pointer mb-3"
              >
                Connect Wallet
              </button>
              <p className="text-xs text-gray-400 mt-5">
                Supports Nightly, Petra & Martian
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]"
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
              <div className="relative z-10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1"></div>
                  <div className="flex flex-col items-center">
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
                    <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center">Welcome back! Here's what's happening with your predictions.</p>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-xs text-gray-400">Connected</div>
                        <div className="text-sm font-mono text-gray-700">
                          {address?.slice(0, 4)}...{address?.slice(-4)}
                        </div>
                      </div>
                      <button
                        onClick={disconnect}
                        className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        title="Disconnect wallet"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
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
