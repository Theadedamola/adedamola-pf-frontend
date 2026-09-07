import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";
import spanishAudio from "@/assets/spanish introduction.mp3";

export default function SpanishIntroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 14);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // 24 waveform bar heights
  const barHeights = [
    24, 40, 65, 30, 85, 50, 70, 95, 45, 60, 80, 100, 75, 90, 55, 35, 80, 60,
    45, 70, 90, 40, 55, 30,
  ];

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >

        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-900 mb-3 leading-[1.2]">
          ¡hola! <span className="font-heading">un pequeño saludo</span>.
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mb-8 max-w-xl font-normal">
          when i'm not crafting interfaces, i enjoy learning languages. here's a short, candid voice note in spanish.
        </p>

        {/* Tactile Audio Capsule */}
        <div className="relative overflow-hidden rounded-2xl bg-neutral-950 text-neutral-100 p-5 sm:p-7 border border-neutral-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6">
            {/* Play/Pause Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause voice note" : "Play voice note"}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-all duration-200 active:scale-95 shrink-0 shadow-md cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
                    voice memo · es
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
                <div className="text-sm font-medium text-white tracking-tight mt-0.5">
                  spanish_introduction.mp3
                </div>
              </div>
            </div>

            {/* Time Stamp */}
            <div className="text-xs font-mono text-neutral-400 flex items-center gap-2 self-start sm:self-center">
              <Volume2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>
                {formatTime(currentTime)} / {formatTime(duration || 14)}
              </span>
            </div>
          </div>

          {/* Animated Waveform Visualizer */}
          <div
            onClick={(e) => {
              if (audioRef.current && duration > 0) {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = Math.max(0, Math.min(1, clickX / rect.width));
                audioRef.current.currentTime = pct * duration;
              }
            }}
            className="flex items-end justify-between gap-1 sm:gap-1.5 h-12 sm:h-14 py-1 cursor-pointer select-none"
            title="Click to seek"
          >
            {barHeights.map((h, i) => {
              const barPct = (i / barHeights.length) * 100;
              const isPast = barPct <= progress;

              return (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying
                      ? [
                          `${Math.max(20, h * 0.4)}%`,
                          `${Math.min(100, h * 1.15)}%`,
                          `${Math.max(15, h * 0.6)}%`,
                        ]
                      : `${h}%`,
                  }}
                  transition={{
                    duration: 0.6 + (i % 5) * 0.1,
                    repeat: isPlaying ? Infinity : 0,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: (i % 4) * 0.08,
                  }}
                  className={`w-full rounded-full transition-colors duration-150 ${
                    isPast
                      ? "bg-amber-400"
                      : "bg-neutral-800 hover:bg-neutral-700"
                  }`}
                  style={{ minHeight: "4px" }}
                />
              );
            })}
          </div>

          {/* Transcript / Translation Quote */}
          <div className="mt-5 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-neutral-400">
            <span className="italic text-neutral-300">
              "¡hola! me llamo adedamola — un placer conocerte..."
            </span>
            <span className="text-[11px] text-neutral-500">
              tap to listen
            </span>
          </div>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={spanishAudio}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      </motion.div>
    </section>
  );
}
