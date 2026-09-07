import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// Import skill icons
import skill1 from "@/assets/skillicon/skillicon1.png"; // Figma
import skill2 from "@/assets/skillicon/skillicon2.png"; // React
import skill3 from "@/assets/skillicon/skillicon3.png"; // TypeScript
import skill4 from "@/assets/skillicon/skillicon4.png"; // Node.js
import skill5 from "@/assets/skillicon/skillicon5.png"; // Tailwind
import skill6 from "@/assets/skillicon/skillicon6.png"; // Motion
import skill7 from "@/assets/skillicon/skillicon7.png"; // Next.js
import skill8 from "@/assets/skillicon/skillicon8.png"; // Git
import skill9 from "@/assets/skillicon/skillicon9.png"; // Design

type Token = string | { type: "tool"; name: string; icon: string };

const PARAGRAPHS: { tokens: Token[]; range: [number, number] }[] = [
  {
    range: [0.0, 0.18],
    tokens: [
      "every",
      "product",
      "begins",
      "at",
      "the",
      "delicate",
      "intersection",
      "between",
      "human",
      "intuition",
      "and",
      "systematic",
      "thinking.",
    ],
  },
  {
    range: [0.18, 0.42],
    tokens: [
      "in",
      { type: "tool", name: "figma", icon: skill1 },
      "and",
      { type: "tool", name: "design systems", icon: skill9 },
      ",",
      "i",
      "explore",
      "layout",
      "hierarchies,",
      "atomic",
      "design",
      "tokens,",
      "and",
      "user",
      "journeys",
      "—",
      "shaping",
      "clarity,",
      "contrast,",
      "and",
      "accessibility",
      "before",
      "writing",
      "a",
      "single",
      "line",
      "of",
      "code.",
    ],
  },
  {
    range: [0.42, 0.65],
    tokens: [
      "that",
      "blueprint",
      "is",
      "translated",
      "into",
      "resilient",
      "frontend",
      "architecture",
      "using",
      { type: "tool", name: "react", icon: skill2 },
      ",",
      { type: "tool", name: "next.js", icon: skill7 },
      ",",
      "and",
      { type: "tool", name: "typescript", icon: skill3 },
      ".",
      "by",
      "enforcing",
      "strict",
      "type",
      "contracts",
      "and",
      "modular",
      "component",
      "boundaries,",
      "complex",
      "interfaces",
      "remain",
      "lightning-fast,",
      "scalable,",
      "and",
      "effortless",
      "to",
      "maintain.",
    ],
  },
  {
    range: [0.65, 0.85],
    tokens: [
      "to",
      "turn",
      "static",
      "screens",
      "into",
      "living,",
      "tactile",
      "software,",
      "i",
      "craft",
      "interaction",
      "physics",
      "with",
      { type: "tool", name: "tailwind css", icon: skill5 },
      "and",
      { type: "tool", name: "framer motion", icon: skill6 },
      "—",
      "choreographing",
      "fluid",
      "micro-interactions,",
      "responsive",
      "states,",
      "and",
      "spring-driven",
      "gestures",
      "that",
      "make",
      "software",
      "feel",
      "like",
      "second",
      "nature.",
    ],
  },
  {
    range: [0.85, 1.0],
    tokens: [
      "finally,",
      "the",
      "full",
      "product",
      "is",
      "grounded",
      "with",
      "performant",
      "backend",
      "logic",
      "in",
      { type: "tool", name: "node.js", icon: skill4 },
      "and",
      "disciplined",
      "version",
      "control",
      "in",
      { type: "tool", name: "git", icon: skill8 },
      "—",
      "turning",
      "creative",
      "vision",
      "into",
      "reliable",
      "software",
      "that",
      "thrives",
      "in",
      "production.",
    ],
  },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });

  return (
    <section
      ref={containerRef}
      className="w-full bg-black text-white py-28 md:py-44 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Cinematic Star-Field Background Atmosphere */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(120,119,198,0.12),rgba(0,0,0,0))] pointer-events-none" />
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top & Bottom Cinematic Fade Vignettes */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4">
            Capabilities
          </h2>

          <p className="text-neutral-500 text-xs sm:text-sm font-mono max-w-md mx-auto">
            scroll to reveal how idea evolves into software
          </p>
        </div>

        {/* Scroll-Illuminated Story Flow */}
        <div className="space-y-8 sm:space-y-12 text-lg sm:text-2xl md:text-3xl font-normal leading-[1.7] md:leading-[1.75] tracking-tight">
          {PARAGRAPHS.map((paragraph, pIdx) => {
            const tokenCount = paragraph.tokens.length;
            const [pStart, pEnd] = paragraph.range;
            const step = (pEnd - pStart) / tokenCount;

            return (
              <p key={pIdx} className="flex flex-wrap items-baseline">
                {paragraph.tokens.map((token, tIdx) => {
                  const tokenStart = pStart + tIdx * step;
                  const tokenEnd = pStart + (tIdx + 1) * step;

                  if (typeof token === "string") {
                    return (
                      <ScrollWord
                        key={tIdx}
                        progress={scrollYProgress}
                        range={[tokenStart, tokenEnd]}
                      >
                        {token}
                      </ScrollWord>
                    );
                  }

                  return (
                    <ScrollToolPill
                      key={tIdx}
                      progress={scrollYProgress}
                      range={[tokenStart, tokenEnd]}
                      icon={token.icon}
                      name={token.name}
                    />
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Word that starts dimmed into the dark background, then lights up with pure white color as the user scrolls
function ScrollWord({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, [
    "rgba(255, 255, 255, 0.15)",
    "rgba(255, 255, 255, 1)",
  ]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] transition-colors select-none"
    >
      {children}
    </motion.span>
  );
}

// Tool Pill that starts dim and grayscale, then illuminates into full vibrant color and white text
function ScrollToolPill({
  progress,
  range,
  icon,
  name,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  icon: string;
  name: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const scale = useTransform(progress, range, [0.94, 1]);
  const grayscale = useTransform(progress, range, [1, 0]);
  const borderColor = useTransform(progress, range, [
    "rgba(38, 38, 38, 0.3)",
    "rgba(64, 64, 64, 0.9)",
  ]);

  return (
    <motion.span
      style={{ opacity, scale, borderColor }}
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mx-1 rounded-full bg-neutral-900/90 border text-neutral-200 font-medium text-[0.72em] align-baseline -translate-y-[2px] transition-all select-none shadow-xs"
    >
      <motion.img
        src={icon}
        alt={name}
        style={{ filter: useTransform(grayscale, (v) => `grayscale(${v * 100}%)`) }}
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain shrink-0"
      />
      <span className="text-neutral-200 leading-none whitespace-nowrap font-mono text-xs sm:text-sm">
        {name}
      </span>
    </motion.span>
  );
}
