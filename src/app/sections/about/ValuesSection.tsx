import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    number: "01",
    title: "systems over decoration",
    description:
      "visual polish is meaningless without architectural integrity. i build with modular design tokens, systematic rhythm, and strict state models so interfaces scale reliably without breaking.",
  },
  {
    number: "02",
    title: "60fps & zero bloat",
    description:
      "performance is an essential design material. zero heavy dependencies, featherweight bundles, and gpu-accelerated motion that responds instantaneously to every touch and keystroke.",
  },
  {
    number: "03",
    title: "human-scale intuition",
    description:
      "software should demystify complexity, not compound it. whether architecting multi-tenant admin dashboards or consumer checkouts, interactions must feel calm, direct, and obvious.",
  },
  {
    number: "04",
    title: "craft in the invisible margins",
    description:
      "the distinction between adequate and exceptional lives in the quiet details: hairline dividers, accessible contrast ratios, tactile micro-feedbacks, and resilient edge cases.",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column: Heading & Chapter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-900 mb-4 leading-[1.2]">
            how i approach <span className="font-heading">product & craft</span>.
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md font-normal">
            four foundational tenets that guide every design decision, component boundary,
            and line of production code i write.
          </p>
        </motion.div>

        {/* Right Column: Editorial Principles List (No SaaS Cards) */}
        <div className="lg:col-span-7 divide-y divide-neutral-200/80 border-t border-b border-neutral-200/80">
          {PRINCIPLES.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="py-6 sm:py-8 group"
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className="text-base sm:text-lg font-medium text-neutral-900 lowercase group-hover:text-black transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-neutral-400 group-hover:text-neutral-600 transition-colors">
                  /{item.number}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal max-w-xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
