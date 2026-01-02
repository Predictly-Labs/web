"use client";

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGetMyVotesStats } from '@/hooks/useGetMyVotesStats';

export const ActivityCard = () => {
  const { user } = useAuth();
  const { stats, fetchMyVotesStats, isLoading } = useGetMyVotesStats();

  useEffect(() => {
    if (user?.id) {
      fetchMyVotesStats();
    }
  }, [user, fetchMyVotesStats]);

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
      className="bg-gray-50 rounded-4xl p-4 sm:p-8 h-auto w-full relative overflow-hidden"
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
            <h2 className="text-4xl font-bold text-gray-900">{isLoading ? '...' : stats?.totalVotes || 0}</h2>
            <span className="text-lg text-gray-400 mb-1">Activity</span>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-1">
              +23%
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-2 mt-4">
          <div className="h-16 mb-2 relative">
            <svg width="100%" height="100%" viewBox="0 0 280 64" className="overflow-visible">
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(219, 39, 119)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(255, 255, 255)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {(() => {
                const maxValue = Math.max(...weekData.map(d => d.value));
                const points = weekData.map((item, index) => {
                  const x = (index / (weekData.length - 1)) * 240 + 20;
                  const y = 60 - ((item.value / maxValue) * 50);
                  return `${x},${y}`;
                }).join(' ');
                
                const areaPath = `M 20,60 L ${points.split(' ').map(point => {
                  const [x, y] = point.split(',');
                  return `${x},${y}`;
                }).join(' L ')} L 260,60 Z`;
                
                const linePath = `M ${points.split(' ').join(' L ')}`;
                
                return (
                  <>
                    <path
                      d={areaPath}
                      fill="url(#areaGradient)"
                      className="transition-all duration-500"
                    />
                    <path
                      d={linePath}
                      stroke="rgb(219, 39, 119)"
                      strokeWidth="2"
                      fill="none"
                      className="transition-all duration-500"
                    />
                    {weekData.map((item, index) => {
                      const x = (index / (weekData.length - 1)) * 240 + 20;
                      const y = 60 - ((item.value / maxValue) * 50);
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="rgb(219, 39, 119)"
                          stroke="rgb(255, 255, 255)"
                          strokeWidth="2"
                          className="hover:r-4 transition-all duration-300 cursor-pointer"
                        />
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>

          <div className="flex justify-between">
            {weekData.map((item) => (
              <span key={item.day} className="text-xs text-gray-600 text-center flex-1">
                {item.day}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
