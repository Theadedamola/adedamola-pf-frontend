import { useProjects } from '@/hooks/queries/useProjectQueries';
import ProjectCard from '@/components/common/ProjectCard';
import { motion } from 'framer-motion';

export default function Projects() {
  const { data, isLoading, error } = useProjects(1, 100); // Fetch up to 100 projects for now

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading projects. Please try again later.
      </div>
    );
  }

  const projects = data?.projects || [];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-thaloria">Selected Works</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          A collection of projects that showcase my passion for building digital experiences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            title={project.title}
            description={project.excerpt || ''}
            year={new Date(project.createdAt).getFullYear().toString()}
            image={project.coverImage || '/assets/placeholder.jpg'}
            link={`/projects/${project.slug}`}
            tags={project.tags}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No projects found.
        </div>
      )}
    </div>
  );
}
