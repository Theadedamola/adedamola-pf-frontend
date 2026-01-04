import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  description: string;
  year: string;
  image: string;
  link?: string;
  tags?: string[];
  theme?: 'dark' | 'light';
}

export default function ProjectCard({
  title,
  description,
  year,
  image,
  link = '#',
  tags = [],
  theme = 'light'
}: ProjectCardProps) {
  const isDark = theme === 'dark';

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

      <Link to={link} className="block relative overflow-hidden rounded-2xl bg-gray-50 hover:shadow-2xl transition-all duration-500">
        {/* Image Container */}
        <div className="aspect-4/3 overflow-hidden relative">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className={`p-6 ${isDark ? 'bg-[#090909] text-white' : 'bg-white text-gray-900'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl mb-2">{title}</h3>
              <div className="flex gap-2 text-xs font-mono opacity-60">
                <span>{year}</span>
                {tags.map((tag, i) => (
                  <span key={i}>• {tag}</span>
                ))}
              </div>
            </div>
            <motion.div
              whileHover={{ x: 2, y: -2 }}
              className="p-2 rounded-full border border-current opacity-50 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>
          <p className="text-sm opacity-80 leading-relaxed max-w-md">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
