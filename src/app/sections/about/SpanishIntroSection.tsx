import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Sparkles, Languages } from "lucide-react";
import spanishAudio from "@/assets/spanish introduction.mp3";

interface SubtitleSegment {
  start: number;
  end: number;
  es: string;
  en: string;
}

const SUBTITLE_SEGMENTS: SubtitleSegment[] = [
  {
    start: 0,
    end: 5.5,
    es: "Hola, mis amigos, bienvenidos a mi portafolio, este es me presentando,",
    en: "Hello, my friends, welcome to my portfolio, this is me introducing myself,",
  },
  {
    start: 5.5,
    end: 12.5,
    es: "me llamo Adedamola, un ingeniero de diseño, soy de Nigeria,",
    en: "my name is Adedamola, a design engineer, I'm from Nigeria,",
  },
  {
    start: 12.5,
    end: 21.0,
    es: "aprendiendo de español porque me gusta la cultura, la lengua y quiero aprender nuevas cosas,",
    en: "learning Spanish because I like the culture, the language, and I want to learn new things,",
  },
  {
    start: 21.0,
    end: 27.5,
    es: "todavía estoy un principiante y esperando ser mejor.",
    en: "I'm still a beginner and hoping to get better.",
  },
  {
    start: 27.5,
    end: 36.0,
    es: "Yo tengo tres años de experiencia en diseño, me encanta diseñar y construir cosas,",
    en: "I have three years of experience in design, I love designing and building things,",
  },
  {
    start: 36.0,
    end: 42.0,
    es: "también me encanta los deportes especialmente fútbol.",
    en: "I also love sports especially football.",
  },
  {
    start: 42.0,
    end: 47.0,
    es: "Estoy listo para trabajar y esperando saber para ti.",
    en: "I'm ready to work and looking forward to hearing from you.",
  },
  {
    start: 47.0,
    end: 51.5,
    es: "Gracias por escuchar. Adiós!",
    en: "Thanks for listening. Goodbye!",
  },
];

