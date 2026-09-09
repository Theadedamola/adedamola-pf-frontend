import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  Phone,
  PhoneOff,
  CheckCircle2,
  Clock,
  Music2,
  Fingerprint,
  RotateCcw,
} from "lucide-react";

type IslandState = "idle" | "music" | "call" | "payment" | "timer";

// Shared fluid spring transition
const FLUID_SPRING = {
  type: "spring" as const,
  stiffness: 340,
  damping: 28,
  mass: 0.7,
};

export default function FluidIslandShot() {
  const [state, setState] = useState<IslandState>("music");
  const [isPlaying, setIsPlaying] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (state !== "timer") return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 45));
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  const handleAuthorize = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 2500);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-6 select-none">
      {/* Top Shot Title Info */}
      <div className="text-center mb-16 max-w-md">
        <span className="text-[11px] font-mono text-amber-600 uppercase tracking-widest font-semibold">
          Shot #01 · Spatial UI
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 mt-1">
          Morphing Fluid Island
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 font-mono mt-1">
          continuous spring deformation with zero-jump popLayout
        </p>
      </div>

      {/* The Dynamic Fluid Island Canvas Stage */}
      <div className="relative min-h-[220px] flex items-center justify-center w-full max-w-2xl">
        <motion.div
          layout
          transition={FLUID_SPRING}
          className="relative bg-neutral-950 text-white rounded-[32px] shadow-2xl border border-neutral-800/80 overflow-hidden flex items-center justify-center"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {/* 1. IDLE STATE */}
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                transition={{
                  ...FLUID_SPRING,
                  opacity: { duration: 0.18 },
                  filter: { duration: 0.18 },
                }}
                className="w-[240px] px-5 py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-neutral-300">adedamola.lab</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">v1.0</span>
              </motion.div>
            )}

            {/* 2. MUSIC PLAYER STATE */}
            {state === "music" && (
              <motion.div
                key="music"
                initial={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                transition={{
                  ...FLUID_SPRING,
                  opacity: { duration: 0.18 },
                  filter: { duration: 0.18 },
                }}
                className="w-[420px] sm:w-[440px] p-5 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Album artwork */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shrink-0">
                      <Music2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white tracking-tight truncate">
                        Midnight in Lagos
                      </div>
                      <div className="text-xs font-mono text-neutral-400 truncate">
                        Adedamola &middot; Afro-LoFi
                      </div>
                    </div>
                  </div>

                  {/* Equalizer Waveform */}
                  <div className="flex items-end gap-1 h-6 px-2 shrink-0">
                    {[16, 24, 12, 20, 28, 14, 22].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: isPlaying ? [4, h, 6] : 4,
                        }}
                        transition={{
                          repeat: isPlaying ? Infinity : 0,
                          repeatType: "reverse",
                          duration: 0.4 + i * 0.08,
                          ease: "easeInOut",
                        }}
                        className="w-1 rounded-full bg-emerald-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Scrubber & Controls */}
                <div className="flex items-center justify-between pt-1 border-t border-neutral-900">
                  <span className="text-[10px] font-mono text-neutral-500">1:42</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 transition-colors cursor-pointer active:scale-90"
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="p-2 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">-2:18</span>
                </div>
              </motion.div>
            )}

            {/* 3. INCOMING CALL STATE */}
            {state === "call" && (
              <motion.div
                key="call"
                initial={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                transition={{
                  ...FLUID_SPRING,
                  opacity: { duration: 0.18 },
                  filter: { duration: 0.18 },
                }}
                className="w-[380px] p-5 flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-heading font-bold text-white text-base">
                      AC
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-neutral-950" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white tracking-tight truncate">
                      Acme Ventures
                    </div>
                    <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>incoming call...</span>
                    </div>
                  </div>
                </div>

                {/* Call Action Pills */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setState("idle")}
                    className="p-3 rounded-full bg-red-600/90 text-white hover:bg-red-500 transition-colors active:scale-90 cursor-pointer shadow-md"
                    title="Decline"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setState("idle")}
                    className="p-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-400 transition-colors active:scale-90 cursor-pointer shadow-md animate-bounce"
                    title="Accept"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 4. PAYMENT AUTHORIZATION STATE */}
            {state === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                transition={{
                  ...FLUID_SPRING,
                  opacity: { duration: 0.18 },
                  filter: { duration: 0.18 },
                }}
                className="w-[410px] p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                        biometric authorization
                      </div>
                      <div className="text-base font-heading font-bold text-white">
                        $4,500.00 USD
                      </div>
                    </div>
                  </div>

                  {paymentSuccess ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Authorized</span>
                    </motion.div>
                  ) : (
                    <button
                      onClick={handleAuthorize}
                      className="px-4 py-2 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-mono font-semibold transition-all active:scale-95 cursor-pointer shadow-md"
                    >
                      Hold to Pay
                    </button>
                  )}
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  Target: Stripe Payout &middot; Design Sprint Escrow
                </div>
              </motion.div>
            )}

            {/* 5. TIMER STATE */}
            {state === "timer" && (
              <motion.div
                key="timer"
                initial={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)", scale: 0.94 }}
                transition={{
                  ...FLUID_SPRING,
                  opacity: { duration: 0.18 },
                  filter: { duration: 0.18 },
                }}
                className="w-[330px] p-4 px-5 flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      sprint timer
                    </div>
                    <div className="text-xl font-mono font-bold text-white tracking-widest">
                      00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setTimerSeconds(45)}
                  className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mode Switcher Interactive Control Dock */}
      <div className="mt-20 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white border border-neutral-200/90 shadow-md">
        <span className="text-[11px] font-mono text-neutral-400 px-2 uppercase tracking-wider">
          morph state:
        </span>
        {(
          [
            { id: "idle", label: "01 / Idle" },
            { id: "music", label: "02 / Music" },
            { id: "call", label: "03 / Incoming Call" },
            { id: "payment", label: "04 / Payment" },
            { id: "timer", label: "05 / Timer" },
          ] as const
        ).map((mode) => (
          <button
            key={mode.id}
            onClick={() => setState(mode.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              state === mode.id
                ? "bg-neutral-950 text-white shadow-xs font-semibold"
                : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}
