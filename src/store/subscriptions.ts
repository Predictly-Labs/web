import { atom } from 'jotai'

export interface PricingPlan {
  name: string
  price: string
  period: string
  features: string[]
  recommended?: boolean
  ctaText: string
}

export interface SubscriptionsState {
  pricingPlans: PricingPlan[]
  selectedPlan: string
  isModalOpen: boolean
  selectedModalPlan: PricingPlan | null
  isLoading: boolean
  error: string | null
  currentUserPlan: string
}

export const defaultPricingPlans: PricingPlan[] = [
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
]

export const pricingPlansAtom = atom<PricingPlan[]>(defaultPricingPlans)
export const selectedPlanAtom = atom<string>("Pro")
export const isModalOpenAtom = atom(false)
export const selectedModalPlanAtom = atom<PricingPlan | null>(null)
export const isLoadingAtom = atom(false)
export const errorAtom = atom<string | null>(null)
export const currentUserPlanAtom = atom<string>("Basic")

export const subscriptionsStateAtom = atom((get) => ({
  pricingPlans: get(pricingPlansAtom),
  selectedPlan: get(selectedPlanAtom),
  isModalOpen: get(isModalOpenAtom),
  selectedModalPlan: get(selectedModalPlanAtom),
  isLoading: get(isLoadingAtom),
  error: get(errorAtom),
  currentUserPlan: get(currentUserPlanAtom)
}))

export const selectedPlanDataAtom = atom((get) => {
  const plans = get(pricingPlansAtom)
  const selectedPlan = get(selectedPlanAtom)
  return plans.find(plan => plan.name === selectedPlan) || null
})

export const availableUpgradesAtom = atom((get) => {
  const plans = get(pricingPlansAtom)
  const currentUserPlan = get(currentUserPlanAtom)
  
  const planHierarchy = ["Basic", "Pro", "Enterprise"]
  const currentIndex = planHierarchy.indexOf(currentUserPlan)
  
  return plans.filter((plan, index) => {
    const planIndex = planHierarchy.indexOf(plan.name)
    return planIndex > currentIndex
  })
})

export const canUpgradeAtom = atom((get) => {
  const upgrades = get(availableUpgradesAtom)
  return upgrades.length > 0
})

export const setPricingPlansAtom = atom(
  null,
  (_get, set, plans: PricingPlan[]) => {
    set(pricingPlansAtom, plans)
  }
)

export const setSelectedPlanAtom = atom(
  null,
  (_get, set, planName: string) => {
    set(selectedPlanAtom, planName)
  }
)

export const setModalOpenAtom = atom(
  null,
  (_get, set, open: boolean) => {
    set(isModalOpenAtom, open)
    if (!open) {
      set(selectedModalPlanAtom, null)
    }
  }
)

export const setSelectedModalPlanAtom = atom(
  null,
  (_get, set, plan: PricingPlan | null) => {
    set(selectedModalPlanAtom, plan)
    if (plan) {
      set(isModalOpenAtom, true)
    }
  }
)

export const setLoadingAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(isLoadingAtom, loading)
    if (loading) {
      set(errorAtom, null)
    }
  }
)

export const setErrorAtom = atom(
  null,
  (_get, set, error: string | null) => {
    set(errorAtom, error)
    if (error) {
      set(isLoadingAtom, false)
    }
  }
)

export const setCurrentUserPlanAtom = atom(
  null,
  (_get, set, planName: string) => {
    set(currentUserPlanAtom, planName)
  }
)

export const subscribeToPlanAtom = atom(
  null,
  (get, set, plan: PricingPlan) => {
    if (plan.name === "Basic") {
      return
    }
    
    if (plan.name === "Pro" || plan.name === "Enterprise") {
      set(selectedModalPlanAtom, plan)
      set(isModalOpenAtom, true)
    }
  }
)

export const resetSubscriptionsStateAtom = atom(
  null,
  (_get, set) => {
    set(pricingPlansAtom, defaultPricingPlans)
    set(selectedPlanAtom, "Pro")
    set(isModalOpenAtom, false)
    set(selectedModalPlanAtom, null)
    set(isLoadingAtom, false)
    set(errorAtom, null)
    set(currentUserPlanAtom, "Basic")
  }
)