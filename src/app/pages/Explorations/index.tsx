import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, Sparkles } from "lucide-react";
import SEO from "@/components/common/SEO";
import ImageLightbox from "@/components/common/ImageLightbox";
import { ScrambleText } from "@/components/common/ScrambleText";
import { Button } from "@/components/common/Button";

// Import Video & Exploration Assets
import fluidIslandVideo from "@/assets/explorations/fluid-island.mp4";
import cardExplorationVideo from "@/assets/explorations/card-exploration.mp4";
import dockExplorationVideo from "@/assets/explorations/dock-exploration.mp4";
import sidebarExplorationVideo from "@/assets/explorations/sidebar-exploration.mp4";
import exploration1 from "@/assets/explorations/Dashboard-finance.png";
import exploration3 from "@/assets/explorations/Orders-page.png";
import exploration4 from "@/assets/explorations/Transfer-finance.png";
import exploration7 from "@/assets/explorations/mobile-component.png";
import exploration9 from "@/assets/explorations/onboarding-exploration.png";

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  detail: string;
  src: string;
  isVideo?: boolean;
  isCoded?: boolean;
  tags?: string[];
}

const EXPLORATIONS: ExplorationItem[] = [
  {
    id: "01",
    title: "morphing fluid island",
    category: "spatial ui & spring physics",
    detail:
      "a tactile pill component that fluidly morphs between a music player, live waveform, incoming call, timer, and biometric payment states with zero-jump layout transitions and svg gooey physics.",
    src: fluidIslandVideo,
    isVideo: true,
    isCoded: true,
    tags: ["framer motion", "spring physics", "morphing ui", "audio web api"],
  },
  {
    id: "02",
    title: "3d holographic titanium card",
    category: "3d shaders & specular physics",
    detail:
      "hyper-realistic card interface with mouse-reactive specular sheen, dynamic gyroscopic tilt, iridescent holographic reflection, and interactive 3d flip with security cvc reveal.",
    src: cardExplorationVideo,
    isVideo: true,
    isCoded: true,
    tags: ["3d transforms", "lighting shaders", "gyro tilt", "physics"],
  },
  {
    id: "03",
    title: "magnetic fluid dock",
    category: "spatial math & audio haptics",
    detail:
      "velocity-aware dock with cosine-based magnetic cursor attraction, spring-loaded launch physics, and zero-dependency browser-native web audio mechanical sound synthesis.",
    src: dockExplorationVideo,
    isVideo: true,
    isCoded: true,
    tags: ["spatial math", "velocity vector", "web audio api", "micro-interaction"],
  },
  {
    id: "04",
    title: "adaptive spatial erp sidebar",
    category: "information architecture & tree svg",
    detail:
      "a multi-state commerce sidebar for multi-store retail operations featuring squiggly svg tree connectors, instant icon-only collapse, multi-store switcher, and 100% synchronized theme engine.",
    src: sidebarExplorationVideo,
    isVideo: true,
    isCoded: true,
    tags: ["multi-store erp", "svg squiggly lines", "tree hierarchy", "theme engine"],
  },
  {
    id: "05",
    src: exploration1,
    title: "finance dashboard",
    category: "systems & data",
    detail:
      "a study in minimalist financial data visualization, emphasizing legible hierarchy, custom charting, and dense information layout.",
    tags: ["fintech", "data visualization", "systems"],
  },
  {
    id: "06",
    src: exploration3,
    title: "orders management",
    category: "e-commerce operations",
    detail:
      "streamlined bulk fulfillment interface focusing on live status telemetry, rapid batch workflows, and keyboard accessibility.",
    tags: ["e-commerce", "b2b", "workflow"],
  },
  {
    id: "07",
    src: exploration4,
    title: "transfer interface",
    category: "fintech interaction",
    detail:
      "clean, multi-step money transfer flow designed to eliminate cognitive friction and provide instantaneous confirmation feedback.",
    tags: ["fintech", "micro-interaction", "stepper"],
  },
  {
    id: "08",
    src: exploration7,
    title: "mobile design tokens",
    category: "design system",
    detail:
      "a modular library of touch-first mobile component primitives calibrated for accessibility, thumb ergonomics, and haptic rhythm.",
    tags: ["mobile", "design tokens", "component library"],
  },
  {
    id: "09",
    src: exploration9,
    title: "onboarding sequence",
    category: "product activation",
    detail:
      "engagement-focused customer onboarding flow leveraging progressive disclosure and micro-interactions to guide user setup.",
    tags: ["growth", "activation", "onboarding"],
  },
];

