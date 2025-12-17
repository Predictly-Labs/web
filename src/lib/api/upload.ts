import api from '../api';
import type { ApiResponse, UploadResponse } from '@/types/api';

export const uploadApi = {
  image: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post<ApiResponse<UploadResponse>>('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
