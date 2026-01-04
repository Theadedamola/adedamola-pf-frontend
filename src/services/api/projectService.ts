import { axiosInstance } from './axiosInstance';
import type { 
  ProjectInput, 
  GetProjectsResponse, 
  GetProjectResponse 
} from '../../types/api';

export const projectService = {
  // Public
  getProjects: async (page = 1, limit = 10): Promise<GetProjectsResponse> => {
    const response = await axiosInstance.get<GetProjectsResponse>('/projects', {
      params: { page, limit }
    });
    return response.data;
  },

  getProjectBySlug: async (slug: string): Promise<GetProjectResponse> => {
    const response = await axiosInstance.get<GetProjectResponse>(`/projects/${slug}`);
    return response.data;
  },

  // Admin
  createProject: async (data: ProjectInput): Promise<GetProjectResponse> => {
    const response = await axiosInstance.post<GetProjectResponse>('/admin/projects', data);
    return response.data;
  },

  getAdminProjects: async (page = 1, limit = 10): Promise<GetProjectsResponse> => {
    const response = await axiosInstance.get<GetProjectsResponse>('/admin/projects', {
      params: { page, limit }
    });
    return response.data;
  },

  getProjectById: async (id: string): Promise<GetProjectResponse> => {
    const response = await axiosInstance.get<GetProjectResponse>(`/admin/projects/${id}`);
    return response.data;
  },

  updateProject: async (id: string, data: ProjectInput): Promise<GetProjectResponse> => {
    const response = await axiosInstance.put<GetProjectResponse>(`/admin/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/admin/projects/${id}`);
  },
};
