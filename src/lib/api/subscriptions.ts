import api from '../api';
import type { ApiResponse, SubscriptionStatus } from '@/types/api';
import type { CheckoutInput } from '@/types/requests';

export const subscriptionsApi = {
  checkout: (data: CheckoutInput) =>
    api.post<ApiResponse<{ checkoutUrl: string; plan: string; price: number; currency: string }>>(
      '/api/subscriptions/checkout',
      data
    ),

  getStatus: () =>
    api.get<ApiResponse<SubscriptionStatus>>('/api/subscriptions/status'),
};
