import { useNavigate, useParams } from 'react-router-dom';
import { useAdminProject, useUpdateProject } from '@/hooks/queries/useProjectQueries';
import ProjectForm from '../ProjectForm';

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: projectResponse, isLoading } = useAdminProject(id!);
  const { mutate: updateProject, isPending } = useUpdateProject();

  const handleSubmit = (data: any) => {
    updateProject(
      { id: id!, data },
      {
        onSuccess: () => {
          navigate('/admin/projects');
        },
      }
    );
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading project...</div>;
  }

  const project = projectResponse?.data;

  if (!project) {
    return <div className="p-8 text-center text-red-500">Project not found</div>;
  }

  return (
    <ProjectForm
      title="Edit Project"
      initialData={project}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
