"use client";

interface DataPoint {
  day: string;
  value: number;
}

interface ActivityChartProps {
  data: DataPoint[];
}

export const ActivityChart = ({ data }: ActivityChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 240 + 20;
    const y = 60 - ((item.value / maxValue) * 50);
    return `${x},${y}`;
  }).join(' ');
  
  const areaPath = `M 20,60 L ${points.split(' ').map(point => {
    const [x, y] = point.split(',');
    return `${x},${y}`;
  }).join(' L ')} L 260,60 Z`;
  
  const linePath = `M ${points.split(' ').join(' L ')}`;

  return (
    <div className="bg-gray-50 rounded-xl p-2 mt-4">
      <div className="h-16 mb-2 relative">
        <svg width="100%" height="100%" viewBox="0 0 280 64" className="overflow-visible">
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(219, 39, 119)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(255, 255, 255)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <path
            d={areaPath}
            fill="url(#areaGradient)"
            className="transition-all duration-500"
          />
          <path
            d={linePath}
            stroke="rgb(219, 39, 119)"
            strokeWidth="2"
            fill="none"
            className="transition-all duration-500"
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 240 + 20;
            const y = 60 - ((item.value / maxValue) * 50);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill="rgb(219, 39, 119)"
                stroke="rgb(255, 255, 255)"
                strokeWidth="2"
                className="hover:r-4 transition-all duration-300 cursor-pointer"
              />
            );
          })}
        </svg>
      </div>

      <div className="flex justify-between">
        {data.map((item) => (
          <span key={item.day} className="text-xs text-gray-600 text-center flex-1">
            {item.day}
          </span>
        ))}
      </div>
    </div>
  );
};