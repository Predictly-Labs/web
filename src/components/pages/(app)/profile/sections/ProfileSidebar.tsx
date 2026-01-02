import Image from "next/image"

interface ActivityData {
  day: string;
  value: number;
}

interface ProfileSidebarProps {
  groups: any[]
  isLoadingGroups: boolean
  activityData: ActivityData[]
}

export const ProfileSidebar = ({ groups, isLoadingGroups, activityData }: ProfileSidebarProps) => {
  const maxValue = Math.max(...activityData.map((d) => d.value));

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">Profit/Loss</div>
          <div className="flex gap-1 text-xs">
            <button className="px-2 py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
              1D
            </button>
            <button className="px-2 py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
              1W
            </button>
            <button className="px-2 py-1 bg-gray-100 text-gray-900 rounded cursor-pointer">
              1M
            </button>
            <button className="px-2 py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
              ALL
            </button>
          </div>
        </div>

        <div className="text-2xl font-light text-gray-900 mb-1">
          $0.00
        </div>
        <div className="text-sm text-gray-500 mb-6">Past Month</div>

        <div className="h-32 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
          <div className="flex items-end gap-1 h-16">
            {activityData.map((item, index) => (
              <div
                key={item.day}
                className="bg-gray-300 w-3 rounded-t transition-all duration-300"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-400 text-right">
          Predictly
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 mt-6">
        <h3 className="text-sm text-gray-500 mb-4">My Groups</h3>
        {isLoadingGroups ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-4">
            <div className="text-gray-500 text-xs">No groups found</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {groups.slice(0, 3).map((group) => (
                <div key={group.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="relative w-10 h-10 sm:w-8 sm:h-8 shrink-0">
                    {group.iconUrl ? (
                      <Image
                        src={group.iconUrl}
                        alt={group.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-xs font-medium">
                          {group.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {group.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {group.stats.memberCount} member{group.stats.memberCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {groups.length > 3 && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                  View all groups ({groups.length})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}