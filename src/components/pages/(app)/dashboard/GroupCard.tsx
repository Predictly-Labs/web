"use client";

import Image from "next/image";

export const GroupCard = () => {
  const groups = [
    {
      id: 1,
      name: "Crypto Bulls",
      members: 12,
      activePredictions: 8,
      avatar: "/assets/main/background/1.jpeg"
    },
    {
      id: 2,
      name: "DeFi Degens",
      members: 8,
      activePredictions: 15,
      avatar: "/assets/main/background/2.jpeg"
    },
    {
      id: 3,
      name: "Market Makers",
      members: 24,
      activePredictions: 32,
      avatar: "/assets/main/background/3.jpeg"
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-50 w-80 h-100 mr-20 mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900">My Groups</h3>
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-gray-50 rounded-2xl p-3 hover:bg-gray-100 transition-colors h-20">
            <div className="flex items-center gap-3 h-full">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white ring-2 ring-gray-100">
                <Image
                  src={group.avatar}
                  alt={group.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{group.name}</h4>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                  <span>{group.members} members</span>
                  <span>{group.activePredictions} active predictions</span>
                </div>
              </div>

              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-3 border-t border-gray-100 text-center">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto">
          <span>Create New Group</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  );
};