import { useNavigate } from 'react-router-dom';
import { useCreateProject } from '@/hooks/queries/useProjectQueries';
import ProjectForm from '../ProjectForm';

export default function CreateProject() {
  const navigate = useNavigate();
  const { mutate: createProject, isPending } = useCreateProject();

  const handleSubmit = (data: any) => {
    createProject(data, {
      onSuccess: () => {
        navigate('/admin/projects');
      },
    });
  };

  return (
    <ProjectForm
      title="Create Project"
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
