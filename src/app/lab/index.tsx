import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, Compass } from "lucide-react";

export interface ShotMeta {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  difficulty: "Top 1%" | "Hard" | "Advanced";
  path: string;
  icon: typeof Sparkles;
}

export const SHOTS_CATALOG: ShotMeta[] = [
  {
    id: "fluid-island",
    title: "Morphing Fluid Island",
    category: "Spatial UI & Spring Physics",
    description: "A tactile pill component that fluidly morphs between a music player, live waveform, incoming call, and progress states with SVG gooey physics.",
    tags: ["Framer Motion", "FLIP", "Spring Physics", "Audio Web API"],
    difficulty: "Top 1%",
    path: "/lab/fluid-island",
    icon: Sparkles,
  },
  {
    id: "holographic-titanium-card",
    title: "Interactive 3D Holographic Card",
    category: "3D & Shaders",
    description: "Hyper-realistic card with mouse-reactive specular sheen, dynamic gyroscopic tilt, iridescent holographic reflection, and interactive flip.",
    tags: ["3D Transforms", "Lighting Shaders", "Physics Spring"],
    difficulty: "Top 1%",
    path: "/lab/holographic-card",
    icon: Layers,
  },
  {
    id: "magnetic-spatial-dock",
    title: "Magnetic Fluid Dock",
    category: "Micro-Interactions",
    description: "Velocity-aware dock with magnetic cursor attraction, spring deformation on drag, and tactile sound synthesis on icon release.",
    tags: ["Spatial Math", "Velocity Vector", "Web Audio API"],
    difficulty: "Hard",
    path: "/lab/magnetic-dock",
    icon: Compass,
  },
  {
    id: "store-erp-sidebar",
    title: "Store ERP · Adaptive Spatial Sidebar",
    category: "Information Architecture & Tree SVG",
    description: "Multi-state commerce sidebar with multi-store switcher, squiggly/curved SVG tree connectors, instant icon-only flyout menus, and 3-mode theme engine.",
    tags: ["Multi-Store ERP", "SVG Squiggly Lines", "Tree Hierarchy", "Theme Engine"],
    difficulty: "Top 1%",
    path: "/lab/store-erp",
    icon: Layers,
  },
];

export default function LabIndex() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-24 sm:py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 max-w-3xl"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono tracking-widest text-amber-600 uppercase">
            coded proof of work · design engineering lab
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900 leading-[1.1] mb-4">
          the <span className="font-heading font-bold">code lab</span>.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
          exploring the outer frontiers of tactile web interfaces. no figma prototypes—every single shot here is built directly in code with real physics, spatial calculations, and production-grade performance.
        </p>
      </motion.div>

      {/* Grid of Experiments / Shots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOTS_CATALOG.map((shot, idx) => {
          const Icon = shot.icon;
          return (
            <motion.div
              key={shot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={shot.path}
                className="group flex flex-col justify-between h-full p-6 rounded-3xl bg-white border border-neutral-200/90 hover:border-neutral-400 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-50 border border-amber-200/70 text-amber-800">
                      {shot.difficulty}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    {shot.category}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-neutral-900 group-hover:text-neutral-950 mb-2.5 flex items-center justify-between">
                    <span>{shot.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                    {shot.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
                  {shot.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-neutral-100 font-mono text-[10px] text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
