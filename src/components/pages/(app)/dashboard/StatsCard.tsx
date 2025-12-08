"use client";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  backgroundImage?: string;
}

export const StatsCard = ({ title, value, subtitle, backgroundImage = "/assets/main/background/1.jpeg" }: StatsCardProps) => {
  return (
    <div 
      className="rounded-xl p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <div className="text-center">
          <div className="text-2xl font-bold text-white drop-shadow-lg mb-1">{value}</div>
          <div className="text-sm font-medium text-white/90 mb-1">{title}</div>
          <div className="text-xs text-white/70">{subtitle}</div>
        </div>
      </div>
    </div>
  );
};