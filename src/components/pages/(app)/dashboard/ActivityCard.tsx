"use client";

export const ActivityCard = () => {
  const weekData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 30 },
    { day: 'Wed', value: 65 },
    { day: 'Thu', value: 25 },
    { day: 'Fri', value: 80 },
    { day: 'Sat', value: 55 },
    { day: 'Sun', value: 40 }
  ];

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
          <h3 className="text-lg font-medium text-white drop-shadow-lg">Activity</h3>
          <div className="flex gap-2">
            <button className="text-white/80 hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </button>
            <button className="text-white/80 hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm text-white/80 mb-1">Shared this week</div>
            <div className="text-3xl font-bold text-white drop-shadow-lg">186</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs bg-green-400/90 text-black px-2 py-1 rounded-full font-medium">+6.5%</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2 h-24">
            {weekData.map((item, index) => (
              <div key={item.day} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    index === 4 ? 'bg-yellow-400/90' : 'bg-white/40'
                  }`}
                  style={{ height: `${item.value}%` }}
                ></div>
                <span className="text-xs text-white/70 mt-2">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};