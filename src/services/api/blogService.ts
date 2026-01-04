import { axiosInstance } from './axiosInstance';
import type { 
  BlogInput, 
  GetBlogsResponse, 
  GetBlogResponse 
} from '../../types/api';

export const blogService = {
  // Public
  getBlogs: async (page = 1, limit = 10): Promise<GetBlogsResponse> => {
    const response = await axiosInstance.get<GetBlogsResponse>('/blogs', {
      params: { page, limit }
    });
    return response.data;
  },

  getBlogBySlug: async (slug: string): Promise<GetBlogResponse> => {
    const response = await axiosInstance.get<GetBlogResponse>(`/blogs/${slug}`);
    return response.data;
  },

  // Admin
  createBlog: async (data: BlogInput): Promise<GetBlogResponse> => {
    const response = await axiosInstance.post<GetBlogResponse>('/admin/blogs', data);
    return response.data;
  },

  getAdminBlogs: async (page = 1, limit = 10): Promise<GetBlogsResponse> => {
    const response = await axiosInstance.get<GetBlogsResponse>('/admin/blogs', {
      params: { page, limit }
    });
    return response.data;
  },

  getBlogById: async (id: string): Promise<GetBlogResponse> => {
    const response = await axiosInstance.get<GetBlogResponse>(`/admin/blogs/${id}`);
    return response.data;
  },

  updateBlog: async (id: string, data: BlogInput): Promise<GetBlogResponse> => {
    const response = await axiosInstance.put<GetBlogResponse>(`/admin/blogs/${id}`, data);
    return response.data;
  },

  deleteBlog: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/admin/blogs/${id}`);
  },
};
