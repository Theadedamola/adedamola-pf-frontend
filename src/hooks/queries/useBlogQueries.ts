import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '../../services/api/blogService';
import type { BlogInput } from '../../types/api';

export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (page: number, limit: number) => [...blogKeys.lists(), { page, limit }] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (idOrSlug: string) => [...blogKeys.details(), idOrSlug] as const,
  admin: () => [...blogKeys.all, 'admin'] as const,
  adminList: (page: number, limit: number) => [...blogKeys.admin(), { page, limit }] as const,
};

// Public Hooks
export const useBlogs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: blogKeys.list(page, limit),
    queryFn: () => blogService.getBlogs(page, limit),
  });
};

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => blogService.getBlogBySlug(slug),
    enabled: !!slug,
  });
};

// Admin Hooks
export const useAdminBlogs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: blogKeys.adminList(page, limit),
    queryFn: () => blogService.getAdminBlogs(page, limit),
  });
};

export const useAdminBlog = (id: string) => {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => blogService.getBlogById(id),
    enabled: !!id,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BlogInput }) =>
      blogService.updateBlog(id, data),
    onSuccess: (response) => {
      const data = response.data;
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(data._id) });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(data.slug) });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
};
