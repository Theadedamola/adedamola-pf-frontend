import ProjectCard from '@/components/common/ProjectCard';
import { useProjects } from '@/hooks/queries/useProjectQueries';
import { Link } from 'react-router-dom';

export default function SelectedWorks() {
  const { data, isLoading } = useProjects(1, 3);
  const projects = data?.projects || [];

  if (isLoading) {
    return (
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-7xl font-thaloria mb-4">Selected Works</h2>
            <p className="text-gray-500 max-w-md">
              A curation of projects that challenged my thinking and sharpened my craft.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
          <div className="aspect-4/3 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          <div className="aspect-4/3 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          <div className="md:col-span-2 aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-7xl font-thaloria mb-4">Selected Works</h2>
          <p className="text-gray-500 max-w-md">
            A curation of projects that challenged my thinking and sharpened my craft.
          </p>
        </div>
        <Link to="/projects" className="text-sm font-mono border-b border-gray-300 pb-1 hover:border-black transition-colors">
          View all projects
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <div 
            key={project._id} 
            className={index === 2 ? "md:col-span-2 md:w-2/3 mx-auto" : ""}
          >
            <ProjectCard
              title={project.title}
              description={project.excerpt || ''}
              year={new Date(project.createdAt).getFullYear().toString()}
              image={project.coverImage || '/assets/placeholder.jpg'}
              link={`/projects/${project.slug}`}
              tags={project.tags}
            />
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-500">
            No projects found.
          </div>
        )}
      </div>
    </section>
  );
}
