import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  company?: string;
  className?: string;
}

export default function TestimonialCard({
  name,
  role,
  quote,
  company,
  className = "",
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col justify-between ${className}`}
    >
      {/* The Quote */}
      <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
        "{quote}"
      </p>

      {/* Author Name & Role */}
      <div className="mt-5">
        <h4 className="text-xs sm:text-sm font-medium text-neutral-900 leading-tight lowercase">
          {name}
        </h4>
        <p className="text-xs font-mono text-neutral-400 mt-1 lowercase">
          {role} {company ? `@ ${company}` : ""}
        </p>
      </div>
    </motion.div>
  );
}
