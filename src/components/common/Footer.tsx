import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import me1 from "@/assets/me1.jpg";

const SOCIAL_CHANNELS = [
  { label: "github", href: "https://github.com/Theadedamola" },
  { label: "linkedin", href: "https://www.linkedin.com/in/adedamola-alausa/" },
  { label: "twitter / x", href: "https://x.com/Theadedamola_" },
  { label: "whatsapp", href: "https://wa.me/2347067276819" },
  { label: "email", href: "mailto:adedamolajose@gmail.com" },
];

const HEADLINE_LETTERS = "ADEDAMOLA".split("");

interface PhysicsItem {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  width: number;
  height: number;
  rotation: number;
  homeRotation: number;
  vr: number;
  radius: number;
}

const MOUSE_RADIUS = 130;
const MOUSE_FORCE = 16;
const FRICTION = 0.94;
const BOUNCE_DAMPING = 0.65;
const HOME_PULL = 0.007;
const ROTATION_FRICTION = 0.92;

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const physicsRef = useRef<PhysicsItem[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const initializedRef = useRef(false);
  const [ready, setReady] = useState(false);

  // Initialize both letters & stickers into the physics engine
  const initPhysics = useCallback(() => {
    const playground = playgroundRef.current;
    if (!playground) return;
    const playgroundRect = playground.getBoundingClientRect();

    const items: PhysicsItem[] = [];

    // 1. Letters
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = rect.left - playgroundRect.left;
      const y = rect.top - playgroundRect.top;
      const w = rect.width;
      const h = rect.height;
      items.push({
        id: `letter-${i}`,
        x,
        y,
        vx: 0,
        vy: 0,
        homeX: x,
        homeY: y,
        width: w,
        height: h,
        rotation: 0,
        homeRotation: 0,
        vr: 0,
        radius: Math.max(w, h) * 0.45,
      });
    });

    // 2. Stickers
    const stickerRotations = [-6, 8, -12, 10, -5];
    stickerRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = rect.left - playgroundRect.left;
      const y = rect.top - playgroundRect.top;
      const w = rect.width;
      const h = rect.height;
      const rot = stickerRotations[i % stickerRotations.length];
      items.push({
        id: `sticker-${i}`,
        x,
        y,
        vx: 0,
        vy: 0,
        homeX: x,
        homeY: y,
        width: w,
        height: h,
        rotation: rot,
        homeRotation: rot,
        vr: 0,
        radius: Math.max(w, h) * 0.48,
      });
    });

    physicsRef.current = items;
    initializedRef.current = true;
    setReady(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(initPhysics, 350);
    window.addEventListener("resize", initPhysics);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", initPhysics);
    };
  }, [initPhysics]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const playground = playgroundRef.current;
    if (!playground) return;
    const rect = playground.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const playground = playgroundRef.current;
    if (!playground || !e.touches[0]) return;
    const rect = playground.getBoundingClientRect();
    mouseRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }, []);

  const handleTouchEnd = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  // 60FPS Physics loop
  useAnimationFrame(() => {
    if (!initializedRef.current) return;
    const playground = playgroundRef.current;
    if (!playground) return;

    const playgroundRect = playground.getBoundingClientRect();
    const cw = playgroundRect.width;
    const ch = playgroundRect.height;
    const mouse = mouseRef.current;
    const items = physicsRef.current;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Mouse repulsion
      const itemCx = item.x + item.width / 2;
      const itemCy = item.y + item.height / 2;
      const dx = itemCx - mouse.x;
      const dy = itemCy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS && dist > 1) {
        const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_FORCE;
        const nx = dx / dist;
        const ny = dy / dist;
        item.vx += nx * force;
        item.vy += ny * force;
        item.vr += nx * force * 1.5 * (ny > 0 ? 1 : -1);
      }

      // Return home
      const homeDx = item.homeX - item.x;
      const homeDy = item.homeY - item.y;
      item.vx += homeDx * HOME_PULL;
      item.vy += homeDy * HOME_PULL;

      // Angular return home
      const rotDiff = item.homeRotation - item.rotation;
      item.vr += rotDiff * 0.012;

      // Damping
      item.vx *= FRICTION;
      item.vy *= FRICTION;
      item.vr *= ROTATION_FRICTION;

      // Position update
      item.x += item.vx;
      item.y += item.vy;
      item.rotation += item.vr;

      // Boundary bouncing
      if (item.x < 4) {
        item.x = 4;
        item.vx = Math.abs(item.vx) * BOUNCE_DAMPING;
        item.vr += item.vy * 0.2;
      }
      if (item.x + item.width > cw - 4) {
        item.x = cw - item.width - 4;
        item.vx = -Math.abs(item.vx) * BOUNCE_DAMPING;
        item.vr -= item.vy * 0.2;
      }
      if (item.y < 4) {
        item.y = 4;
        item.vy = Math.abs(item.vy) * BOUNCE_DAMPING;
        item.vr += item.vx * 0.2;
      }
      if (item.y + item.height > ch - 4) {
        item.y = ch - item.height - 4;
        item.vy = -Math.abs(item.vy) * BOUNCE_DAMPING;
        item.vr -= item.vx * 0.2;
      }

      // Item-to-item collisions (elastic balls)
      for (let j = i + 1; j < items.length; j++) {
        const other = items[j];
        const oCx = other.x + other.width / 2;
        const oCy = other.y + other.height / 2;
        const cdx = oCx - itemCx;
        const cdy = oCy - itemCy;
        const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
        const minR = item.radius + other.radius;

        if (cDist < minR && cDist > 0.5) {
          const overlap = minR - cDist;
          const cnx = cdx / cDist;
          const cny = cdy / cDist;

          // Push apart
          item.x -= cnx * overlap * 0.5;
          item.y -= cny * overlap * 0.5;
          other.x += cnx * overlap * 0.5;
          other.y += cny * overlap * 0.5;

          // Velocity impulse
          const relVx = item.vx - other.vx;
          const relVy = item.vy - other.vy;
          const impulse = (relVx * cnx + relVy * cny) * 0.5;
          item.vx -= impulse * cnx;
          item.vy -= impulse * cny;
          other.vx += impulse * cnx;
          other.vy += impulse * cny;
        }
      }

      // Apply transform
      const isLetter = i < HEADLINE_LETTERS.length;
      if (isLetter) {
        const el = letterRefs.current[i];
        if (el) {
          const tx = item.x - item.homeX;
          const ty = item.y - item.homeY;
          el.style.transform = `translate(${tx}px, ${ty}px) rotate(${item.rotation}deg)`;
        }
      } else {
        const stickerIdx = i - HEADLINE_LETTERS.length;
        const el = stickerRefs.current[stickerIdx];
        if (el) {
          const tx = item.x - item.homeX;
          const ty = item.y - item.homeY;
          el.style.transform = `translate(${tx}px, ${ty}px) rotate(${item.rotation}deg)`;
        }
      }
    }
  });

  return (
    <footer
      ref={containerRef}
      className="w-full bg-[#FAF8F5] text-neutral-900 overflow-hidden relative select-none"
      style={{
        backgroundImage: `
          radial-gradient(#d5d1c8 0.8px, transparent 0.8px),
          radial-gradient(#e6e2d8 0.8px, #FAF8F5 0.8px)
        `,
        backgroundSize: "28px 28px",
        backgroundPosition: "0 0, 14px 14px",
      }}
    >
      {/* Top hand-drawn squiggly border separator */}
      <div className="w-full h-3 overflow-hidden opacity-30 text-neutral-400">
        <svg
          viewBox="0 0 1200 12"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full stroke-current stroke-[1.5]"
        >
          <path d="M0,6 Q30,0 60,6 T120,6 T180,6 T240,6 T300,6 T360,6 T420,6 T480,6 T540,6 T600,6 T660,6 T720,6 T780,6 T840,6 T900,6 T960,6 T1020,6 T1080,6 T1140,6 T1200,6" />
        </svg>
      </div>

      {/* Interactive Physics Playground */}
      <div
        ref={playgroundRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full min-h-[46vh] sm:min-h-[54vh] md:min-h-[60vh] flex flex-col items-center justify-center px-6 md:px-12 cursor-crosshair overflow-hidden"
      >
        {/* Playful typewriter hint */}
        <motion.p
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3.5, duration: 2 }}
          className="absolute top-6 font-mono text-[11px] text-neutral-400 tracking-wider pointer-events-none"
        >
          ~ hover to scatter ~
        </motion.p>

        {/* ========================================================================= */}
        {/* STICKERS COLLAGE (Scattered around the name, participate in physics) */}
        {/* ========================================================================= */}

        {/* Sticker 1: Polaroid photo of Adedamola with masking tape (Top Left) */}
        <div
          ref={(el) => {
            stickerRefs.current[0] = el;
          }}
          className={`absolute top-8 left-6 sm:top-12 sm:left-16 md:left-24 z-20 will-change-transform ${
            ready ? "" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.4s" }}
        >
          <div className="relative p-1.5 pb-5 bg-white rounded-xs shadow-md border border-neutral-200/80 w-20 sm:w-24 md:w-28 cursor-grab active:cursor-grabbing">
            {/* Masking tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-amber-100/90 border-t border-b border-amber-300/40 rotate-[-3deg] shadow-xs backdrop-blur-xs" />
            <img
              src={me1}
              alt="Adedamola"
              className="w-full aspect-[4/5] object-cover rounded-xs filter contrast-105"
            />
            <span className="block text-center font-handwriting text-[10px] text-neutral-600 mt-1.5 leading-none">
              lagos, '25
            </span>
          </div>
        </div>

        {/* Sticker 2: Retro Cassette Tape (Top Right) */}
        <div
          ref={(el) => {
            stickerRefs.current[1] = el;
          }}
          className={`absolute top-6 right-8 sm:top-10 sm:right-20 md:right-32 z-20 will-change-transform ${
            ready ? "" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.4s" }}
        >
          <div className="p-1 bg-white rounded-lg shadow-md border border-neutral-200/90 w-24 sm:w-28 md:w-32">
            <svg
              viewBox="0 0 140 85"
              fill="none"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="140" height="85" rx="8" fill="#1C1C1E" />
              {/* Cassette label */}
              <rect x="12" y="8" width="116" height="54" rx="4" fill="#EF4444" />
              <rect x="20" y="14" width="100" height="24" rx="3" fill="#FEF3C7" />
              <text x="26" y="27" fill="#1F2937" fontSize="8" fontFamily="monospace" fontWeight="bold">
                SIDE A • MIXTAPE
              </text>
              <text x="26" y="35" fill="#6B7280" fontSize="6" fontFamily="sans-serif">
                the best part of life
              </text>
              {/* Tape reels */}
              <rect x="32" y="42" width="76" height="26" rx="4" fill="#111827" />
              <circle cx="50" cy="55" r="8" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="2" />
              <circle cx="90" cy="55" r="8" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="2" />
              <circle cx="50" cy="55" r="3" fill="#111827" />
              <circle cx="90" cy="55" r="3" fill="#111827" />
            </svg>
          </div>
        </div>

        {/* Sticker 3: Cute Blue Waving Cloud (Bottom Left) */}
        <div
          ref={(el) => {
            stickerRefs.current[2] = el;
          }}
          className={`absolute bottom-10 left-8 sm:bottom-14 sm:left-24 md:left-36 z-20 will-change-transform ${
            ready ? "" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.4s" }}
        >
          <div className="p-1 bg-white rounded-2xl shadow-md border border-neutral-200/90 w-16 sm:w-20">
            <svg viewBox="0 0 80 60" fill="none" className="w-full h-auto">
              <path
                d="M20 48h40a16 16 0 005-31.2 20 20 0 00-38.4-4A15 15 0 0020 48z"
                fill="#38BDF8"
              />
              {/* Eyes & Smile */}
              <circle cx="34" cy="34" r="2.5" fill="#0F172A" />
              <circle cx="46" cy="34" r="2.5" fill="#0F172A" />
              <path
                d="M37 40 Q40 44 43 40"
                stroke="#0F172A"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Rosy cheeks */}
              <circle cx="28" cy="38" r="3" fill="#FDA4AF" opacity="0.8" />
              <circle cx="52" cy="38" r="3" fill="#FDA4AF" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Sticker 4: Retro Game Controller (Bottom Right) */}
        <div
          ref={(el) => {
            stickerRefs.current[3] = el;
          }}
          className={`absolute bottom-8 right-6 sm:bottom-12 sm:right-20 md:right-32 z-20 will-change-transform ${
            ready ? "" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.4s" }}
        >
          <div className="p-1.5 bg-white rounded-xl shadow-md border border-neutral-200/90 w-20 sm:w-24">
            <svg viewBox="0 0 100 65" fill="none" className="w-full h-auto">
              {/* Controller body */}
              <path
                d="M20 20 C20 10, 80 10, 80 20 C85 35, 95 55, 78 60 C65 64, 60 48, 50 48 C40 48, 35 64, 22 60 C5 55, 15 35, 20 20 Z"
                fill="#3B82F6"
              />
              {/* D-Pad */}
              <rect x="25" y="26" width="14" height="5" rx="1.5" fill="#FFFFFF" />
              <rect x="29.5" y="21.5" width="5" height="14" rx="1.5" fill="#FFFFFF" />
              {/* Action Buttons */}
              <circle cx="70" cy="24" r="3" fill="#F43F5E" />
              <circle cx="76" cy="28.5" r="3" fill="#10B981" />
              <circle cx="64" cy="28.5" r="3" fill="#F59E0B" />
              <circle cx="70" cy="34" r="3" fill="#60A5FA" />
            </svg>
          </div>
        </div>

        {/* Sticker 5: Vintage 35mm Camera (Top Center-Right) */}
        <div
          ref={(el) => {
            stickerRefs.current[4] = el;
          }}
          className={`absolute top-4 right-1/3 z-20 will-change-transform hidden sm:block ${
            ready ? "" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.4s" }}
        >
          <div className="p-1.5 bg-white rounded-xl shadow-md border border-neutral-200/90 w-16 sm:w-20">
            <svg viewBox="0 0 80 60" fill="none" className="w-full h-auto">
              <rect x="5" y="16" width="70" height="40" rx="6" fill="#475569" />
              <rect x="5" y="16" width="70" height="12" rx="4" fill="#94A3B8" />
              <rect x="14" y="8" width="16" height="8" rx="2" fill="#94A3B8" />
              <circle cx="40" cy="36" r="16" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
              <circle cx="40" cy="36" r="10" fill="#0F172A" />
              <circle cx="36" cy="32" r="3" fill="#FFFFFF" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER STAGE: Reduced-size Name Letters */}
        {/* ========================================================================= */}
        <div
          className={`relative z-10 flex items-center justify-center tracking-tighter font-heading font-extrabold uppercase text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7.5vw] leading-[0.85] text-neutral-900 drop-shadow-xs ${
            ready ? "" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.3s" }}
        >
          {HEADLINE_LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              className="inline-block will-change-transform cursor-default"
              style={{ transformOrigin: "center center" }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Handwritten subtitle underneath */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 8 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 relative z-10 flex flex-col items-center pointer-events-none"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-handwriting text-neutral-700 tracking-wide">
            crafting pixels with intention
          </p>
          {/* Subtle hand-drawn curved underline */}
          <svg
            viewBox="0 0 200 12"
            fill="none"
            className="w-36 sm:w-48 h-auto mt-0.5 text-neutral-400 stroke-current stroke-[1.8] stroke-linecap-round"
          >
            <path d="M 5,6 Q 100,12 195,4" />
          </svg>
        </motion.div>
      </div>

      {/* Bottom Minimal Editorial Bar */}
      <div className="px-6 md:px-12 pb-8 pt-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {SOCIAL_CHANNELS.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-950 transition-colors relative group"
              >
                <span>{ch.label}</span>
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-neutral-900 group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </div>

          {/* Time & Copyright */}
          <div className="flex items-center gap-3 text-neutral-400">
            <span>lagos, ng</span>
            <span>·</span>
            <span>&copy; {new Date().getFullYear()} adedamola</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
