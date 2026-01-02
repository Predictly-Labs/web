import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useSelectedPlan, useSubscriptionsActions } from "@/hooks/useSubscriptionsState";
import { PricingPlan } from "@/store/subscriptions";

interface PricingPlanCardProps {
  plan: PricingPlan;
  index: number;
}

export const PricingPlanCard = ({ plan, index }: PricingPlanCardProps) => {
  const { selectedPlan } = useSelectedPlan();
  const { handlePlanSelect, handleSubscribe } = useSubscriptionsActions();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-3xl p-8 border-2 transition-all cursor-pointer border-white shadow-sm ${
        plan.recommended
          ? "bg-black text-white"
          : selectedPlan === plan.name
          ? "border-gray-300 bg-gray-50"
          : "bg-white hover:border-gray-300"
      }`}
      onClick={() => handlePlanSelect(plan.name)}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-pink-900 text-white px-4 py-1 rounded-full text-xs font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3
          className={`text-xl font-semibold mb-2 ${
            plan.recommended ? "text-white" : "text-gray-900"
          }`}
        >
          {plan.name}
        </h3>
        <div className="mb-4">
          <span
            className={`text-4xl font-bold ${
              plan.recommended ? "text-white" : "text-gray-900"
            }`}
          >
            {plan.price}
          </span>
          {plan.period && (
            <span
              className={`text-lg ${
                plan.recommended ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {plan.period}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className={`w-5 h-5 mt-0.5 shrink-0 ${
                plan.recommended ? "text-white" : "text-green-600"
              }`}
            />
            <span
              className={`text-sm ${
                plan.recommended ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <motion.button
        onClick={() => handleSubscribe(plan)}
        disabled={plan.name === "Basic"}
        whileHover={plan.name !== "Basic" ? { scale: 1.05 } : {}}
        whileTap={plan.name !== "Basic" ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
          plan.name === "Basic" 
            ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
            : plan.recommended
              ? "bg-white text-black hover:bg-gray-100 cursor-pointer"
              : "bg-black text-white hover:bg-gray-800 cursor-pointer"
        }`}
      >
        {plan.ctaText}
      </motion.button>
    </motion.div>
  )
}