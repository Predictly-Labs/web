"use client";

export const SpentCard = () => {
  const chartData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 32 },
    { day: 'Wed', value: 68 },
    { day: 'Thu', value: 25 },
    { day: 'Fri', value: 48 },
    { day: 'Sat', value: 72 },
    { day: 'Sun', value: 38 }
  ];

  return (
    <div 
      className="rounded-2xl p-6 relative overflow-hidden"
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
        <h3 className="text-lg font-medium text-white drop-shadow-lg">Total Spent</h3>
        <div className="flex gap-2">
          <button className="text-white/80 hover:text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-sm text-white/80 mb-1">Spent this week</div>
          <div className="text-3xl font-bold text-white drop-shadow-lg">$820.65</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-yellow-400/90 text-black px-2 py-1 rounded-full font-medium">+10.5%</span>
            <span className="text-sm text-white/70">vs last week</span>
          </div>
        </div>

        <div className="relative h-32">
          <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            
            <path
              d={`M 0 ${120 - chartData[0].value} ${chartData.map((point, index) => 
                `L ${(index * 300) / (chartData.length - 1)} ${120 - point.value}`
              ).join(' ')}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
            />
            
            <path
              d={`M 0 ${120 - chartData[0].value} ${chartData.map((point, index) => 
                `L ${(index * 300) / (chartData.length - 1)} ${120 - point.value}`
              ).join(' ')} L 300 120 L 0 120 Z`}
              fill="url(#lineGradient)"
            />
            
            {chartData.map((point, index) => (
              <circle
                key={index}
                cx={(index * 300) / (chartData.length - 1)}
                cy={120 - point.value}
                r="4"
                fill="#10b981"
              />
            ))}
          </svg>
          
          <div className="flex justify-between mt-2">
            {chartData.map((item, index) => (
              <span key={index} className="text-xs text-white/70">{item.day}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-white drop-shadow-lg">10</div>
            <div className="text-xs text-white/80">Positions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white drop-shadow-lg">24</div>
            <div className="text-xs text-white/80">Assets</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white drop-shadow-lg">7</div>
            <div className="text-xs text-white/80">Markets</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};