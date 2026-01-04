import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
  tags?: string[];
  readingTime?: number;
  theme?: 'dark' | 'light';
}

export default function BlogCard({
  title,
  excerpt,
  date,
  image,
  slug,
  tags = [],
  readingTime,
  theme = 'light'
}: BlogCardProps) {
  const isDark = theme === 'dark';
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative w-full"
    >
      {/* Abstract Animated SVG Border/Shape */}
      <div className="absolute -inset-2 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <svg
          className="w-full h-full text-gray-200 dark:text-gray-800"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 0 L100 0 L100 100 L0 100 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <Link to={`/blogs/${slug}`} className="relative overflow-hidden rounded-2xl bg-gray-50 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        {/* Image Container */}
        <div className="aspect-video overflow-hidden relative">
          <motion.img
            src={image || 'https://via.placeholder.com/800x600?text=No+Image'}
            alt={title}
            className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className={`p-6 flex-1 flex flex-col ${isDark ? 'bg-[#090909] text-white' : 'bg-white text-gray-900'}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-4">
              <div className="flex flex-wrap gap-2 text-xs font-mono opacity-60 mb-2 items-center">
                <span>{formattedDate}</span>
                {readingTime && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {readingTime} min read
                    </span>
                  </>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-2 line-clamp-2">{title}</h3>
            </div>
            <motion.div
              whileHover={{ x: 2, y: -2 }}
              className="p-2 rounded-full border border-current opacity-50 group-hover:opacity-100 transition-opacity shrink-0"
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>
          
          <p className="text-sm opacity-80 leading-relaxed mb-4 line-clamp-3 flex-1">
            {excerpt}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100 opacity-80">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
