import { useProjects } from '@/hooks/queries/useProjectQueries';
import ProjectCard from '@/components/common/ProjectCard';
import { motion } from 'framer-motion';
import { ScrambleText } from "@/components/common/ScrambleText";
import SEO from "@/components/common/SEO";

export default function Projects() {
  const { data, isLoading, error } = useProjects(1, 100);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="mb-14 animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-28 mb-4" />
          <div className="h-12 bg-neutral-200 rounded w-72 mb-4" />
          <div className="h-4 bg-neutral-200 rounded w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[16/10] bg-neutral-100 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-medium text-neutral-900 mb-2">unable to load case studies</h2>
        <p className="text-sm text-neutral-500 mb-6">please check your network connection and try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-mono hover:bg-black transition-colors"
        >
          reload page
        </button>
      </div>
    );
  }

  const projects = data?.projects || [];

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
      <SEO
        title="Projects | Adedamola"
        description="A curation of case studies, applications, and design systems engineered by Adedamola."
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-3xl"
      >

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-neutral-900 mb-4">
          <span className="font-heading">
            <ScrambleText text="selected works" className="inline-block" />
          </span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
          a curation of digital products, design systems, and frontend architectures built with care.
        </p>

        {/* Count badge */}
        <div className="mt-5 flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-700">
            {projects.length} projects published
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
        <div className="text-center py-24 text-neutral-400 font-mono text-sm">
          no projects published yet.
        </div>
      )}
    </div>
  );
}
