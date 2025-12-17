import api from '../api';
import type { ApiResponse, PredictionMarket, Vote } from '@/types/api';
import type {
  CreateMarketInput,
  VoteInput,
  ResolveMarketInput,
  ListMarketsParams,
} from '@/types/requests';

export const predictionsApi = {
  list: (params?: ListMarketsParams) =>
    api.get<ApiResponse<PredictionMarket[]>>('/api/predictions', { params }),

  getById: (id: string) =>
    api.get<ApiResponse<PredictionMarket & { votes: Vote[]; userVote?: Vote | null }>>(
      `/api/predictions/${id}`
    ),

  create: (data: CreateMarketInput) =>
    api.post<ApiResponse<PredictionMarket>>('/api/predictions', data),

  vote: (id: string, data: VoteInput) =>
    api.post<ApiResponse<Vote>>(`/api/predictions/${id}/vote`, data),

  resolve: (id: string, data: ResolveMarketInput) =>
    api.post<ApiResponse<{ outcome: string; resolvedAt: string }>>(
      `/api/predictions/${id}/resolve`,
      data
    ),

  claim: (id: string) =>
    api.post<ApiResponse<{ rewardAmount: number }>>(`/api/predictions/${id}/claim`),

  getMyVotes: () =>
    api.get<ApiResponse<Vote[]>>('/api/predictions/my-votes'),
};
