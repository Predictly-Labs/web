"use client";

import React, { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { Check, X } from "lucide-react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import proAnimation from "../../../../../public/assets/main/animation/pro-animation.json";
import enterpriseAnimation from "../../../../../public/assets/main/animation/enterprise-animation.json";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    features: [
      "Create up to 3 prediction markets",
      "Join unlimited groups",
      "Basic analytics",
      "Community support",
      "Standard DeFi protocol access",
    ],
    ctaText: "Your tier right now",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "Create unlimited prediction markets",
      "Create up to 20 groups",
      "Advanced analytics dashboard",
      "Priority support",
      "Extended DeFi protocol access",
      "Custom market templates",
      "Private group branding",
      "Export data capabilities",
    ],
    recommended: true,
    ctaText: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    features: [
      "Everything in Pro",
      "Unlimited groups",
      "White-label solutions",
      "API access",
      "Dedicated support manager",
      "Custom integrations",
      "Advanced compliance tools",
      "Premium NFT access pass",
    ],
    ctaText: "Contact Sales",
  },
];

export const SubscriptionsPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("Pro");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalPlan, setSelectedModalPlan] = useState<PricingPlan | null>(null);

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handleSubscribe = (plan: PricingPlan) => {
    if (plan.name === "Basic") {
      return;
    }
    
    if (plan.name === "Pro" || plan.name === "Enterprise") {
      setSelectedModalPlan(plan);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModalPlan(null);
  };

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="relative mb-6">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                backgroundImage: "url('/assets/main/background/bg-main.png')",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-4 p-6">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-medium text-pink-900">
                      Subscription Plans
                    </h1>
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center max-w-2xl">
                    Unlock advanced features and expand your prediction market
                    capabilities with our flexible pricing plans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: pricingPlans.indexOf(plan) * 0.1 }}
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
            ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedModalPlan && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedModalPlan.name} Plan Details
                </h2>
                <motion.button
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <motion.div 
                  className="mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                >
                  <Lottie 
                    animationData={selectedModalPlan.name === "Pro" ? proAnimation : enterpriseAnimation}
                    className="w-32 h-32 mx-auto"
                    loop
                  />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedModalPlan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {selectedModalPlan.price}
                  </span>
                  {selectedModalPlan.period && (
                    <span className="text-lg text-gray-500">
                      {selectedModalPlan.period}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <motion.h4 
                  className="text-lg font-semibold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Features included:
                </motion.h4>
                <ul className="space-y-3">
                  {selectedModalPlan.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Check className="w-5 h-5 mt-0.5 shrink-0 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer mb-3"
                >
                  Coming Soon
                </motion.button>
                <motion.p 
                  className="text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  This feature will be available in the next update. Stay tuned!
                </motion.p>
              </motion.div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
