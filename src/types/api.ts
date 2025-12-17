// User types
export interface User {
  id: string;
  privyId: string;
  walletAddress?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  totalPredictions: number;
  correctPredictions: number;
  totalEarnings: number;
  currentStreak: number;
  isPro: boolean;
  proExpiresAt?: string | null;
  createdAt: string;
}

// Group types
export interface Group {
  id: string;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  inviteCode: string;
  isPublic: boolean;
  createdById: string;
  createdAt: string;
  _count?: {
    members: number;
    markets: number;
  };
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: 'ADMIN' | 'JUDGE' | 'MODERATOR' | 'MEMBER';
  joinedAt: string;
  user: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
}

// Prediction Market types
export type MarketStatus = 'ACTIVE' | 'PENDING' | 'RESOLVED' | 'DISPUTED' | 'CANCELLED';
export type MarketType = 'STANDARD' | 'NO_LOSS' | 'WITH_YIELD';
export type Prediction = 'YES' | 'NO';
export type Outcome = 'YES' | 'NO' | 'INVALID';

export interface PredictionMarket {
  id: string;
  groupId: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  status: MarketStatus;
  marketType: MarketType;
  outcome?: Outcome | null;
  yesPercentage: number;
  noPercentage: number;
  yesPool: number;
  noPool: number;
  totalVolume: number;
  participantCount: number;
  endDate: string;
  minStake: number;
  maxStake?: number | null;
  createdById: string;
  resolvedById?: string | null;
  resolvedAt?: string | null;
  resolutionNote?: string | null;
  createdAt: string;
  creator?: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  group?: Pick<Group, 'id' | 'name'>;
}

// Vote types
export interface Vote {
  id: string;
  marketId: string;
  userId: string;
  prediction: Prediction;
  amount: number;
  rewardAmount?: number | null;
  hasClaimedReward: boolean;
  createdAt: string;
  market?: Pick<PredictionMarket, 'id' | 'title' | 'status' | 'outcome' | 'endDate'>;
  user?: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  mockYield?: number;
  daysSinceVote?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Subscription types
export interface SubscriptionStatus {
  isPro: boolean;
  expiresAt?: string | null;
  daysRemaining: number;
}

// Upload types
export interface UploadResponse {
  ipfsHash: string;
  ipfsUrl: string;
  gatewayUrl: string;
}
