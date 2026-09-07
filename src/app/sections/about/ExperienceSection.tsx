import { motion } from "framer-motion";
import ExperiencePill from "@/components/common/ExperiencePill";

interface ExperienceItem {
  company: string;
  iconBg: string;
  href?: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "zmarket",
    iconBg: "bg-blue-600",
    href: "https://zmarket.ng",
    role: "design engineer",
    period: "2025 — present",
    description:
      "overseeing design system tokens and building performant, accessible e-commerce interfaces. bridging the gap between product specifications and production react/next.js code.",
    tags: ["design systems", "next.js", "react", "e-commerce"],
  },
  {
    company: "reycasa",
    iconBg: "bg-indigo-600",
    role: "design engineer",
    period: "2024 — present",
    description:
      "architecting modern web application interfaces with a focus on interaction design, strict type contracts, and fluid responsive behaviors.",
    tags: ["frontend architecture", "typescript", "ui/ux", "web apps"],
  },
  {
    company: "nagida foods",
    iconBg: "bg-emerald-600",
    href: "https://nagidafoods.com",
    role: "product designer",
    period: "2024 — 2025",
    description:
      "spearheaded end-to-end digital ecosystem design across customer-facing food ordering mobile applications, warehouse inventory dashboards, finance management tools, and real-time delivery tracking.",
    tags: ["mobile app", "inventory system", "admin portals", "end-to-end design"],
  },
  {
    company: "freelance / studio",
    iconBg: "bg-neutral-600",
    role: "design engineer & consultant",
    period: "2020 — 2023",
    description:
      "collaborated directly with early-stage founders and creative teams to prototype, design, and ship web applications, brand identities, and high-conversion marketing pages.",
    tags: ["prototyping", "web development", "design systems", "mvp"],
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 max-w-3xl"
      >

        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-900 mb-3 leading-[1.2]">
          work & <span className="font-heading">roles</span>.
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 font-normal">
          a chronological index of startups, products, and multidisciplinary teams i've contributed to.
        </p>
      </motion.div>

      {/* Editorial Timeline (No Cards or Drop Shadows) */}
      <div className="divide-y divide-neutral-200/80 border-t border-b border-neutral-200/80">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="py-8 sm:py-10 group"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <ExperiencePill
                  name={exp.company}
                  iconBg={exp.iconBg}
                  href={exp.href}
                  className="mx-0"
                />
                <span className="text-neutral-300 hidden sm:inline">/</span>
                <span className="text-base sm:text-lg font-medium text-neutral-900 lowercase">
                  {exp.role}
                </span>
              </div>

              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {exp.period}
              </span>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl mt-3">
              {exp.description}
            </p>

            {/* Micro Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-neutral-500 bg-neutral-100/80 px-2 py-0.5 rounded-full border border-neutral-200/60 lowercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
