"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/ui/Sidebar';
import { Check } from 'lucide-react';
import { BsLightning, BsBarChart, BsPalette } from 'react-icons/bs';

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
      "Standard DeFi protocol access"
    ],
    ctaText: "Get Started"
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
      "Export data capabilities"
    ],
    recommended: true,
    ctaText: "Upgrade to Pro"
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
      "Premium NFT access pass"
    ],
    ctaText: "Contact Sales"
  }
];

export const SubscriptionsPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('Pro');

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handleSubscribe = (plan: PricingPlan) => {
    console.log(`Subscribing to ${plan.name} plan`);
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
                    <h1 className="text-3xl font-medium text-pink-900">Subscription Plans</h1>
                  </div>
                  <p className="text-sm sm:text-base lg:text-md text-gray-500 text-center max-w-2xl">
                    Unlock advanced features and expand your prediction market capabilities with our flexible pricing plans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 border-2 transition-all cursor-pointer ${
                  plan.recommended
                    ? 'border-black bg-black text-white'
                    : selectedPlan === plan.name
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
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
                  <h3 className={`text-xl font-semibold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className={`text-4xl font-bold ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`text-lg ${plan.recommended ? 'text-gray-300' : 'text-gray-500'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 shrink-0 ${plan.recommended ? 'text-white' : 'text-green-600'}`} />
                      <span className={`text-sm ${plan.recommended ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all cursor-pointer ${
                    plan.recommended
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-pink-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Why Choose Pro or Enterprise?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BsLightning className="text-xl text-pink-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Enhanced Performance</h4>
                  <p>Access to premium DeFi protocols and faster transaction processing</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BsBarChart className="text-xl text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Advanced Analytics</h4>
                  <p>Detailed insights and custom reporting for better decision making</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BsPalette className="text-xl text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Custom Branding</h4>
                  <p>Personalize your groups and markets with custom themes and branding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};