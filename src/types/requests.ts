import type { MarketType, Prediction, Outcome } from './api';

// Auth requests
export interface LoginInput {
  privyId: string;
  walletAddress?: string;
  displayName?: string;
  avatarUrl?: string;
}

// User requests
export interface UpdateProfileInput {
  displayName?: string;
  avatarUrl?: string;
}

// Group requests
export interface CreateGroupInput {
  name: string;
  description?: string;
  iconUrl?: string;
  isPublic?: boolean;
}

export interface UpdateGroupInput {
  name?: string;
  description?: string;
  iconUrl?: string;
  isPublic?: boolean;
}

export interface JoinGroupInput {
  inviteCode: string;
}

export interface UpdateMemberRoleInput {
  role: 'ADMIN' | 'JUDGE' | 'MODERATOR' | 'MEMBER';
}

// Prediction requests
export interface CreateMarketInput {
  groupId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  marketType?: MarketType;
  endDate: string;
  minStake?: number;
  maxStake?: number;
}

export interface VoteInput {
  prediction: Prediction;
  amount: number;
}

export interface ResolveMarketInput {
  outcome: Outcome;
  resolutionNote?: string;
}

// Query params
export interface ListParams {
  page?: number;
  limit?: number;
}

export interface ListGroupsParams extends ListParams {
  search?: string;
}

export interface ListMarketsParams extends ListParams {
  groupId?: string;
  status?: string;
}

// Subscription requests
export interface CheckoutInput {
  plan: 'monthly' | 'yearly';
}
