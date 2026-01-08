import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { useProject, useProjects } from "@/hooks/queries/useProjectQueries";
import SEO from "@/components/common/SEO";
import ImageLightbox, {
  ClickableImage,
} from "@/components/common/ImageLightbox";
import { useState } from "react";

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useProject(slug || "");
  const { data: projectsData } = useProjects(1, 100);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState({ src: "", alt: "" });

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt });
    setLightboxOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8" />
          <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-6" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-12" />
          <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl mb-12" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <Link to="/projects" className="text-blue-500 hover:underline">
            Back to Projects
          </Link>
        </main>
      </div>
    );
  }

  const { title, createdAt, tags, coverImage, contentBlocks, excerpt } =
    data.data;
  const formattedDate = new Date(createdAt).getFullYear().toString();

  // Sort blocks by order just in case
  const sortedBlocks = [...contentBlocks].sort((a, b) => a.order - b.order);

  // Determine next project
  const projects = projectsData?.projects || [];
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject =
    currentIndex !== -1 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  const projectDescription =
    excerpt || `Check out ${title}, a project by Adedamola.`;

  return (
    <div className="min-h-screen transition-colors duration-500 text-gray-900">
      <SEO
        title={`${title} | Adedamola`}
        description={projectDescription}
        image={coverImage}
        url={`https://adedamola-dev.netlify.app/projects/${slug}`}
        type="article"
      />

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        imageSrc={lightboxImage.src}
        imageAlt={lightboxImage.alt}
        onClose={() => setLightboxOpen(false)}
      />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-8"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-4 text-sm font-mono opacity-60 mb-6 items-center">
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {formattedDate}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-8 leading-tight">
              {title}
            </h1>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 opacity-80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image */}
          {coverImage && (
            <div className="aspect-video w-full overflow-hidden rounded-3xl mb-16 shadow-2xl">
              <ClickableImage
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover"
                onClick={() => openLightbox(coverImage, title)}
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {sortedBlocks.map((block, index) => {
              if (block.type === "image") {
                return (
                  <figure key={index} className="my-12">
                    <ClickableImage
                      src={block.value}
                      alt={`Content image ${index + 1}`}
                      className="w-full rounded-2xl"
                      onClick={() =>
                        openLightbox(block.value, `Content image ${index + 1}`)
                      }
                    />
                  </figure>
                );
              }

              return (
                <div
                  key={index}
                  className="prose prose-lg max-w-none mb-6 text-lg leading-relaxed opacity-90 
                    [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 
                    [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600
                    [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );
            })}
          </div>

          {/* Next Project Navigation */}
          {nextProject && (
            <div className="mt-24 pt-12 border-t border-gray-200 ">
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group block"
              >
                <div className="text-sm font-mono opacity-60 mb-4">
                  Next Project
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl md:text-5xl group-hover:opacity-60 transition-opacity">
                    {nextProject.title}
                  </h3>
                  <div className="p-4 rounded-full border border-gray-200 group-hover:bg-gray-100 transition-colors">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </Link>
            </div>
          )}
        </motion.article>
      </main>
    </div>
  );
}
