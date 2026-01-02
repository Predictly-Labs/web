import { Users } from "lucide-react";

export const EmptyGroupsState = () => {
  return (
    <div className="text-center py-16">
      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        No Groups Yet
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Start by creating your first group to organize
        prediction markets with friends.
      </p>
    </div>
  );
};