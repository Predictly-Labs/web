"use client";

import { useEffect, useState } from 'react';
import { useGetUserStats } from '@/hooks/useGetUserStats';
import { useAuth } from '@/hooks/useAuth';

export const ActivityCard = () => {
  const { user } = useAuth();
  const { userStats, fetchUserStats, isLoading } = useGetUserStats();
  const [totalPredictions, setTotalPredictions] = useState(47);

  useEffect(() => {
    const loadUserStats = async () => {
      if (user?.id) {
        const stats = await fetchUserStats(user.id);
        if (stats) {
          setTotalPredictions(stats.totalPredictions);
        }
      }
    };

    loadUserStats();
  }, [user, fetchUserStats]);

  const weekData = [
    { day: "Mon", value: 35 },
    { day: "Tue", value: 52 },
    { day: "Wed", value: 28 },
    { day: "Thu", value: 73 },
    { day: "Fri", value: 95 },
    { day: "Sat", value: 41 },
    { day: "Sun", value: 67 },
  ];

  return (
    <div
      className="bg-gray-50 rounded-4xl p-4 sm:p-8 h-auto min-h-[280px] w-full relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/main/background/bg-main.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-medium text-gray-900">Activity</h3>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-gray-500 text-sm mb-2">Predictions this week</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-gray-900">{isLoading ? '...' : totalPredictions}</h2>
            <span className="text-lg text-gray-400 mb-1">Activity</span>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-1">
              +23%
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-1 h-16">
          {weekData.map((item, index) => (
            <div key={item.day} className="flex flex-col items-center flex-1">
              <div
                className={`w-full rounded-t-lg transition-all duration-300 ${
                  index === 4 ? "bg-blue-400" : "bg-gray-200"
                }`}
                style={{ height: `${item.value}%` }}
              ></div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          {weekData.map((item) => (
            <span key={item.day} className="text-xs text-black-400">
              {item.day}
            </span>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};