export default function Explorations() {
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);

  // Fullscreen Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 transition-colors duration-500">
      <SEO
        title="Explorations | Adedamola"
        description="A curation of visual studies, coded prototypes, and design engineering experiments by Adedamola."
      />

      {/* Header Info */}
      <div className="pt-28 md:pt-36 pb-12 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono tracking-widest text-amber-600 uppercase">
              archive &middot; design engineering
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-neutral-900 mb-4">
            <span className="font-heading">
              <ScrambleText text="explorations" className="inline-block" />
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            an archive of coded prototypes, tactile physics, and visual experiments developed in the margins of production work.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-700">
              {EXPLORATIONS.length} studies archived
            </span>
          </div>
        </motion.div>
      </div>

      {/* Exhibition Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {EXPLORATIONS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group relative rounded-2xl border border-neutral-200/80 hover:border-neutral-400/90 bg-white p-2.5 sm:p-3 transition-all duration-500 cursor-pointer shadow-xs hover:shadow-md"
              onClick={() => setSelectedItem(item)}
            >
              {/* Media Frame */}
              <div className="relative overflow-hidden rounded-xl aspect-square w-full bg-neutral-100 flex items-center justify-center">
                {item.isVideo ? (
                  <>
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-950/80 backdrop-blur-md text-white text-[10px] font-mono border border-white/10 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>coded lab</span>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-white/95 text-neutral-900 rounded-full shadow-lg">
                    {item.isVideo ? <Sparkles size={18} /> : <ZoomIn size={18} />}
                  </div>
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="mt-3 px-1.5 pb-1 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-neutral-400">/{item.id}</span>
                  <span className="text-neutral-800 font-medium lowercase truncate">
                    {item.title}
                  </span>
                </div>
                <span className="text-neutral-400 group-hover:text-black transition-colors shrink-0 ml-2">
                  inspect ↗
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/75 backdrop-blur-md p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedItem(null)}
          >
            {/* Dismiss Button */}
            <button
              className="absolute top-5 right-5 sm:top-8 sm:right-8 p-3 text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer z-50"
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-neutral-200/90 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Canvas Area */}
                <div className="lg:col-span-7 p-5 sm:p-8 bg-neutral-50 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-200/80">
                  {selectedItem.isVideo ? (
                    <div className="w-full flex flex-col items-center">
                      <div
                        className="w-full relative group cursor-zoom-in rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-950 shadow-xs"
                        onClick={() => setLightboxOpen(true)}
                      >
                        <video
                          src={selectedItem.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          className="w-full h-auto max-h-[65vh] object-contain mx-auto"
                        />
                      </div>
                      <div className="mt-3 text-[11px] font-mono text-neutral-400 text-center">
                        60fps coded prototype &middot; click to expand fullscreen
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-center">
                      <div
                        className="w-full relative group cursor-zoom-in rounded-2xl overflow-hidden border border-neutral-200/80 bg-white shadow-xs"
                        onClick={() => setLightboxOpen(true)}
                      >
                        <img
                          src={selectedItem.src}
                          alt={selectedItem.title}
                          className="w-full h-auto max-h-[65vh] object-contain mx-auto"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-mono text-neutral-800">
                            <ZoomIn size={14} />
                            <span>expand fullscreen</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-[11px] font-mono text-neutral-400 text-center">
                        click image to view high-res fullscreen
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Editorial Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                        <span>study /{selectedItem.id}</span>
                        <span>•</span>
                        <span className="text-neutral-600 lowercase">{selectedItem.category}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 lowercase leading-tight">
                        {selectedItem.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {selectedItem.detail}
                    </p>

                    <div className="pt-6 border-t border-neutral-100 space-y-3">
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                        classification & tech
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.isCoded && (
                          <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-xs font-mono lowercase flex items-center gap-1 font-semibold">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>coded proof of work</span>
                          </span>
                        )}
                        {(selectedItem.tags || ["visual study", "ui architecture", "exploration"]).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-neutral-100 border border-neutral-200/60 rounded-full text-xs font-mono text-neutral-700 lowercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-8 mt-6 border-t border-neutral-100 flex flex-wrap items-center gap-3">
                    {selectedItem.src && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setLightboxOpen(true)}
                        className="rounded-full px-5 py-2.5 text-xs font-mono flex items-center gap-2"
                      >
                        <span>fullscreen view</span>
                        <ZoomIn size={14} />
                      </Button>
                    )}

                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-5 py-2.5 rounded-full border border-neutral-200 text-xs font-mono text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors cursor-pointer"
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox placed AFTER modal with top-level z-[9999] */}
      <ImageLightbox
        isOpen={lightboxOpen}
        imageSrc={selectedItem?.src || ""}
        imageAlt={selectedItem?.title || ""}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
