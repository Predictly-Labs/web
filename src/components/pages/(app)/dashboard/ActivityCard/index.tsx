"use client";

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGetMyVotesStats } from '@/hooks/useGetMyVotesStats';
import { ActivityHeader } from './ActivityHeader';
import { ActivityStats } from './ActivityStats';
import { ActivityChart } from './ActivityChart';

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
        <ActivityHeader />
        <div className="space-y-6">
          <ActivityStats 
            totalVotes={stats?.totalVotes || 0} 
            isLoading={isLoading} 
          />
          <ActivityChart data={weekData} />
        </div>
      </div>
    </div>
  );
};