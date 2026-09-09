import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Compass,
  Folder,
  Terminal,
  Camera,
  Music,
  Code2,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

interface DockApp {
  id: string;
  name: string;
  icon: typeof Compass;
  color: string;
}

const DOCK_APPS: DockApp[] = [
  { id: "finder", name: "Finder", icon: Folder, color: "from-blue-500 to-indigo-600" },
  { id: "terminal", name: "Terminal", icon: Terminal, color: "from-neutral-800 to-neutral-950" },
  { id: "code", name: "VS Code", icon: Code2, color: "from-cyan-500 to-blue-600" },
  { id: "camera", name: "Aperture", icon: Camera, color: "from-amber-500 to-rose-600" },
  { id: "music", name: "Music", icon: Music, color: "from-rose-500 to-pink-600" },
  { id: "compass", name: "Safari", icon: Compass, color: "from-sky-400 to-blue-500" },
  { id: "lab", name: "Design Lab", icon: Sparkles, color: "from-violet-500 to-purple-700" },
];

interface MagneticDockShotProps {
  hideHeader?: boolean;
}

export default function MagneticDockShot({ hideHeader = false }: MagneticDockShotProps = {}) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const mouseX = useMotionValue(Infinity);

  // Synthesize mechanical audio feedback with Web Audio API (0 dependencies)
  const playClickSound = (freq = 480) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context policy fallback
    }
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center ${hideHeader ? "py-6 px-3" : "py-20 px-6"} select-none`}>
      {/* Header */}
      {!hideHeader && (
        <div className="text-center mb-16 max-w-md">
          <span className="text-[11px] font-mono text-amber-600 uppercase tracking-widest font-semibold">
            Shot #03 · Spatial Math & Audio Haptics
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 mt-1">
            Magnetic Fluid Dock
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-mono mt-1">
            velocity-aware magnetic curve with web audio sound synthesis
          </p>
        </div>
      )}

      {/* The Magnetic Dock Stage */}
      <div className="relative min-h-[160px] flex items-center justify-center w-full max-w-2xl">
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end gap-3 px-4 py-3 rounded-3xl bg-white/85 backdrop-blur-2xl border border-neutral-200/90 shadow-2xl shadow-neutral-950/10"
        >
          {DOCK_APPS.map((app, index) => (
            <DockIconItem
              key={app.id}
              app={app}
              mouseX={mouseX}
              index={index}
              onHover={() => playClickSound(380 + index * 40)}
              onClick={() => {
                setActiveApp(app.id);
                playClickSound(640);
                setTimeout(() => setActiveApp(null), 1200);
              }}
              isActive={activeApp === app.id}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating Controls (Sound & Info) */}
      <div className="mt-14 flex items-center gap-3">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono transition-all cursor-pointer shadow-xs ${
            soundEnabled
              ? "bg-neutral-950 text-white border-neutral-900"
              : "bg-white text-neutral-500 border-neutral-200 hover:text-neutral-900"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundEnabled ? "Web Audio Haptics: ON" : "Muted"}</span>
        </button>

        <span className="text-xs font-mono text-neutral-400">
          hover along the dock to experience the magnetic wave
        </span>
      </div>
    </div>
  );
}

// Individual magnetic icon using cosine distance curve
function DockIconItem({
  app,
  mouseX,
  onHover,
  onClick,
  isActive,
}: {
  app: DockApp;
  mouseX: any;
  index: number;
  onHover: () => void;
  onClick: () => void;
  isActive: boolean;
}) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Compute distance between cursor and this icon's center
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = iconRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Smooth cosine-based scale curve (max width 68px, base 46px)
  const widthSync = useTransform(distance, [-150, 0, 150], [46, 68, 46]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 14 });

  const Icon = app.icon;

  return (
    <div className="relative flex flex-col items-center">
      {/* Floating Tooltip with spring */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: -8, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.9 }}
          className="absolute -top-7 px-2.5 py-1 rounded-md bg-neutral-950/90 text-white text-[10px] font-mono whitespace-nowrap pointer-events-none shadow-md backdrop-blur-md"
        >
          {app.name}
        </motion.div>
      )}

      {/* The Magnifying Icon Button */}
      <motion.div
        ref={iconRef}
        style={{ width, height: width }}
        onMouseEnter={() => {
          setIsHovered(true);
          onHover();
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        animate={isActive ? { y: [0, -24, 0, -12, 0] } : { y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`rounded-2xl bg-gradient-to-tr ${app.color} p-2 flex items-center justify-center text-white shadow-md cursor-pointer hover:shadow-lg transition-shadow relative active:scale-95`}
      >
        {/* Specular gloss top reflection */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-2xl pointer-events-none" />
        <Icon className="w-1/2 h-1/2 text-white drop-shadow-xs relative z-10" />
      </motion.div>

      {/* Active Dot Indicator */}
      <div className="w-1 h-1 rounded-full bg-neutral-900 mt-1.5 opacity-60" />
    </div>
  );
}
