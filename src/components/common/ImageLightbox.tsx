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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Close fullscreen view"
          >
            <X size={24} />
          </button>

          {/* Image */}
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            src={imageSrc}
            alt={imageAlt}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Hint text */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Press <kbd className="px-2 py-1 bg-white/10 rounded mx-1">Esc</kbd>{" "}
            or click outside to close
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
          <ZoomIn size={24} className="text-gray-800" />
        </div>
      </div>
    </div>
  );
}
