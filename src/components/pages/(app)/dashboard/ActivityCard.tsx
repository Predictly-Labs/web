"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMyVotes } from "@/hooks/useMyVotes";
import { Loader2 } from "lucide-react";

export const ActivityCard = () => {
  const { isAuthenticated } = useAuth();
  const { votes, isLoading, fetchVotes } = useMyVotes();

  useEffect(() => {
    if (isAuthenticated) {
      fetchVotes().catch(console.error);
    }
  }, [isAuthenticated, fetchVotes]);

  // Calculate weekly activity from votes
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentVotes = votes.filter(v => new Date(v.createdAt) >= weekAgo);
  
  // Group by day of week
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekData = dayNames.map((day, idx) => {
    const count = recentVotes.filter(v => new Date(v.createdAt).getDay() === idx).length;
    return { day, value: Math.min(count * 20, 100) || 10 };
  });
  
  // Reorder to start from Monday
  const orderedWeekData = [...weekData.slice(1), weekData[0]];
  const maxIdx = orderedWeekData.reduce((max, item, idx, arr) => item.value > arr[max].value ? idx : max, 0);

  const totalThisWeek = recentVotes.length;
  const prevWeekVotes = votes.filter(v => {
    const d = new Date(v.createdAt);
    return d >= new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000) && d < weekAgo;
  }).length;
  const changePercent = prevWeekVotes > 0 ? Math.round(((totalThisWeek - prevWeekVotes) / prevWeekVotes) * 100) : 0;

  return (
    <div className="bg-gray-50 rounded-4xl p-4 sm:p-8 h-auto min-h-[280px] w-full"
     style={{
            backgroundImage: "url('/assets/main/background/bg-nav.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-medium text-gray-900">Activity</h3>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <p className="text-gray-500 text-sm mb-2">Predictions this week</p>
            <div className="flex items-end gap-3">
              <h2 className="text-4xl font-bold text-gray-900">{totalThisWeek}</h2>
              <span className="text-lg text-gray-400 mb-1">Activity</span>
              {changePercent !== 0 && (
                <div className={`${changePercent >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-3 py-1 rounded-full text-sm font-medium mb-1`}>
                  {changePercent >= 0 ? '+' : ''}{changePercent}%
                </div>
              )}
            </div>
          </div>

          <div className="flex items-end justify-between gap-1 h-16">
            {orderedWeekData.map((item, index) => (
              <div key={item.day} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-300 ${index === maxIdx ? 'bg-blue-400' : 'bg-gray-200'}`}
                  style={{ height: `${item.value}%` }}
                ></div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            {orderedWeekData.map((item) => (
              <span key={item.day} className="text-xs text-black-400">{item.day}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
