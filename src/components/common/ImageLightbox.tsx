import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useEffect } from "react";

interface ImageLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export default function ImageLightbox({
  isOpen,
  imageSrc,
  imageAlt,
  onClose,
}: ImageLightboxProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer z-10"
            aria-label="Close fullscreen view"
          >
            <X size={22} />
          </button>

          {/* Image Container with stop propagation */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-[92vw] max-h-[88vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {imageSrc.endsWith('.mp4') || imageSrc.includes('.mp4') || imageSrc.includes('video') ? (
              <video
                src={imageSrc}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/10 cursor-default"
              />
            ) : (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/10 cursor-default"
              />
            )}
            {imageAlt && (
              <p className="mt-3 text-xs font-mono text-white/60 tracking-wider uppercase text-center">
                {imageAlt}
              </p>
            )}
          </motion.div>

          {/* Hint text */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono select-none pointer-events-none hidden sm:block">
            esc or click outside to dismiss
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Clickable image wrapper component
interface ClickableImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick: () => void;
}

export function ClickableImage({
  src,
  alt,
  className,
  onClick,
}: ClickableImageProps) {
  return (
    <div className="relative group cursor-zoom-in" onClick={onClick}>
      <img src={src} alt={alt} className={className} />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 bg-white/90 rounded-full shadow-lg">
          <ZoomIn size={22} className="text-gray-900" />
        </div>
      </div>
    </div>
  );
}
