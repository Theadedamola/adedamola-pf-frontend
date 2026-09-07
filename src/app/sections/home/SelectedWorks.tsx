import ProjectCard from '@/components/common/ProjectCard';
import { useProjects } from '@/hooks/queries/useProjectQueries';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SelectedWorks() {
  const { data, isLoading } = useProjects(1, 3);
  const projects = data?.projects || [];

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-100">
        <div className="mb-12 md:mb-16 animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-28 mb-4" />
          <div className="h-10 bg-neutral-200 rounded w-64 mb-3" />
          <div className="h-4 bg-neutral-200 rounded w-80" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-pulse">
          <div className="aspect-[16/10] bg-neutral-100 rounded-2xl" />
          <div className="aspect-[16/10] bg-neutral-100 rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
      >
        <div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.2]">
            case <span className="font-heading">studies</span>.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-md font-normal">
            curated products and systems engineered for high scale, reliability, and craft.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200/90 text-xs font-mono text-neutral-700 hover:text-black hover:border-neutral-400 hover:bg-neutral-50 transition-all self-start md:self-end"
        >
          <span>view all projects</span>
          <span className="text-[11px]">→</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <div
            key={project._id}
            className={index === 2 ? "md:col-span-2 md:w-3/4 mx-auto" : ""}
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
          <div className="col-span-full text-center py-20 text-neutral-400 font-mono text-sm">
            no projects published yet.
          </div>
        )}
      </div>
    </section>
  );
}
