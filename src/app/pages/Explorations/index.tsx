import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import SEO from "@/components/common/SEO";
import ImageLightbox from "@/components/common/ImageLightbox";

// Import exploration images
import exploration1 from "@/assets/explorations/Dashboard-finance.png";
import exploration2 from "@/assets/explorations/Desktop - 1.png";
import exploration3 from "@/assets/explorations/Orders-page.png";
import exploration4 from "@/assets/explorations/Transfer-finance.png";
import exploration5 from "@/assets/explorations/boost-product-page.png";
import exploration6 from "@/assets/explorations/finance-dash.png";
import exploration7 from "@/assets/explorations/mobile-component.png";
import exploration8 from "@/assets/explorations/mobile-finance.png";
import exploration9 from "@/assets/explorations/onboarding-exploration.png";
import exploration10 from "@/assets/explorations/portfolio-hero.png";

const explorations = [
  {
    id: 1,
    src: exploration1,
    title: "Finance Dashboard",
    detail:
      "A study in minimalist financial data visualization, focusing on clarity and modern aesthetics.",
  },
  {
    id: 2,
    src: exploration2,
    title: "Desktop Experience",
    detail:
      "Conceptual desktop interface exploring depth, transparency, and glassmorphism.",
  },
  {
    id: 3,
    src: exploration3,
    title: "Orders Management",
    detail:
      "Streamlined order tracking system with emphasis on status clarity and batch actions.",
  },
  {
    id: 4,
    src: exploration4,
    title: "Transfer Interface",
    detail:
      "Clean, step-by-step money transfer flow designed to reduce user cognitive load.",
  },
  {
    id: 5,
    src: exploration5,
    title: "Product Page Boost",
    detail:
      "High-conversion product display layout with immersive imagery and clear CTAs.",
  },
  {
    id: 6,
    src: exploration6,
    title: "Financial Analytics",
    detail:
      "Complex data sets simplified into actionable insights through intuitive charting.",
  },
  {
    id: 7,
    src: exploration7,
    title: "Mobile Components",
    detail:
      "A library of reusable mobile UI patterns optimized for accessibility and touch targets.",
  },
  {
    id: 8,
    src: exploration8,
    title: "Mobile Finance",
    detail:
      "Banking on the go - a compact but powerful financial management app concept.",
  },
  {
    id: 9,
    src: exploration9,
    title: "Onboarding Flow",
    detail:
      "Engagement-focused onboarding experience using storytelling and micro-interactions.",
  },
  {
    id: 10,
    src: exploration10,
    title: "Portfolio Hero",
    detail:
      "Experimental hero section for a creative portfolio, playing with typography and scale.",
  },
];

export default function Explorations() {
  const [selectedItem, setSelectedItem] = useState<
    (typeof explorations)[0] | null
  >(null);

  // Lightbox state for the "fullscreen zoom" inside the modal
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden relative transition-colors duration-500">
      <SEO
        title="Explorations | Adedamola"
        description="A virtual exhibition of design experiments, visual studies, and creative explorations by Adedamola."
      />

      <ImageLightbox
        isOpen={lightboxOpen}
        imageSrc={selectedItem?.src || ""}
        imageAlt={selectedItem?.title || ""}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Header Info */}
      <div className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-8xl font-thaloria text-black tracking-tighter opacity-90">
            Explorations
          </h1>
          <p className="text-gray-400 font-mono text-xs md:text-sm mt-4 uppercase tracking-widest px-2 py-1 inline-block">
            Visual Studies • Concept Designs • Creative Experiments
          </p>
        </motion.div>
      </div>

      {/* Exhibition Wall */}
      <div className="w-full relative pb-32">
        {/* Gallery Texture */}
        <div
          className="fixed inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-16"
          >
            {explorations.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-xl overflow-hidden hover:border transition-all hover:shadow-2xl hover:border-gray-200 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-4 bg-black text-white rounded-full shadow-2xl">
                    <ZoomIn size={28} />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                  <span className="bg-black text-white px-4 py-2 rounded-full font-thaloria text-xl">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Detail View Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-2xl p-4 sm:p-8 md:p-12"
            onClick={() => setSelectedItem(null)}
          >
            <button
              className="absolute top-8 right-8 p-3 text-gray-400 hover:text-black transition-colors z-50"
              onClick={() => setSelectedItem(null)}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 h-full">
                {/* Image Area */}
                <div className="lg:col-span-8 p-4 sm:p-6 md:p-8 bg-gray-50 flex items-center justify-center border-r border-gray-100">
                  <div
                    className="w-full relative group cursor-zoom-in"
                    onClick={() => setLightboxOpen(true)}
                  >
                    <img
                      src={selectedItem.src}
                      alt={selectedItem.title}
                      className="w-full h-auto rounded-2xl shadow-lg ring-1 ring-black/5"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center rounded-2xl">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white p-4 rounded-full shadow-xl">
                        <ZoomIn size={24} className="text-black" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Area */}
                <div className="lg:col-span-4 p-8 sm:p-10 md:p-12 flex flex-col justify-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-4xl md:text-5xl font-thaloria text-black leading-tight mb-4">
                        {selectedItem.title}
                      </h2>
                      <div className="w-12 h-1.5 bg-black rounded-full" />
                    </div>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                      {selectedItem.detail}
                    </p>

                    <div className="space-y-4 pt-8 border-t border-gray-100 mt-8">
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-[0.2em]">
                        Context
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                          Visual Study
                        </span>
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                          UI/UX
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}
