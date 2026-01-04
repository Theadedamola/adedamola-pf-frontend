import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBlogs } from '@/hooks/queries/useBlogQueries';
import BlogCard from '@/components/common/BlogCard';

export default function Blogs() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useBlogs(page, 9); // Fetch 9 blogs per page

  return (
    <div className="min-h-screen transition-colors duration-500">
      
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Thoughts & Perspectives
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl opacity-60 max-w-2xl"
          >
            Insights on engineering, design, and the journey of building digital products.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-800 aspect-video rounded-2xl mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4" />
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4" />
                <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="opacity-60 mb-8">Failed to load blogs. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                  theme="light" // Or dynamic based on context if we had a theme provider
                />
              ))}
            </div>

            {/* Pagination */}
            {data && data.pages > 1 && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-2 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <span className="flex items-center px-4 font-mono">
                  {page} / {data.pages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(data.pages, p + 1))}
                  disabled={page === data.pages}
                  className="px-6 py-2 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
