import api from '../api';
import type { ApiResponse, User } from '@/types/api';
import type { LoginInput, UpdateProfileInput } from '@/types/requests';

export const authApi = {
  login: (data: LoginInput) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/api/users/auth/privy', data),

  getMe: () =>
    api.get<ApiResponse<User>>('/api/users/me'),

  updateProfile: (data: UpdateProfileInput) =>
    api.put<ApiResponse<User>>('/api/users/me', data),

  getLeaderboard: (groupId?: string) =>
    api.get<ApiResponse<User[]>>('/api/users/leaderboard', {
      params: groupId ? { groupId } : undefined,
    }),
};
