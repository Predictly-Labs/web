import { GroupCard } from "../GroupCard";
import { GroupData } from "@/types/group";

interface GroupsGridProps {
  groups: GroupData[];
  onGroupClick: (group: GroupData) => void;
}

export const GroupsGrid = ({ groups, onGroupClick }: GroupsGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          onClick={onGroupClick}
        />
      ))}
    </div>
  );
};