import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Loader2,
  Sparkles,
  Globe,
  CreditCard,
  BarChart2,
  ShieldCheck,
  ArrowRight,
  Store as StoreIcon,
  Zap,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";

export interface NewStoreData {
  id: string;
  name: string;
  domain: string;
  location: string;
  flag: string;
}

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoreCreated: (store: NewStoreData) => void;
  isDark: boolean;
}

type Step = "form" | "provisioning" | "success";

interface ProvisionStep {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROVISION_STEPS: ProvisionStep[] = [
  {
    id: "infra",
    label: "Setting up store infrastructure",
    icon: StoreIcon,
  },
  {
    id: "analytics",
    label: "Building real-time analytics",
    icon: BarChart2,
  },
  {
    id: "payments",
    label: "Activating payment gateway",
    icon: CreditCard,
  },
  {
    id: "cdn",
    label: "Deploying custom edge storefront",
    icon: Globe,
  },
];

const CURRENCIES = [
  { code: "USD", symbol: "$", country: "United States", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", country: "European Union", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", country: "United Kingdom", flag: "🇬🇧" },
  { code: "JPY", symbol: "¥", country: "Japan", flag: "🇯🇵" },
];

export default function AddShopModal({
  isOpen,
  onClose,
  onStoreCreated,
  isDark,
}: AddShopModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [storeName, setStoreName] = useState("");
  const [storeLocation, setStoreLocation] = useState("New York, USA");
  const [storeFlag, setStoreFlag] = useState("🇺🇸");
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [category, setCategory] = useState("Fashion & Lifestyle");

  // Provisioning step progress
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Derived slug for domain only
  const cleanSlug = storeName
    ? storeName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    : "new-shop";
  const fullDomain = `store.apex-retail.io/${cleanSlug}`;

  // Reset states on open
  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setStoreName("");
      setStoreLocation("New York, USA");
      setStoreFlag("🇺🇸");
      setCurrency(CURRENCIES[0]);
      setActiveStepIndex(0);
      setCompletedSteps([]);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && step !== "provisioning") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, step, onClose]);

  // Provisioning Simulation Sequence (AI thinking / working pace)
  const startProvisioning = () => {
    if (!storeName.trim()) return;
    setStep("provisioning");
    setActiveStepIndex(0);
    setCompletedSteps([]);

    const stepDuration = 1000;

    PROVISION_STEPS.forEach((stepItem, index) => {
      setTimeout(() => {
        setActiveStepIndex(index);
      }, index * stepDuration);

      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, stepItem.id]);
        if (index === PROVISION_STEPS.length - 1) {
          setTimeout(() => {
            setStep("success");
          }, 600);
        }
      }, (index + 1) * stepDuration - 150);
    });
  };

  const handleFinish = () => {
    const newStore: NewStoreData = {
      id: cleanSlug || `store-${Date.now()}`,
      name: storeName.trim(),
      domain: fullDomain,
      location: storeLocation,
      flag: storeFlag,
    };
    onStoreCreated(newStore);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{ colorScheme: isDark ? "dark" : "light" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none font-sans"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 backdrop-blur-md ${
              isDark ? "bg-black/80" : "bg-neutral-950/60"
            }`}
            onClick={() => {
              if (step !== "provisioning") onClose();
            }}
          />

          {/* Modal Card with considerable white space */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden z-10 ${
              isDark
                ? "bg-[#121316] border-neutral-800 text-white shadow-black/90"
                : "bg-white border-neutral-200 text-neutral-900 shadow-neutral-900/20"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`px-8 pt-7 pb-5 flex items-center justify-between border-b ${
                isDark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-100 bg-neutral-50/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center border shadow-xs ${
                    isDark
                      ? "bg-neutral-800 border-neutral-700 text-amber-400"
                      : "bg-white border-neutral-200 text-amber-600"
                  }`}
                >
                  <StoreIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {step === "form" && "Add a new store"}
                    {step === "provisioning" && "Setting up workspace"}
                    {step === "success" && "Store ready"}
                  </h3>
                  <p className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    {step === "form" && "Configure store identity and regional settings"}
                    {step === "provisioning" && "Orchestrating cloud resources and telemetry"}
                    {step === "success" && "Your store is live and connected"}
                  </p>
                </div>
              </div>

              {step !== "provisioning" && (
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isDark
                      ? "hover:bg-neutral-800 text-neutral-400 hover:text-white"
                      : "hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-8 sm:p-9">
              {/* ============================================================ */}
              {/* STEP 1: FORM INPUTS (Spacious, Sans-Serif, No Presets)        */}
              {/* ============================================================ */}
              {step === "form" && (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Store Name Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Store Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        autoFocus
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="e.g. Apex Ginza Atelier"
                        className={`w-full px-4 py-3 rounded-2xl text-sm outline-hidden border transition-all ${
                          isDark
                            ? "bg-neutral-900/90 border-neutral-700 text-white placeholder-neutral-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30"
                            : "bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:bg-white focus:ring-1 focus:ring-neutral-900/10"
                        }`}
                      />
                      {storeName.trim() && (
                        <div className="absolute right-3.5 top-3.5 text-xs text-emerald-500 flex items-center gap-1.5 font-medium">
                          <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span>Valid</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Domain Preview (Only place with font-mono) */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                      isDark
                        ? "bg-neutral-900/40 border-neutral-800 text-neutral-300"
                        : "bg-neutral-50 border-neutral-200/80 text-neutral-600"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span className="text-neutral-400">URL:</span>
                      <span className="font-mono font-medium text-amber-500 truncate">
                        {fullDomain}
                      </span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-medium border border-emerald-500/20 shrink-0 ml-2">
                      Available
                    </span>
                  </div>

                  {/* Two Column Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    {/* Primary Currency */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Currency
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {CURRENCIES.map((curr) => (
                          <button
                            key={curr.code}
                            type="button"
                            onClick={() => {
                              setCurrency(curr);
                              setStoreFlag(curr.flag);
                            }}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                              currency.code === curr.code
                                ? isDark
                                  ? "bg-neutral-800 border-amber-400 text-white font-semibold"
                                  : "bg-neutral-100 border-neutral-900 text-neutral-900 font-semibold"
                                : isDark
                                ? "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                                : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span>{curr.flag}</span>
                              <span>{curr.code}</span>
                            </span>
                            <span className="text-neutral-400">{curr.symbol}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Store Category & Location */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-neutral-500">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-hidden border transition-all cursor-pointer ${
                            isDark
                              ? "bg-neutral-900/90 border-neutral-700 text-white focus:border-amber-400"
                              : "bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-neutral-900 focus:bg-white"
                          }`}
                        >
                          <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                          <option value="Specialty Coffee & Roastery">Specialty Coffee & Roastery</option>
                          <option value="Design Objects & Furniture">Design Objects & Furniture</option>
                          <option value="Luxury Watches & Jewelry">Luxury Watches & Jewelry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-500">
                          City
                        </label>
                        <input
                          type="text"
                          value={storeLocation}
                          onChange={(e) => setStoreLocation(e.target.value)}
                          placeholder="e.g. Tokyo, Japan"
                          className={`w-full px-3.5 py-2 rounded-xl text-xs outline-hidden border ${
                            isDark
                              ? "bg-neutral-900/90 border-neutral-700 text-white placeholder-neutral-500"
                              : "bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className={`pt-6 flex items-center justify-end gap-3 border-t ${
                      isDark ? "border-neutral-800" : "border-neutral-200/80"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={onClose}
                      className={`px-5 py-2.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                        isDark
                          ? "text-neutral-400 hover:text-white"
                          : "text-neutral-600 hover:text-neutral-950"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!storeName.trim()}
                      onClick={startProvisioning}
                      className={`group flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm ${
                        storeName.trim()
                          ? isDark
                            ? "bg-white text-neutral-950 hover:bg-neutral-200 active:scale-95"
                            : "bg-neutral-950 text-white hover:bg-neutral-800 active:scale-95"
                          : isDark
                          ? "opacity-40 cursor-not-allowed bg-neutral-800 text-neutral-500"
                          : "opacity-40 cursor-not-allowed bg-neutral-200 text-neutral-400"
                      }`}
                    >
                      <span>Create Store</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ============================================================ */}
              {/* STEP 2: AI-CHAT STYLE PROGRESS (Clean, Unclustered, Icon greens) */}
              {/* ============================================================ */}
              {step === "provisioning" && (
                <motion.div
                  key="loading-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="py-10 sm:py-12 space-y-8"
                >
                  {/* Clean AI-like header indicator */}
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-sm font-medium tracking-tight">
                      Provisioning store workspace for{" "}
                      <span className="text-amber-500 font-semibold">{storeName}</span>...
                    </span>
                  </div>

                  {/* Clean Minimalist Steps List (Just icon + description, icon greens upon completion) */}
                  <div className="space-y-5">
                    {PROVISION_STEPS.map((stepItem, index) => {
                      const isCompleted = completedSteps.includes(stepItem.id);
                      const isCurrent = activeStepIndex === index && !isCompleted;

                      return (
                        <motion.div
                          key={stepItem.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.12 }}
                          className="flex items-center gap-4 transition-all duration-300"
                        >
                          {/* Fully rounded 18px indicator (greens upon completion) */}
                          <div
                            className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                              isCompleted
                                ? "bg-emerald-500 text-white shadow-xs"
                                : isCurrent
                                ? "text-amber-500"
                                : isDark
                                ? "border border-neutral-700 bg-neutral-900/60"
                                : "border border-neutral-300 bg-neutral-100/60"
                            }`}
                          >
                            {isCompleted ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                className="flex items-center justify-center"
                              >
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </motion.div>
                            ) : isCurrent ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400/40" />
                            )}
                          </div>

                          {/* Clean Description */}
                          <div className="flex-1">
                            <span
                              className={`text-sm transition-colors duration-300 ${
                                isCompleted
                                  ? isDark
                                    ? "text-white font-medium"
                                    : "text-neutral-900 font-medium"
                                  : isCurrent
                                  ? isDark
                                    ? "text-neutral-200 font-medium"
                                    : "text-neutral-800 font-medium"
                                  : isDark
                                  ? "text-neutral-600"
                                  : "text-neutral-400"
                              }`}
                            >
                              {stepItem.label}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ============================================================ */}
              {/* STEP 3: SUCCESS SCREEN WITH ILLUSTRATION STICKERS            */}
              {/* ============================================================ */}
              {step === "success" && (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="py-2 space-y-7"
                >
                  {/* Stickers Cluster */}
                  <div className="relative pt-6 pb-2 flex flex-col items-center justify-center text-center overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className={`w-64 h-32 blur-3xl rounded-full ${
                          isDark ? "bg-emerald-400/10" : "bg-emerald-500/15"
                        }`}
                      />
                    </div>

                    {/* Stickers Cluster */}
                    <div className="relative w-full max-w-sm h-36 flex items-center justify-center">
                      {/* Centerpiece 3D Holographic Storefront Sticker */}
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        className="relative z-20 cursor-pointer"
                      >
                        <div className="relative px-6 py-4 rounded-3xl bg-linear-to-br from-neutral-900 via-neutral-950 to-black text-white shadow-2xl shadow-emerald-500/20 border border-white/20 flex flex-col items-center">
                          <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-emerald-500/20 via-transparent to-amber-500/20 pointer-events-none" />
                          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 mb-1.5">
                            <StoreIcon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs font-semibold tracking-wide">
                            {storeName}
                          </span>
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>100% OPERATIONAL</span>
                          </span>
                        </div>
                      </motion.div>

                      {/* Sticker 1: Verified Stamp */}
                      <motion.div
                        initial={{ scale: 0, x: -30, rotate: -25 }}
                        animate={{ scale: 1, x: 0, rotate: -12 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.15 }}
                        whileHover={{ scale: 1.12, rotate: -6 }}
                        className="absolute -top-1 left-2 z-30 cursor-pointer"
                      >
                        <div className="px-3 py-1.5 rounded-xl bg-amber-400 text-neutral-950 text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-amber-500/30 border-2 border-white flex items-center gap-1.5 rotate-[-12deg]">
                          <ShieldCheck className="w-3.5 h-3.5 text-neutral-950 stroke-[2.5]" />
                          <span>VERIFIED</span>
                        </div>
                      </motion.div>

                      {/* Sticker 2: Live Stripe POS */}
                      <motion.div
                        initial={{ scale: 0, x: 30, rotate: 25 }}
                        animate={{ scale: 1, x: 0, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.2 }}
                        whileHover={{ scale: 1.1, rotate: 4 }}
                        className="absolute -bottom-2 right-4 z-30 cursor-pointer"
                      >
                        <div className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold tracking-tight shadow-lg shadow-emerald-600/30 border-2 border-white flex items-center gap-1 rotate-[10deg]">
                          <Zap className="w-3 h-3 fill-white" />
                          <span>LIVE STRIPE POS</span>
                        </div>
                      </motion.div>

                      {/* Sticker 3: Floating Sparkles */}
                      <motion.div
                        initial={{ scale: 0, y: -20 }}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 90, 180],
                          y: [-2, 2, -2],
                        }}
                        transition={{
                          scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                          rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                          delay: 0.25,
                        }}
                        className="absolute top-2 right-6 z-10 pointer-events-none"
                      >
                        <Sparkles className="w-7 h-7 text-amber-400 drop-shadow-md" />
                      </motion.div>

                      {/* Sticker 4: Shopping Bag Badge */}
                      <motion.div
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                        whileHover={{ scale: 1.15, rotate: -8 }}
                        className="absolute bottom-0 left-8 z-10 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full bg-indigo-500 text-white border-2 border-white shadow-md flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xl font-semibold tracking-tight">
                        Your store is live on the network
                      </h3>
                      <p className={`text-xs mt-1 max-w-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                        All cloud services, database tables, and point-of-sale terminals are ready.
                      </p>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2.5 ${
                      isDark
                        ? "bg-neutral-900/60 border-neutral-800"
                        : "bg-neutral-50 border-neutral-200/80"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`text-[11px] uppercase tracking-wider font-semibold ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                        Store Details
                      </span>
                      <span className="text-emerald-500 flex items-center gap-1.5 text-xs font-medium">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>Ready</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{storeFlag}</span>
                        <div>
                          <div className="text-xs font-semibold">{storeName}</div>
                          <div className={`text-[11px] ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                            {storeLocation} &middot; {currency.code} ({currency.symbol})
                          </div>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs ${
                          isDark
                            ? "bg-neutral-800 text-neutral-300"
                            : "bg-neutral-200/70 text-neutral-700"
                        }`}
                      >
                        {category}
                      </span>
                    </div>

                    <div
                      className={`pt-2 border-t flex items-center justify-between text-xs ${
                        isDark ? "border-neutral-800 text-neutral-400" : "border-neutral-200/60 text-neutral-500"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Globe className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                        <span className="font-mono text-amber-500 font-medium truncate">
                          {fullDomain}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("form");
                        setCompletedSteps([]);
                        setActiveStepIndex(0);
                      }}
                      className={`px-4 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isDark
                          ? "text-neutral-400 hover:text-white"
                          : "text-neutral-600 hover:text-neutral-950"
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Create Another</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleFinish}
                      className={`group flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shadow-md ${
                        isDark
                          ? "bg-white text-neutral-950 hover:bg-neutral-200 active:scale-95 shadow-white/10"
                          : "bg-neutral-950 text-white hover:bg-neutral-800 active:scale-95 shadow-neutral-950/20"
                      }`}
                    >
                      <span>Switch to New Store</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
