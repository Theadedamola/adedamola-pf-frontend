import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eye, EyeOff, RotateCw, ShieldCheck } from "lucide-react";

type CardTheme = "titanium" | "holographic" | "silver";

interface HolographicCardShotProps {
  hideHeader?: boolean;
}

export default function HolographicCardShot({ hideHeader = false }: HolographicCardShotProps = {}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [theme, setTheme] = useState<CardTheme>("titanium");
  const [showCvc, setShowCvc] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 22, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation angles
  const rotateX = useTransform(smoothY, [0, 1], [14, -14]);
  const rotateY = useTransform(smoothX, [0, 1], [-18, 18]);

  // Glare & reflection positioning
  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const foilRotate = useTransform(smoothX, [0, 1], ["0deg", "360deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center ${hideHeader ? "py-6 px-3" : "py-20 px-6"} select-none`}>
      {/* Header */}
      {!hideHeader && (
        <div className="text-center mb-14 max-w-md">
          <span className="text-[11px] font-mono text-amber-600 uppercase tracking-widest font-semibold">
            Shot #02 · 3D Shaders & Specular Physics
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 mt-1">
            Holographic Titanium Card
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-mono mt-1">
            gyro-reactive specular sheen & iridescent foil physics
          </p>
        </div>
      )}

      {/* 3D Perspective Stage */}
      <div
        style={{ perspective: 1200 }}
        className="w-full max-w-md flex items-center justify-center py-6"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative cursor-pointer transition-transform active:scale-[0.98]"
          style={{ width: "360px", height: "228px" }}
        >
          {/* Rotating Card Body */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateZ: isFlipped ? 180 : 0 }}
            transition={{
              rotateZ: { type: "spring", stiffness: 260, damping: 24 },
            }}
            className="w-full h-full relative rounded-2xl shadow-2xl transition-shadow duration-300 hover:shadow-cyan-500/10"
          >
            {/* ========================================================================= */}
            {/* FRONT FACE */}
            {/* ========================================================================= */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className={`absolute inset-0 rounded-2xl border overflow-hidden p-6 flex flex-col justify-between ${
                theme === "titanium"
                  ? "bg-neutral-950 text-white border-neutral-700/60 shadow-inner"
                  : theme === "holographic"
                  ? "bg-neutral-900 text-white border-neutral-600/80 shadow-inner"
                  : "bg-gradient-to-br from-neutral-100 to-neutral-300 text-neutral-900 border-neutral-300 shadow-inner"
              }`}
            >
              {/* Dynamic Iridescent Foil Layer (Theme Holographic) */}
              {theme === "holographic" && (
                <motion.div
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, #ec4899, #f59e0b, #10b981, #06b6d4, #8b5cf6, #ec4899)",
                    mixBlendMode: "color-dodge",
                    opacity: 0.45,
                    rotate: foilRotate,
                  }}
                  className="absolute -inset-[100%] pointer-events-none filter blur-xl"
                />
              )}

              {/* Brushed Texture Sheen */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
                }}
              />

              {/* Cursor-tracking Specular Light Reflection */}
              <motion.div
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([gx, gy]) =>
                      `radial-gradient(circle 240px at ${gx} ${gy}, rgba(255,255,255,${
                        theme === "silver" ? 0.45 : 0.28
                      }), transparent 80%)`
                  ),
                }}
                className="absolute inset-0 pointer-events-none"
              />

              {/* Card Top: Chip & Contactless */}
              <div className="relative z-10 flex items-center justify-between">
                {/* Metallic Gold EMV Chip */}
                <div className="w-11 h-9 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-500/80 p-1 flex flex-col justify-between shadow-xs">
                  <div className="flex justify-between h-2 border-b border-amber-600/50">
                    <span className="w-2.5 border-r border-amber-600/50" />
                    <span className="w-2.5 border-l border-amber-600/50" />
                  </div>
                  <div className="w-3 h-2 mx-auto rounded-xs border border-amber-700/40 bg-amber-200/40" />
                  <div className="flex justify-between h-2 border-t border-amber-600/50">
                    <span className="w-2.5 border-r border-amber-600/50" />
                    <span className="w-2.5 border-l border-amber-600/50" />
                  </div>
                </div>

                {/* Contactless symbol & Bank/Brand */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                    <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                    <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                  </svg>
                  <span className="font-mono text-xs font-bold tracking-widest uppercase opacity-80">
                    TITANIUM
                  </span>
                </div>
              </div>

              {/* Card Bottom: Holder Name, Number & Expiry */}
              <div className="relative z-10">
                <div className="font-mono text-base tracking-[0.25em] font-semibold mb-3 drop-shadow-xs">
                  4820 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 9014
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[9px] font-mono opacity-60 uppercase tracking-widest">
                      cardholder
                    </div>
                    <div className="font-mono text-xs font-bold tracking-wider uppercase mt-0.5">
                      ADEDAMOLA ALAUSA
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono opacity-60 uppercase tracking-widest">
                      expires
                    </div>
                    <div className="font-mono text-xs font-bold tracking-wider mt-0.5">
                      08/29
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* BACK FACE */}
            {/* ========================================================================= */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className={`absolute inset-0 rounded-2xl border overflow-hidden flex flex-col justify-between py-5 ${
                theme === "titanium"
                  ? "bg-neutral-950 text-white border-neutral-700/60"
                  : theme === "holographic"
                  ? "bg-neutral-900 text-white border-neutral-600/80"
                  : "bg-neutral-200 text-neutral-900 border-neutral-300"
              }`}
            >
              {/* Magnetic Strip */}
              <div className="w-full h-10 bg-neutral-900 border-y border-neutral-800 shadow-inner" />

              {/* Signature Panel & CVC */}
              <div className="px-6 space-y-2">
                <div className="flex items-center gap-3">
                  {/* Signature field with cursive name */}
                  <div className="grow h-8 bg-neutral-100 rounded-xs flex items-center px-3 border border-neutral-300">
                    <span className="font-signature text-base text-neutral-800">
                      Adedamola Alausa
                    </span>
                  </div>

                  {/* CVC Box with interactive reveal */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCvc(!showCvc);
                    }}
                    className="h-8 px-3 rounded-xs bg-neutral-800 border border-neutral-700 flex items-center gap-1.5 font-mono text-xs font-bold text-amber-400 cursor-pointer hover:bg-neutral-750 transition-colors"
                    title="Click to reveal CVC"
                  >
                    <span>{showCvc ? "842" : "•••"}</span>
                    {showCvc ? <EyeOff className="w-3 h-3 text-neutral-400" /> : <Eye className="w-3 h-3 text-neutral-400" />}
                  </div>
                </div>

                <p className="text-[8px] font-mono text-neutral-500 leading-tight">
                  Authorized signature not valid unless signed. For customer service call +234 706 727 6819 or visit adedamola.dev.
                </p>
              </div>

              {/* Bottom Hologram Emblem */}
              <div className="px-6 flex items-center justify-between text-neutral-400 text-[9px] font-mono">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>EMVCo Verified</span>
                </div>
                <div className="w-8 h-5 rounded-sm bg-gradient-to-r from-amber-400 to-rose-400 opacity-80 flex items-center justify-center font-bold text-black text-[8px]">
                  HOL
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <p className="mt-4 text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
        <RotateCw className="w-3 h-3" />
        <span>click card to flip &middot; hover to tilt with physics</span>
      </p>

      {/* Control Dock (Material Swapper) */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white border border-neutral-200/90 shadow-md">
        <span className="text-[11px] font-mono text-neutral-400 px-2 uppercase tracking-wider">
          material finish:
        </span>
        {(
          [
            { id: "titanium", label: "Titanium Black" },
            { id: "holographic", label: "Iridescent Foil" },
            { id: "silver", label: "Liquid Silver" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              theme === t.id
                ? "bg-neutral-950 text-white shadow-xs font-semibold"
                : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
