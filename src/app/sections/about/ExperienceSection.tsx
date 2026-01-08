import { motion } from "framer-motion";

const experiences = [
  {
    role: "Design Engineer",
    company: "Zmarket",
    period: "2024 - Present",
    description:
      "Designing and implementing scalable e-commerce solutions with React and Next.js, focusing on performance and user experience.",
  },
  {
    role: "Design Engineer",
    company: "Reycasa Technologies",
    period: "2023 - Present",
    description:
      "Designing and implementing modern web applications with cutting-edge technologies and best practices.",
  },
  {
    role: "Product Designer",
    company: "NagidaFoods",
    period: "2023 - 2024",
    description:
      "Designing and implementing a comprehensive digital platform to increase customer engagement and streamline operations. Designed end to end product varying accross inventory, admin and finance management, sales, and delivery. A full food ordering mobile application",
  },
  {
    role: "Freelance Designer",
    company: "Self-Employed",
    period: "2021 - Present",
    description:
      "Working with diverse clients to bring their visions to life through code and design.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function ExperienceSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-thaloria text-gray-900 mb-4">
            Experience
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            A timeline of my professional journey and the companies I've had the
            privilege to work with.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 w-3 h-3 -translate-x-1/2 bg-blue-600 rounded-full ring-4 ring-blue-100" />

                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exp.role}
                      </h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-sm mt-2 md:mt-0 font-mono">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
