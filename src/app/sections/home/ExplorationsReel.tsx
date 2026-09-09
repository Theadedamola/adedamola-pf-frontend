import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ScrambleText } from "@/components/common/ScrambleText";

// Coded Video Assets
import fluidIslandVideo from "@/assets/explorations/fluid-island.mp4";
import cardExplorationVideo from "@/assets/explorations/card-exploration.mp4";
import dockExplorationVideo from "@/assets/explorations/dock-exploration.mp4";

const REEL_ITEMS = [
  {
    id: "01",
    title: "morphing fluid island",
    video: fluidIslandVideo,
  },
  {
    id: "02",
    title: "3d holographic titanium card",
    video: cardExplorationVideo,
  },
  {
    id: "03",
    title: "magnetic fluid dock",
    video: dockExplorationVideo,
  },
];

export default function ExplorationsReel() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-neutral-200/70">
      {/* Header & Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-6"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-amber-600 uppercase font-medium">
              proof of craft &middot; design engineering
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.15] mb-3">
            tactile{" "}
            <span className="font-heading font-normal">
              <ScrambleText text="physics" className="inline-block" />
            </span>
            .
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            interfaces engineered to behave like physical matter. built directly in code with real spring mathematics, shaders, and spatial micro-haptics.
          </p>
        </div>

        {/* Right Header Link */}
        <div className="flex items-center gap-3 self-start lg:self-end">
          <Link
            to="/explorations"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-mono hover:bg-neutral-800 transition-all shadow-xs"
          >
            <span>view all explorations</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* 3 Full-Card Videos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {REEL_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
          >
            <Link
              to="/explorations"
              className="group block relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-200/80 shadow-sm hover:shadow-2xl hover:shadow-neutral-950/15 transition-all duration-500"
              title={item.title}
            >
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
