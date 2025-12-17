import api from '../api';
import type { ApiResponse, Group, GroupMember, PredictionMarket } from '@/types/api';
import type {
  CreateGroupInput,
  UpdateGroupInput,
  JoinGroupInput,
  UpdateMemberRoleInput,
  ListGroupsParams,
} from '@/types/requests';

export const groupsApi = {
  list: (params?: ListGroupsParams) =>
    api.get<ApiResponse<Group[]>>('/api/groups', { params }),

  getById: (id: string) =>
    api.get<ApiResponse<Group & { members: GroupMember[]; markets: PredictionMarket[] }>>(
      `/api/groups/${id}`
    ),

  create: (data: CreateGroupInput) =>
    api.post<ApiResponse<Group>>('/api/groups', data),

  update: (id: string, data: UpdateGroupInput) =>
    api.put<ApiResponse<Group>>(`/api/groups/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/api/groups/${id}`),

  join: (data: JoinGroupInput) =>
    api.post<ApiResponse<GroupMember>>('/api/groups/join', data),

  getMembers: (groupId: string) =>
    api.get<ApiResponse<GroupMember[]>>(`/api/groups/${groupId}/members`),

  updateMemberRole: (groupId: string, userId: string, data: UpdateMemberRoleInput) =>
    api.put<ApiResponse<GroupMember>>(`/api/groups/${groupId}/members/${userId}/role`, data),

  removeMember: (groupId: string, userId: string) =>
    api.delete<ApiResponse<null>>(`/api/groups/${groupId}/members/${userId}`),
};
