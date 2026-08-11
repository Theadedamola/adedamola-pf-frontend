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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full max-w-2xl flex flex-col justify-between py-10 bg-transparent ${className}`}
    >
      <div className="relative space-y-6">
        {/* Elegant background quotation mark */}
        <span className="text-gray-200 text-[120px] font-serif absolute -top-16 -left-6 select-none pointer-events-none opacity-50">
          “
        </span>

        {/* Quote text */}
        <p className="text-gray-700 text-lg md:text-2xl font-light leading-relaxed relative z-10 pl-6 md:pl-8 italic">
          {quote}
        </p>
      </div>

      {/* Author info with simple left-border line anchor */}
      <div className="flex items-center gap-4 mt-8 pl-6 md:pl-8 border-l-2 border-gray-200">
        <div>
          <h4 className="font-semibold text-gray-900 text-base md:text-lg">
            {name}
          </h4>
          <p className="text-sm text-gray-500 font-mono mt-1">
            {role} {company && <span>@ <span className="text-gray-900 font-medium">{company}</span></span>}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
