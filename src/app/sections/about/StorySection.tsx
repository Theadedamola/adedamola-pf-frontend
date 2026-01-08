import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl"
      >
        <h2 className="text-3xl md:text-4xl font-thaloria text-gray-900 mb-8">
          My Journey
        </h2>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            I'm <strong className="text-gray-900">Adedamola</strong> — a
            frontend developer with a passion for creating beautiful, functional
            digital experiences. My journey into tech began with a fascination
            for how things work and a desire to build solutions that make a real
            difference in people's lives.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Over the years, I've had the privilege of working with startups and
            established businesses, helping them bring their visions to life
            through code. From crafting intuitive user interfaces to
            architecting scalable frontend solutions, I approach every project
            with the same level of dedication and attention to detail.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            When I'm not coding, you'll find me exploring new technologies,
            contributing to open source projects, or mentoring aspiring
            developers. I believe in the power of continuous learning and
            sharing knowledge with the community.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
