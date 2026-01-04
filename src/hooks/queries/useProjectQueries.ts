import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../../services/api/projectService';
import type { ProjectInput } from '../../types/api';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (page: number, limit: number) => [...projectKeys.lists(), { page, limit }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (idOrSlug: string) => [...projectKeys.details(), idOrSlug] as const,
  admin: () => [...projectKeys.all, 'admin'] as const,
  adminList: (page: number, limit: number) => [...projectKeys.admin(), { page, limit }] as const,
};

// Public Hooks
export const useProjects = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: projectKeys.list(page, limit),
    queryFn: () => projectService.getProjects(page, limit),
  });
};

export const useProject = (slug: string) => {
  return useQuery({
    queryKey: projectKeys.detail(slug),
    queryFn: () => projectService.getProjectBySlug(slug),
    enabled: !!slug,
  });
};

// Admin Hooks
export const useAdminProjects = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: projectKeys.adminList(page, limit),
    queryFn: () => projectService.getAdminProjects(page, limit),
  });
};

export const useAdminProject = (id: string) => {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectService.getProjectById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProjectInput }) =>
      projectService.updateProject(id, data),
    onSuccess: (response) => {
      const data = response.data;
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(data._id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(data.slug) });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};
