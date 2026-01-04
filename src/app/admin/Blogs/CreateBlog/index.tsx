import { useNavigate } from 'react-router-dom';
import { useCreateBlog } from '@/hooks/queries/useBlogQueries';
import BlogForm from '../BlogForm';

export default function CreateBlog() {
  const navigate = useNavigate();
  const { mutate: createBlog, isPending } = useCreateBlog();

  const handleSubmit = (data: any) => {
    createBlog(data, {
      onSuccess: () => {
        navigate('/admin/blogs');
      },
    });
  };

  return (
    <BlogForm
      title="Create Blog"
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
