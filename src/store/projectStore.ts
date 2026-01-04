import { create } from 'zustand';

interface Project {
  id: string;
  title: string;
  description: string;
  // Add other fields as needed
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  // Add other actions as needed
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      // const response = await axiosInstance.get('/projects');
      // set({ projects: response.data, isLoading: false });
      set({ isLoading: false }); // Mock
    } catch (error) {
      set({ error: 'Failed to fetch projects', isLoading: false });
    }
  },
}));
