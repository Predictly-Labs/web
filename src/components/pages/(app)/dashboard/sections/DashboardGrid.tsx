import { PredictionCard } from "../PredictionCard";
import { ActivityCard } from "../ActivityCard";
import { BalanceCard } from "../BalanceCard";
import { MyPredictionMarketCard } from "../MyPredictionMarketCard";
import { DefiCard } from "../DeFiCard";
import { GroupCard } from "../GroupCard";

export const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 rounded-4xl p-3 bg-white/50 relative overflow-hidden">
      <div className="lg:col-span-1 flex flex-col h-full">
        <PredictionCard />
      </div>

      <div className="lg:col-span-1 flex flex-col gap-6 h-full">
        <div className="flex-1">
          <ActivityCard />
        </div>
        <div className="flex-1">
          <MyPredictionMarketCard />
        </div>
      </div>

      <div className="lg:col-span-1 flex flex-col h-full">
        <BalanceCard />
      </div>

      <div className="lg:col-span-1 flex flex-col gap-6 h-full">
        <div className="flex-1">
          <DefiCard />
        </div>
        <div className="flex-1">
          <GroupCard />
        </div>
      </div>
    </div>
  );
};