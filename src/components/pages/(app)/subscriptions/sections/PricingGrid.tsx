import { PricingPlanCard } from './PricingPlanCard';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
}

interface PricingGridProps {
  plans: PricingPlan[];
  selectedPlan: string;
  onPlanSelect: (planName: string) => void;
  onSubscribe: (plan: PricingPlan) => void;
}

export const PricingGrid = ({ plans, selectedPlan, onPlanSelect, onSubscribe }: PricingGridProps) => {
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
          {plans.map((plan, index) => (
            <PricingPlanCard
              key={plan.name}
              plan={plan}
              index={index}
              selectedPlan={selectedPlan}
              onPlanSelect={onPlanSelect}
              onSubscribe={onSubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  )
}