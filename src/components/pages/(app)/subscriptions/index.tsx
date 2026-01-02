"use client";

import React from "react";
import Sidebar from "@/components/ui/Sidebar";
import { SubscriptionsHeader } from "./sections/SubscriptionsHeader";
import { PricingGrid } from "./sections/PricingGrid";
import { PlanModal } from "./sections/PlanModal";
import {
  usePricingPlans,
  useSelectedPlan,
  useModal,
  useSubscriptionsActions
} from "@/hooks/useSubscriptionsState";

export const SubscriptionsPage: React.FC = () => {
  const { pricingPlans } = usePricingPlans();
  const { selectedPlan } = useSelectedPlan();
  const { isModalOpen, selectedModalPlan } = useModal();
  const { handlePlanSelect, handleSubscribe, handleCloseModal } = useSubscriptionsActions();

  return (
    <div className="p-3 sm:p-6 min-h-screen relative bg-[#f7f5fa]">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <Sidebar />

      <div className="max-w-7xl mx-auto relative z-10">
        <SubscriptionsHeader />
        
        <PricingGrid />
      </div>

      <PlanModal />
    </div>
  );
};