import { motion } from "framer-motion";
import { Code, Heart, Lightbulb, Target } from "lucide-react";

const values = [
  {
    icon: Code,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code that stands the test of time and is a joy to work with.",
  },
  {
    icon: Heart,
    title: "User-Centric Design",
    description:
      "Putting users first in every decision, creating experiences that feel natural and intuitive.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "Staying curious and embracing new technologies to deliver cutting-edge solutions.",
  },
  {
    icon: Target,
    title: "Attention to Detail",
    description:
      "Obsessing over the small things that make the difference between good and exceptional.",
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ValuesSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-thaloria text-gray-900 mb-4">
          What I Stand For
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          These are the principles that guide my work and define my approach to
          every project.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {values.map((value, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500"
          >
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
              <value.icon className="w-7 h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {value.title}
            </h3>
            <p className="text-gray-500 leading-relaxed">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
