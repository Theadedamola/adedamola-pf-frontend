import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ScrambleText } from "@/components/common/ScrambleText";

// Coded Video Assets
import addShopExplorationVideo from "@/assets/explorations/add-shop-exploration.mp4";
import sidebarExplorationVideo from "@/assets/explorations/sidebar-exploration.mp4";
import dockExplorationVideo from "@/assets/explorations/dock-exploration.mp4";
import cardExplorationVideo from "@/assets/explorations/card-exploration.mp4";
import fluidIslandVideo from "@/assets/explorations/fluid-island.mp4";

const REEL_ITEMS = [
  {
    id: "01",
    title: "store provisioning & setup flow",
    video: addShopExplorationVideo,
  },
  {
    id: "02",
    title: "adaptive spatial erp sidebar",
    video: sidebarExplorationVideo,
  },
  {
    id: "03",
    title: "magnetic fluid dock",
    video: dockExplorationVideo,
  },
  {
    id: "04",
    title: "3d holographic titanium card",
    video: cardExplorationVideo,
  },
  {
    id: "05",
    title: "morphing fluid island",
    video: fluidIslandVideo,
  },
];

export default function ExplorationsReel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.firstElementChild as HTMLElement | null;
      const scrollAmount = firstCard ? firstCard.clientWidth + 32 : 520;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-neutral-200/70 overflow-hidden">
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

        {/* Right Header Controls */}
        <div className="flex items-center gap-3 self-start lg:self-end">
          {/* Scroll Nav Buttons */}
          <div className="flex items-center gap-2 mr-1">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="p-2.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-neutral-800 shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="p-2.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-neutral-800 shadow-2xs cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/explorations"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-mono hover:bg-neutral-800 transition-all shadow-xs"
          >
            <span>view all explorations</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Horizontal Scroll Full-Card Video Reel */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -my-4 px-6 md:px-12 -mx-6 md:-mx-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {REEL_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="w-[84vw] sm:w-[440px] md:w-[500px] lg:w-[540px] shrink-0 snap-start"
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
