"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useGetGroups } from "@/hooks/useGetGroups";
import { useAuth } from "@/hooks/useAuth";

export const GroupCard = () => {
  const { user } = useAuth();
  const { getGroups, groups, isLoading } = useGetGroups();

  useEffect(() => {
    if (user?.id) {
      getGroups({ limit: 3 });
    }
  }, [user, getGroups]);

  return (
    <div
      className="rounded-3xl p-4 sm:p-6 w-full h-auto min-h-[300px] sm:min-h-[400px] relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/main/background/bg-main.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-900">My Groups</h3>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : groups.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No groups found</p>
              <p className="text-gray-400 text-xs mt-1">Join your first group to get started</p>
            </div>
          ) : (
            groups.slice(0, 3).map((group) => (
              <div
                key={group.id}
                className="bg-gray-50 rounded-2xl p-3 hover:bg-gray-100 transition-colors h-20"
              >
                <div className="flex items-center gap-3 h-full">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white ring-2 ring-gray-100">
                    {group.iconUrl ? (
                      <Image
                        src={group.iconUrl}
                        alt={group.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-lg font-medium">
                          {group.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {group.name}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>{group.stats.memberCount} members</span>
                      <span>{group.stats.activeMarkets} active predictions</span>
                    </div>
                  </div>

                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-2 pt-3 border-t border-gray-100 text-center">
          <button className="bg-black text-white py-2 px-4 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mx-auto">
            <span>View All Group</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
