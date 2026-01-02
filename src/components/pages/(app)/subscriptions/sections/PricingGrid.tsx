import { PricingPlanCard } from './PricingPlanCard';
import { usePricingPlans, useSelectedPlan } from '@/hooks/useSubscriptionsState';

export const PricingGrid = () => {
  const { pricingPlans } = usePricingPlans();
  const { selectedPlan } = useSelectedPlan();
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-4 border-white h-180"
      style={{
        backgroundImage: "url('/assets/main/background/bg-market.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.8,
      }}
    >
      <div className="flex justify-center mt-8">
        <div className="grid md:grid-cols-3 gap-8 relative z-10 max-w-5xl">
          {pricingPlans.map((plan, index) => (
            <PricingPlanCard
              key={plan.name}
              plan={plan}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}