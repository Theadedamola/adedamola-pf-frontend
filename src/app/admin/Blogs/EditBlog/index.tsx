import { useNavigate, useParams } from 'react-router-dom';
import { useAdminBlog, useUpdateBlog } from '@/hooks/queries/useBlogQueries';
import BlogForm from '../BlogForm';

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: blogResponse, isLoading } = useAdminBlog(id!);
  const { mutate: updateBlog, isPending } = useUpdateBlog();

  const handleSubmit = (data: any) => {
    updateBlog(
      { id: id!, data },
      {
        onSuccess: () => {
          navigate('/admin/blogs');
        },
      }
    );
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading blog...</div>;
  }

  const blog = blogResponse?.data;

  if (!blog) {
    return <div className="p-8 text-center text-red-500">Blog not found</div>;
  }

  return (
    <BlogForm
      title="Edit Blog"
      initialData={blog}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
