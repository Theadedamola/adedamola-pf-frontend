import { motion } from "framer-motion";
import ExperiencePill from "@/components/common/ExperiencePill";

export default function StorySection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >

        {/* Section Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-900 mb-8 leading-[1.2]">
          building at the seam where <span className="font-heading">design</span> meets <span className="font-mono text-neutral-600">code</span>.
        </h2>

        {/* Narrative Flow */}
        <div className="space-y-6 text-sm sm:text-base md:text-lg text-neutral-700 font-normal leading-relaxed">
          <p>
            i've never viewed design and engineering as separate disciplines. to me, design is how
            software feels, behaves, and communicates — while engineering is the rigor that makes it durable,
            accessible, and fast.
          </p>

          <p>
            my journey started with a fascination for typography, layout hierarchies, and the mechanics of the browser.
            over the years, that curiosity grew into building high-stakes production systems. currently, as a design engineer at{" "}
            <ExperiencePill
              name="zmarket"
              iconBg="bg-blue-600"
              href="https://zmarket.ng"
            />
            , i maintain design system foundations and collaborate tightly with engineering teams to ship
            intuitive e-commerce experiences.
          </p>

          <p>
            previously, i contributed to scalable digital infrastructure at{" "}
            <ExperiencePill
              name="reycasa"
              iconBg="bg-indigo-600"
            />
            , and spearheaded end-to-end product design for{" "}
            <ExperiencePill
              name="nagida foods"
              iconBg="bg-emerald-600"
              href="https://nagidafoods.com"
            />
            , crafting entire multi-sided platforms encompassing food delivery apps, administrative inventory tools,
            and real-time logistics tracking.
          </p>

          <p>
            beyond shipping code, i obsess over the small things: smooth keyboard navigation, hairline layout boundaries,
            performant 60fps micro-animations, and minimal bundle sizes. software should be delightful to use and a pleasure
            to maintain.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
