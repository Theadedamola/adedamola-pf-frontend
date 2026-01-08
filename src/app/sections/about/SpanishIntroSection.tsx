import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import spanishAudio from "@/assets/spanish introduction.mp3";

export default function SpanishIntroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-thaloria text-gray-900 mb-3">
            ¡Hola! 🇪🇸
          </h2>
          <p className="text-gray-600 text-lg">
            Fun fact: I can introduce myself in Spanish! Press play to hear it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center"
        >
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={togglePlay}
          >
            {/* Main Play Button */}
            <motion.div
              animate={{
                scale: isPlaying ? [1, 1.05, 1] : 1,
                boxShadow: isPlaying
                  ? [
                      "0 0 0 0 rgba(251, 146, 60, 0.4)",
                      "0 0 0 20px rgba(251, 146, 60, 0)",
                      "0 0 0 0 rgba(251, 146, 60, 0)",
                    ]
                  : "0 0 0 0 rgba(251, 146, 60, 0)",
              }}
              transition={{
                duration: 1.5,
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-orange-300/50 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isHovered && !isPlaying ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12 md:w-16 md:h-16 text-white" />
                ) : (
                  <Play className="w-12 h-12 md:w-16 md:h-16 text-white ml-2" />
                )}
              </motion.div>
            </motion.div>

            {/* Sound Wave Animation */}
            {isPlaying && (
              <div className="absolute -inset-8 flex items-center justify-center pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeOut",
                    }}
                    className="absolute w-32 h-32 md:w-40 md:h-40 border-2 border-orange-400 rounded-full"
                  />
                ))}
              </div>
            )}

            {/* Floating Emojis */}
            {isPlaying && (
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {["🎵", "🎶", "🇪🇸", "💃", "🌮"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 0, x: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: -100 - Math.random() * 50,
                      x: (Math.random() - 0.5) * 150,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut",
                    }}
                    className="absolute text-2xl md:text-3xl"
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 30}%`,
                      top: "50%",
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Audio Element */}
        <audio ref={audioRef} src={spanishAudio} onEnded={handleEnded} />

        {/* Fun Caption */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <Volume2 className="w-4 h-4" />
            <span>
              {isPlaying
                ? "Playing my Spanish intro..."
                : "Click to hear my Spanish introduction"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
