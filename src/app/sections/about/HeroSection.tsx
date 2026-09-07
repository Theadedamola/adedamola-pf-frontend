import { motion } from "framer-motion";
import me1 from "@/assets/me1.jpg";
import me2 from "@/assets/me2.jpeg";
import { ScrambleText } from "@/components/common/ScrambleText";

export default function HeroSection() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto pt-28 md:pt-36 pb-16">

      {/* Main Title & Editorial Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-3xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-neutral-900 mb-5">
          <span className="font-heading">
            <ScrambleText text="about adedamola" className="inline-block" />
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed font-normal">
          design engineer bridging the gap between product intuition and systems code.
          focused on building calm, high-performance web applications that respect the user.
        </p>

        {/* Location & Status Tag */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>lagos, nigeria</span>
          </span>
          <span className="text-neutral-300 hidden sm:inline">•</span>
          <span className="text-neutral-500">available for select engineering & product roles</span>
        </div>
      </motion.div>

      {/* Dual Editorial Portraits: Horizontal scroll on smaller screens, 2-col grid on md+ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 sm:-mx-12 sm:px-12 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Portrait 1 */}
        <div className="group relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/80 p-2 sm:p-2.5 transition-all duration-500 hover:border-neutral-300 w-[78vw] sm:w-[55vw] shrink-0 snap-center md:w-auto">
          <div className="relative overflow-hidden rounded-xl aspect-[4/5] w-full bg-neutral-200">
            <img
              src={me1}
              alt="Adedamola"
              className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
            />
          </div>
        </div>

        {/* Portrait 2 */}
        <div className="group relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/80 p-2 sm:p-2.5 transition-all duration-500 hover:border-neutral-300 w-[78vw] sm:w-[55vw] shrink-0 snap-center md:w-auto">
          <div className="relative overflow-hidden rounded-xl aspect-[4/5] w-full bg-neutral-200">
            <img
              src={me2}
              alt="Adedamola"
              className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
