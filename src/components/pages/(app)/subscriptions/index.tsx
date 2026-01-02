"use client";

import React, { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { SubscriptionsHeader } from "./sections/SubscriptionsHeader";
import { PricingGrid } from "./sections/PricingGrid";
import { PlanModal } from "./sections/PlanModal";

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
        <SubscriptionsHeader />
        
        <PricingGrid 
          plans={pricingPlans}
          selectedPlan={selectedPlan}
          onPlanSelect={handlePlanSelect}
          onSubscribe={handleSubscribe}
        />
      </div>

      <PlanModal
        isOpen={isModalOpen}
        plan={selectedModalPlan}
        onClose={handleCloseModal}
      />
    </div>
  );
};