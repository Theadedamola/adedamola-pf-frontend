import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Palette, Eye, EyeOff } from "lucide-react";

export default function LabLayout() {
  const [isRecordingMode, setIsRecordingMode] = useState(false);
  const [canvasBg, setCanvasBg] = useState<"creme" | "dark" | "pure-white" | "grid">("creme");
  const [aspectFrame, setAspectFrame] = useState<"fullscreen" | "dribbble" | "twitter">("fullscreen");
  const location = useLocation();
  const isLabIndex = location.pathname === "/lab";
  const isStoreErp = location.pathname.includes("store-erp") || location.pathname.includes("complex-sidebar");

  const bgClasses = {
    creme: "bg-[#FAF8F5] text-neutral-900",
    dark: "bg-neutral-950 text-white",
    "pure-white": "bg-white text-neutral-900",
    grid: "bg-[#FAF8F5] text-neutral-900 [background-image:radial-gradient(#d5d1c8_1px,transparent_1px)] [background-size:24px_24px]",
  };

  const frameClasses = {
    fullscreen: "w-full h-full",
    dribbble: "w-[1200px] h-[900px] rounded-3xl shadow-2xl border border-neutral-200/80 overflow-hidden",
    twitter: "w-[1200px] h-[675px] rounded-3xl shadow-2xl border border-neutral-200/80 overflow-hidden",
  };

  return (
    <div className={`min-h-screen w-full select-none transition-colors duration-300 relative flex flex-col items-center justify-center ${isStoreErp ? "h-screen overflow-hidden" : ""} ${bgClasses[canvasBg]}`}>
      {/* Recording HUD / Sandbox Controls (Discreetly Floating, can be hidden for clean screen recording) */}
      <div
        className={`fixed ${isStoreErp ? "bottom-4 right-4" : "top-4 inset-x-0"} z-50 flex justify-center pointer-events-none transition-opacity duration-300 ${
          isRecordingMode ? "opacity-0 hover:opacity-100" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-neutral-900/90 text-white backdrop-blur-xl border border-neutral-700/80 shadow-2xl pointer-events-auto text-xs font-mono">
          {!isLabIndex && (
            <Link
              to="/lab"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
              title="Back to Lab catalog"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>lab catalog</span>
            </Link>
          )}

          <Link
            to="/"
            className="px-3 py-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            exit to site
          </Link>

          <div className="h-4 w-[1px] bg-neutral-700 mx-1" />

          {/* Canvas Background Swapper */}
          <button
            onClick={() => {
              const modes: ("creme" | "dark" | "pure-white" | "grid")[] = ["creme", "dark", "pure-white", "grid"];
              const next = modes[(modes.indexOf(canvasBg) + 1) % modes.length];
              setCanvasBg(next);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 transition-colors cursor-pointer"
            title="Toggle background tone"
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="capitalize">{canvasBg}</span>
          </button>

          {/* Aspect Ratio Frame Preset (for recording clean 16:9 or Dribbble 4:3 shots) */}
          <button
            onClick={() => {
              const frames: ("fullscreen" | "dribbble" | "twitter")[] = ["fullscreen", "dribbble", "twitter"];
              const next = frames[(frames.indexOf(aspectFrame) + 1) % frames.length];
              setAspectFrame(next);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 transition-colors cursor-pointer"
            title="Toggle recording aspect ratio frame"
          >
            <span className="uppercase text-[10px]">{aspectFrame}</span>
          </button>

          {/* Clean Recording Mode (Hides all toolbar UI so screen captures have zero clutter) */}
          <button
            onClick={() => setIsRecordingMode((prev) => !prev)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-neutral-800 text-amber-400 transition-colors cursor-pointer"
            title="Clean Record Mode (hides HUD; hover top edge to restore)"
          >
            {isRecordingMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="text-[10px]">rec mode</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex items-center justify-center ${frameClasses[aspectFrame]}`}>
        <Outlet />
      </div>
    </div>
  );
}
