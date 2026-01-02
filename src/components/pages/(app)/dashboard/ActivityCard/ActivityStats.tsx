interface ActivityStatsProps {
  totalVotes: number;
  isLoading: boolean;
}

export const ActivityStats = ({ totalVotes, isLoading }: ActivityStatsProps) => {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-2">Predictions this week</p>
      <div className="flex items-end gap-3">
        <h2 className="text-4xl font-bold text-gray-900">{isLoading ? '...' : totalVotes || 0}</h2>
        <span className="text-lg text-gray-400 mb-1">Activity</span>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-1">
          +23%
        </div>
      </div>
    </div>
  );
};