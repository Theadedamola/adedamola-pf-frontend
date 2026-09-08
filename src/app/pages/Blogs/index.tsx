import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBlogs } from '@/hooks/queries/useBlogQueries';
import BlogCard from '@/components/common/BlogCard';
import { ScrambleText } from "@/components/common/ScrambleText";
import SEO from "@/components/common/SEO";

export default function Blogs() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useBlogs(page, 9);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 transition-colors duration-500">
      <SEO
        title="Blogs | Adedamola"
        description="Essays, engineering dispatches, and perspectives on design systems and frontend architecture by Adedamola."
      />

      <main className="pt-28 md:pt-36 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-3xl"
        >

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-neutral-900 mb-4">
            <span className="font-heading">
              <ScrambleText text="thoughts & essays" className="inline-block" />
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            dispatches on frontend engineering, component systems, interaction design, and building resilient digital tools.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-700">
              {data?.total || 0} articles published
            </span>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-2xl border border-neutral-200/80 p-5 animate-pulse bg-white">
                <div className="bg-neutral-100 aspect-[16/10] rounded-xl mb-4" />
                <div className="h-3 bg-neutral-100 rounded w-1/3 mb-3" />
                <div className="h-5 bg-neutral-200 rounded w-3/4 mb-3" />
                <div className="h-12 bg-neutral-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <h2 className="text-xl font-medium text-neutral-900 mb-2">unable to load articles</h2>
            <p className="text-sm text-neutral-500 mb-6">failed to retrieve posts. please check connection and try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-mono hover:bg-black transition-colors"
            >
              reload articles
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {data?.blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  title={blog.title}
                  excerpt={blog.excerpt || ''}
                  date={blog.createdAt}
                  image={blog.coverImage || ''}
                  slug={blog.slug}
                  tags={blog.tags}
                  readingTime={blog.readingTime}
                  theme="light"
                />
              ))}
            </div>

            {data?.blogs.length === 0 && (
              <div className="text-center py-24 text-neutral-400 font-mono text-sm">
                no articles published yet.
              </div>
            )}

            {/* Editorial Pagination */}
            {data && data.pages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-8 border-t border-neutral-100">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-5 py-2 rounded-full border border-neutral-200/90 text-xs font-mono text-neutral-700 disabled:opacity-30 hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  ← previous
                </button>
                <span className="px-4 py-1 text-xs font-mono text-neutral-500">
                  page {page} / {data.pages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(data.pages, p + 1))}
                  disabled={page === data.pages}
                  className="px-5 py-2 rounded-full border border-neutral-200/90 text-xs font-mono text-neutral-700 disabled:opacity-30 hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  next →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
