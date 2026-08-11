import { motion } from "framer-motion";

const projects = [
  {
    name: "Zmarket",
    role: "Design Engineer",
    description: "Digital marketplace platform",
    link: "https://zmarket.ng",
  },
  {
    name: "Vociara",
    role: "Design Engineer & Creator",
    description: "AI voice synthesis",
    link: "https://vociara.com",
  },
  {
    name: "Nagida Foods",
    role: "Product Designer",
    description: "Food delivery & logistics",
    link: "https://nagidafoods.com",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function DevOrManaged() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-7xl font-heading text-gray-900 mb-4">
          Dev or managed
        </h2>
        <p className="text-gray-500 max-w-md text-sm md:text-base">
          Projects and digital platforms I currently build, manage, or actively maintain.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="divide-y divide-gray-200"
      >
        {projects.map((project, idx) => (
          <motion.a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="group flex items-center justify-between py-10 md:py-12 transition-all duration-300 hover:opacity-85 relative overflow-hidden"
          >
            <div className="flex-1 pr-8">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                {project.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-3 font-mono group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-gray-900 font-semibold">{project.role}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span>{project.description}</span>
              </p>
            </div>

            <div className="text-gray-400 group-hover:text-gray-900 group-hover:rotate-45 group-hover:scale-110 transition-all duration-300 transform p-2 shrink-0">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-10 md:h-10"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
