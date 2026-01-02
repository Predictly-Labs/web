export const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 animate-pulse rounded-xl h-48"
        ></div>
      ))}
    </div>
  );
};