export default function SpanishIntroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(51.5);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Audio playback error:", err));
    }
  };

  const restartAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error(err));
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    audioRef.current.currentTime = pct * duration;
    setCurrentTime(pct * duration);
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Find the active segment matching current playback time
  const activeSegmentIndex = SUBTITLE_SEGMENTS.findIndex(
    (seg) => currentTime >= seg.start && currentTime < seg.end
  );

  const currentSegment =
    activeSegmentIndex !== -1
      ? SUBTITLE_SEGMENTS[activeSegmentIndex]
      : currentTime >= 51.5
      ? SUBTITLE_SEGMENTS[SUBTITLE_SEGMENTS.length - 1]
      : SUBTITLE_SEGMENTS[0];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-200/60 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono tracking-widest text-amber-600 uppercase">
            analog audio dispatch
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-900 mb-3 leading-[1.2]">
          ¡hola! <span className="font-heading font-bold">un pequeño saludo</span>.
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mb-8 max-w-xl font-normal">
          when i'm not building software, i enjoy exploring languages. pop this tape in for a short, candid voice note in spanish.
        </p>

        {/* ========================================================================= */}
        {/* RETRO CASSETTE TAPE PLAYER */}
        {/* ========================================================================= */}
        <div className="relative mx-auto max-w-xl">
          {/* Subtle vintage tape deck frame */}
          <div className="relative rounded-2xl bg-neutral-950 p-4 sm:p-6 border-2 border-neutral-800 shadow-2xl overflow-hidden select-none">
            {/* Top Tape Screws & Branding */}
            <div className="flex items-center justify-between text-neutral-500 text-[10px] font-mono uppercase tracking-wider mb-3 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full border border-neutral-700 flex items-center justify-center text-[7px] text-neutral-400">
                  +
                </span>
                <span>TYPE I · NORMAL BIAS</span>
              </div>
              <span className="text-neutral-400 font-bold tracking-widest">
                ADEDAMOLA ACOUSTICS
              </span>
              <div className="flex items-center gap-1.5">
                <span>STEREO</span>
                <span className="w-2 h-2 rounded-full border border-neutral-700 flex items-center justify-center text-[7px] text-neutral-400">
                  +
                </span>
              </div>
            </div>

            {/* Vintage Paper Label on the Cassette */}
            <div className="relative rounded-xl bg-gradient-to-b from-[#FAF8F2] to-[#F2EDE2] text-neutral-900 p-4 sm:p-5 border border-amber-200/80 shadow-inner">
              {/* Retro Color Stripes (Red & Orange) */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-red-500/80">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-1.5 py-0.5 rounded-xs bg-red-600 text-white font-mono font-bold text-[10px]">
                    SIDE A
                  </span>
                  <span className="font-mono text-xs text-neutral-600 font-semibold">
                    NR [B]
                  </span>
                </div>
                {/* Mechanical Counter */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-neutral-900 text-amber-400 font-mono text-[11px] tracking-widest shadow-xs">
                  <span className="text-[9px] text-neutral-400">TAPE</span>
                  <span className="font-bold">{formatTime(currentTime)}</span>
                </div>
              </div>

              {/* Handwritten Title on Label */}
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <h3 className="font-handwriting text-2xl sm:text-3xl text-neutral-900 leading-none">
                    mi pequeña introducción en español
                  </h3>
                  <p className="font-mono text-[10px] text-neutral-500 mt-1 uppercase tracking-wider">
                    lagos, nigeria · recorded voice memo
                  </p>
                </div>
                <div className="text-right font-mono text-[10px] text-neutral-500">
                  TOTAL {formatTime(duration)}
                </div>
              </div>

              {/* Transparent Acrylic Window with Rotating Spools */}
              <div className="relative rounded-xl bg-neutral-900/95 border-2 border-neutral-700/80 p-3 sm:p-4 my-2 shadow-inner overflow-hidden">
                {/* Magnetic Tape Ribbon across the middle */}
                <div className="absolute inset-x-8 top-10 h-8 bg-amber-950/70 border-t border-b border-amber-800/40 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-around sm:justify-center sm:gap-20">
                  {/* Left Spool: Feed */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{
                        repeat: isPlaying ? Infinity : 0,
                        duration: 2.2,
                        ease: "linear",
                      }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-100 border-4 border-neutral-300 shadow-md flex items-center justify-center relative"
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-950 border-2 border-neutral-800 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-neutral-200" />
                      </div>
                      <div className="absolute w-2 h-0.5 bg-neutral-400 -left-1" />
                      <div className="absolute w-2 h-0.5 bg-neutral-400 -right-1" />
                      <div className="absolute h-2 w-0.5 bg-neutral-400 -top-1" />
                      <div className="absolute h-2 w-0.5 bg-neutral-400 -bottom-1" />
                    </motion.div>
                    <span className="font-mono text-[9px] text-neutral-400 mt-1 uppercase">
                      feed
                    </span>
                  </div>

                  {/* Center Tape Window & Ruler */}
                  <div className="hidden sm:flex flex-col items-center px-4">
                    <div className="w-16 h-4 border-b border-t border-neutral-600 flex justify-between items-center px-1">
                      <span className="text-[7px] font-mono text-neutral-400">100</span>
                      <span className="text-[7px] font-mono text-neutral-400">50</span>
                      <span className="text-[7px] font-mono text-neutral-400">0</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isPlaying ? "bg-emerald-400 animate-pulse" : "bg-neutral-600"
                        }`}
                      />
                      <span className="font-mono text-[9px] text-neutral-400 uppercase">
                        {isPlaying ? "streaming" : "ready"}
                      </span>
                    </div>
                  </div>

                  {/* Right Spool: Take-up */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{
                        repeat: isPlaying ? Infinity : 0,
                        duration: 2.2,
                        ease: "linear",
                      }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-100 border-4 border-neutral-300 shadow-md flex items-center justify-center relative"
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-950 border-2 border-neutral-800 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-neutral-200" />
                      </div>
                      <div className="absolute w-2 h-0.5 bg-neutral-400 -left-1" />
                      <div className="absolute w-2 h-0.5 bg-neutral-400 -right-1" />
                      <div className="absolute h-2 w-0.5 bg-neutral-400 -top-1" />
                      <div className="absolute h-2 w-0.5 bg-neutral-400 -bottom-1" />
                    </motion.div>
                    <span className="font-mono text-[9px] text-neutral-400 mt-1 uppercase">
                      take-up
                    </span>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* DIRECT SUBTITLE / TRANSLATION STREAM (Under Feed & Take-Up elements) */}
                {/* ========================================================================= */}
                <div className="mt-3.5 relative min-h-[58px] sm:min-h-[64px] px-3.5 py-2 rounded-lg bg-neutral-950/90 border border-neutral-800/90 flex flex-col justify-center shadow-inner">
                  {/* Mode indicator pill */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 uppercase tracking-widest pb-1 border-b border-neutral-850">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>live teleprompter</span>
                    </div>
                    <span className="text-amber-400/90 font-bold">
                      {showTranslation ? "EN (TRANSLATION)" : "ES (ORIGINAL)"}
                    </span>
                  </div>

                  {/* Live Streaming Subtitle Text */}
                  <div className="pt-1.5 flex items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${activeSegmentIndex}-${showTranslation}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`text-xs sm:text-[13px] font-mono leading-snug ${
                          isPlaying
                            ? showTranslation
                              ? "text-amber-300 font-medium"
                              : "text-white font-medium"
                            : "text-neutral-400 italic"
                        }`}
                      >
                        {isPlaying ? (
                          showTranslation ? (
                            `"${currentSegment.en}"`
                          ) : (
                            `"${currentSegment.es}"`
                          )
                        ) : (
                          <span className="text-neutral-500">
                            ▶ press play to stream voice note in real-time
                          </span>
                        )}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Interactive Scrubber / Magnetic Tape Progress Track */}
                <div
                  onClick={handleSeek}
                  className="mt-3 w-full h-2 bg-neutral-800 rounded-full overflow-hidden cursor-pointer relative"
                  title="Click to seek"
                >
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Walkman / Tape Deck Control Panel */}
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3">
              {/* Play / Pause / Rewind Physical Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause voice note" : "Play voice note"}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-150 cursor-pointer shadow-md active:translate-y-0.5 ${
                    isPlaying
                      ? "bg-amber-400 text-neutral-950 hover:bg-amber-300"
                      : "bg-white text-neutral-950 hover:bg-neutral-200"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      <span>PLAY TAPE</span>
                    </>
                  )}
                </button>

                <button
                  onClick={restartAudio}
                  aria-label="Rewind tape to beginning"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-all cursor-pointer active:translate-y-0.5 shadow-sm"
                  title="Rewind to start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Language Switch Button: Switches the Streamed Subtitles between Spanish and English */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTranslation((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-mono transition-all cursor-pointer shadow-xs active:translate-y-0.5 ${
                    showTranslation
                      ? "bg-amber-400/15 border-amber-400/60 text-amber-300 hover:bg-amber-400/25"
                      : "bg-neutral-900 border-neutral-700/80 text-neutral-300 hover:bg-neutral-800"
                  }`}
                  title="Switch live stream between Spanish and English translation"
                >
                  <Languages className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showTranslation ? "Switch to Spanish" : "Show Translation"}</span>
                </button>
              </div>
            </div>

            {/* Optional Full Transcript Toggle */}
            <div className="mt-4 pt-3 border-t border-neutral-800 text-xs font-mono">
              <button
                onClick={() => setShowFullTranscript((prev) => !prev)}
                className="text-[11px] text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{showFullTranscript ? "Hide complete transcript" : "View full transcript"}</span>
              </button>

              {showFullTranscript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-neutral-800/80 space-y-3 font-normal"
                >
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">
                      spanish (original)
                    </span>
                    <p className="text-neutral-300 leading-relaxed">
                      "Hola, mis amigos, bienvenidos a mi portafolio, este es me presentando, me llamo Adedamola, un ingeniero de diseño, soy de Nigeria, aprendiendo de español porque me gusta la cultura, la lengua y quiero aprender nuevas cosas, todavía estoy un principiante y esperando ser mejor. Yo tengo tres años de experiencia en diseño, me encanta diseñar y construir cosas, también me encanta los deportes especialmente fútbol. Estoy listo para trabajar y esperando saber para ti. Gracias por escuchar. Adiós."
                    </p>
                  </div>
                  <div className="pt-2 border-t border-neutral-850">
                    <span className="text-[10px] text-amber-400/70 uppercase tracking-wider block mb-1">
                      english (translation)
                    </span>
                    <p className="text-amber-300/90 leading-relaxed">
                      "Hello, my friends, welcome to my portfolio, this is me introducing myself, my name is Adedamola, a design engineer, I'm from Nigeria, learning Spanish because I like the culture, the language, and I want to learn new things, I'm still a beginner and hoping to get better. I have three years of experience in design, I love designing and building things, I also love sports especially football. I'm ready to work and looking forward to hearing from you. Thanks for listening. Goodbye."
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden Audio Element */}
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
