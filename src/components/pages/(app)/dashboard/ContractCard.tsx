"use client";

export const ContractCard = () => {
  const contractData = [
    { label: 'Learn more', percentage: 10, color: '#10b981' },
    { label: 'Active', percentage: 86, color: '#06b6d4' },
    { label: 'Pending', percentage: 4, color: '#f59e0b' }
  ];

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <div 
      className="rounded-2xl p-6 h-80 relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/main/background/3.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
        <h3 className="text-lg font-medium text-white drop-shadow-lg">Contract Type</h3>
        <button className="text-white/80 hover:text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {contractData.map((segment, index) => {
              const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedPercentage * circumference / 100;
              accumulatedPercentage += segment.percentage;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={segment.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white drop-shadow-lg">86%</div>
              <div className="text-xs text-white/80">Active</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 w-full">
          {contractData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-white/90">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-white drop-shadow-lg">{item.percentage}%</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-white drop-shadow-lg">140</div>
            <div className="text-xs text-white/80">Predictions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white drop-shadow-lg">48</div>
            <div className="text-xs text-white/80">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white drop-shadow-lg">16</div>
            <div className="text-xs text-white/80">Wins</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};