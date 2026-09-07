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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full"
    >
      <Link
        to={link}
        className={`block relative overflow-hidden rounded-2xl border transition-all duration-500 ${
          isDark
            ? 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-white'
            : 'bg-white border-neutral-200/80 hover:border-neutral-400/90 text-neutral-900'
        }`}
      >
        {/* Image Container */}
        <div className="aspect-[16/10] overflow-hidden relative bg-neutral-100">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        </div>

        {/* Content Details */}
        <div className="p-5 sm:p-6">
          {/* Metadata & Arrow Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {year}
              </span>
              {tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-neutral-100 border border-neutral-200/60 text-neutral-600 lowercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Circular Action Pill */}
            <div className="w-8 h-8 rounded-full border border-neutral-200/90 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950 transition-all duration-300 shrink-0">
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 group-hover:text-black transition-colors mb-1.5 line-clamp-1">
            {title.toLowerCase()}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
