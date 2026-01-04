import { create } from 'zustand';

interface Blog {
  id: string;
  title: string;
  content: string;
  // Add other fields as needed
}

interface BlogState {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
  // Add other actions as needed
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  isLoading: false,
  error: null,
  fetchBlogs: async () => {
    set({ isLoading: true });
    try {
      // const response = await axiosInstance.get('/blogs');
      // set({ blogs: response.data, isLoading: false });
      set({ isLoading: false }); // Mock
    } catch (error) {
      set({ error: 'Failed to fetch blogs', isLoading: false });
    }
  },
}));
