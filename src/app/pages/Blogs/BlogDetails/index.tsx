import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { useBlog } from "@/hooks/queries/useBlogQueries";
import SEO from "@/components/common/SEO";
import ImageLightbox, {
  ClickableImage,
} from "@/components/common/ImageLightbox";
import { useState } from "react";

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useBlog(slug || "");

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
          <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
          <Link to="/blogs" className="text-blue-500 hover:underline">
            Back to Blogs
          </Link>
        </main>
      </div>
    );
  }

  const {
    title,
    createdAt,
    readingTime,
    tags,
    coverImage,
    contentBlocks,
    excerpt,
  } = data.data;
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Sort blocks by order just in case
  const sortedBlocks = [...contentBlocks].sort((a, b) => a.order - b.order);

  const blogDescription = excerpt || `Read ${title}, a blog post by Adedamola.`;

  return (
    <div className="min-h-screen transition-colors duration-500 text-gray-900">
      <SEO
        title={`${title} | Adedamola`}
        description={blogDescription}
        image={coverImage}
        url={`https://adedamola-dev.netlify.app/blogs/${slug}`}
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
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blogs
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
              <span>•</span>
              <span className="flex items-center gap-2">
                <Clock size={14} />
                {readingTime} min read
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

          {/* Excerpt */}
          {excerpt && (
            <div className="text-xl md:text-2xl font-medium leading-relaxed opacity-80 mb-12 italic">
              {excerpt}
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
        </motion.article>
      </main>
    </div>
  );
}
