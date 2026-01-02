import { Users, Plus } from "lucide-react";
import { useTransformedGroups } from "@/hooks/useGroupsState";

interface GroupsActionsProps {
  onJoinGroup: () => void;
  onCreateGroup: () => void;
  groupCount?: number;
}

export const GroupsActions = ({ onJoinGroup, onCreateGroup, groupCount }: GroupsActionsProps) => {
  const transformedGroups = useTransformedGroups();
  const displayGroupCount = groupCount ?? transformedGroups.length;
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-3">
          <button
            onClick={onJoinGroup}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4 text-white" />
            Join Group
          </button>
          <button
            onClick={onCreateGroup}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="bg-white rounded-full p-1">
              <Plus className="w-2 h-2 text-black" />
            </div>
            Create New Groups
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Users className="w-4 h-4 text-black" />
        <span>{displayGroupCount} groups available</span>
      </div>
    </div>
  );
};