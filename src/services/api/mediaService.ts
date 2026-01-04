import { axiosInstance } from './axiosInstance';
import type { UploadMediaResponse } from '../../types/api';

export const mediaService = {
  uploadMedia: async (file: File): Promise<UploadMediaResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axiosInstance.post<UploadMediaResponse>('/admin/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteMedia: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/admin/media/${id}`);
  },
};
