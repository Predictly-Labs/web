export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isOwner?: boolean;
}

export interface GroupMemberData {
  id: string;
  groupId: string;
  userId: string;
  role: 'ADMIN' | 'MEMBER';
  joinedAt: string;
  user: {
    id: string;
    displayName: string;
    avatarUrl: string;
    walletAddress: string;
  };
}

export interface MarketData {
  id: string;
  title: string;
  description: string;
  endDate: string;
  totalPool: number;
  participants: number;
  status: 'active' | 'closed' | 'pending';
  category: string;
  currentOdds?: number;
  createdBy: string;
  createdAt: string;
}

export interface GroupData {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  activeMarkets: number;
  totalVolume: number;
  owner: string;
  members: GroupMember[];
  createdAt: string;
  updatedAt?: string;
  isPrivate: boolean;
  markets: MarketData[];
  iconUrl?: string;
  inviteCode?: string;
  isPublic?: boolean;
  createdById?: string;
  createdBy?: {
    id: string;
    displayName: string;
    avatarUrl: string;
  };
  _count?: {
    members: number;
    markets: number;
  };
  userRole?: string | null;
  isMember?: boolean;
  stats?: {
    memberCount: number;
    activeMarkets: number;
    totalVolume: number;
  };
}

export interface ApiGroup {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  isPublic: boolean;
  createdAt: string;
  stats?: {
    memberCount: number;
    activeMarkets: number;
    totalVolume: number;
  };
  _count?: {
    members: number;
    markets: number;
  };
}

export interface DetailedGroupData {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  inviteCode: string;
  isPublic: boolean;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    displayName: string;
    avatarUrl: string;
  };
  members: GroupMemberData[];
  markets: MarketData[];
  _count: {
    members: number;
    markets: number;
  };
  userRole: string | null;
  isMember: boolean;
  stats: {
    memberCount: number;
    totalMarkets: number;
  };
  avatar?: string;
}