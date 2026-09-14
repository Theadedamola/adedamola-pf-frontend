import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftRight,
  Plus,
  Settings,
  Layers,
  Edit3,
  Gauge,
  Users,
  Box,
  BarChart2,
  Receipt,
  ShoppingCart,
  CreditCard,
  Check,
  Search,
  Sparkles,
  Sliders,
  Share2,
  PanelLeftClose,
  PanelLeft,
  Sun,
  Moon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

type ThemeMode = "light" | "dark";
type SidebarState = "expanded" | "collapsed";
type LineStyle = "squiggly" | "curved";

interface Store {
  id: string;
  name: string;
  domain: string;
  location: string;
  flag: string;
}

const STORES: Store[] = [
  {
    id: "soho",
    name: "Apex SoHo Flagship",
    domain: "store.apex-retail.io/soho",
    location: "New York, USA",
    flag: "🇺🇸",
  },
  {
    id: "mayfair",
    name: "Apex Mayfair Boutique",
    domain: "store.apex-retail.io/mayfair",
    location: "London, UK",
    flag: "🇬🇧",
  },
  {
    id: "shibuya",
    name: "Apex Shibuya Atelier",
    domain: "store.apex-retail.io/shibuya",
    location: "Tokyo, Japan",
    flag: "🇯🇵",
  },
  {
    id: "marais",
    name: "Apex Le Marais Studio",
    domain: "store.apex-retail.io/marais",
    location: "Paris, France",
    flag: "🇫🇷",
  },
];

interface SubItem {
  id: string;
  label: string;
  count?: number;
}

const NAV_ITEMS: (
  | { type: "item"; id: string; label: string; icon: typeof Box; count?: number }
  | { type: "group"; id: string; label: string; icon: typeof Box; hasAdd?: boolean; subItems: SubItem[] }
)[] = [
  { type: "item", id: "products", label: "Products", icon: Box },
  { type: "item", id: "analytics", label: "Analytics", icon: BarChart2 },
  { type: "item", id: "transactions", label: "Transactions", icon: Receipt },
  { type: "item", id: "orders", label: "Orders", icon: ShoppingCart },
  { type: "item", id: "subscribers", label: "Subscribers", icon: Users },
  { type: "item", id: "payouts", label: "Payouts", icon: CreditCard },
  {
    type: "group",
    id: "posts",
    label: "Posts",
    icon: Edit3,
    hasAdd: true,
    subItems: [
      { id: "drafts", label: "Drafts", count: 10 },
      { id: "scheduled", label: "Scheduled", count: 2 },
      { id: "published", label: "Published", count: 28 },
    ],
  },
  {
    type: "group",
    id: "inventory",
    label: "Store Catalog",
    icon: Layers,
    hasAdd: true,
    subItems: [
      { id: "stock-transfers", label: "Store Transfers", count: 4 },
      { id: "barcode-audits", label: "Barcode Audits" },
      { id: "low-stock", label: "Low Stock Alerts", count: 8 },
    ],
  },
  {
    type: "group",
    id: "channels",
    label: "Sales Channels",
    icon: Share2,
    hasAdd: false,
    subItems: [
      { id: "pos-lanes", label: "In-Store POS Lanes", count: 6 },
      { id: "online-store", label: "Online Storefront" },
      { id: "marketplace", label: "External B2B Feeds" },
    ],
  },
  { type: "item", id: "performance", label: "Performance", icon: Gauge },
  { type: "item", id: "team", label: "Team management", icon: Users },
  { type: "item", id: "customize", label: "Customize", icon: Sliders },
];

export default function StoreErpSidebarShot() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [sidebarState, setSidebarState] = useState<SidebarState>("expanded");
  const [lineStyle, setLineStyle] = useState<LineStyle>("squiggly");
  const [activeItem, setActiveItem] = useState("analytics");
  const [activeStore, setActiveStore] = useState<Store>(STORES[0]);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [storeSearch, setStoreSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    posts: true,
    inventory: true,
    channels: false,
  });

  const isDark = theme === "dark";
  const isCollapsed = sidebarState === "collapsed";

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const filteredStores = STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
      s.location.toLowerCase().includes(storeSearch.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarState((prev) => (prev === "expanded" ? "collapsed" : "expanded"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`w-full h-screen overflow-hidden flex flex-col font-sans transition-colors duration-300 ${
        isDark ? "bg-[#141518]" : "bg-[#ECECEE]"
      }`}
    >
      {/* Top Floating Workbench Controls */}
      <div className="h-12 px-6 border-b flex items-center justify-between shrink-0 select-none z-30 transition-colors duration-300 backdrop-blur-md bg-black/5 dark:bg-black/20 border-black/5 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono font-semibold tracking-wider uppercase ${isDark ? "text-white" : "text-neutral-900"}`}>
            Store ERP &middot; Spatial Sidebar
          </span>
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${isDark ? "bg-neutral-800 text-neutral-300" : "bg-white text-neutral-600 shadow-xs"}`}>
            {activeStore.name}
          </span>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Connector Line Style */}
          <button
            onClick={() => setLineStyle((prev) => (prev === "squiggly" ? "curved" : "squiggly"))}
            className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
              lineStyle === "squiggly"
                ? isDark
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
                : isDark
                ? "bg-neutral-800/60 text-neutral-400 border-neutral-700/60 hover:text-white"
                : "bg-white text-neutral-600 border-neutral-200 hover:text-black"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span className="capitalize">Lines: {lineStyle}</span>
          </button>

          {/* Sidebar State: Expanded vs Icon-Only */}
          <div className={`flex items-center p-0.5 rounded-full border ${isDark ? "bg-neutral-900 border-neutral-700/60" : "bg-white border-neutral-200"}`}>
            <button
              onClick={() => setSidebarState("expanded")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                sidebarState === "expanded"
                  ? isDark
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "bg-neutral-900 text-white font-semibold shadow-xs"
                  : isDark
                  ? "text-neutral-400 hover:text-white"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Expanded
            </button>
            <button
              onClick={() => setSidebarState("collapsed")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                sidebarState === "collapsed"
                  ? isDark
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "bg-neutral-900 text-white font-semibold shadow-xs"
                  : isDark
                  ? "text-neutral-400 hover:text-white"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Icon Only
            </button>
          </div>

          {/* Theme Toggle: Light vs Dark */}
          <div className={`flex items-center p-0.5 rounded-full border ${isDark ? "bg-neutral-900 border-neutral-700/60" : "bg-white border-neutral-200"}`}>
            <button
              onClick={() => setTheme("light")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                !isDark
                  ? "bg-neutral-900 text-white font-semibold shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                isDark
                  ? "bg-white text-black font-semibold shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Area (Sidebar + Clean Skeleton Dashboard) */}
      <div className="flex-1 flex overflow-hidden p-3 sm:p-5 gap-4 sm:gap-6">
        {/* ===================================================================== */}
        {/* THE FLOATING ROUNDED SIDEBAR (EXACT MATCH TO REFERENCE) */}
        {/* ===================================================================== */}
        <motion.aside
          animate={{
            width: isCollapsed ? 68 : 260,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 32,
          }}
          className={`h-full rounded-[26px] flex flex-col justify-between select-none shrink-0 relative overflow-hidden transition-colors duration-300 shadow-2xl ${
            isDark
              ? "bg-[#0C0D0E] text-white border border-neutral-800/80 shadow-black/50"
              : "bg-white text-neutral-900 border border-neutral-200/90 shadow-neutral-900/5"
          }`}
        >
          {/* Top Section: Open/Close Toggle & Header */}
          <div className="shrink-0">
            {/* Sidebar Open / Close Toggle Button */}
            <div className={`pt-3.5 px-3.5 pb-1 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
              <button
                onClick={() => setSidebarState((prev) => (prev === "expanded" ? "collapsed" : "expanded"))}
                className={`p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                  isDark
                    ? "text-neutral-400 hover:text-white hover:bg-neutral-800/70"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
                title={isCollapsed ? "Expand sidebar (⌘B)" : "Collapse sidebar (⌘B)"}
              >
                {isCollapsed ? (
                  <PanelLeft className="w-4 h-4" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </button>

              {!isCollapsed && (
                <span className={`text-[10px] font-mono select-none ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                  ⌘B
                </span>
              )}
            </div>

            {/* Store Branding Header (Exact Reference Match) */}
            <div className="px-3 pt-1 pb-2">
              <div className="flex items-center gap-2.5 p-1 rounded-xl">
                {/* Square Geometric Logo Box */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
                    isDark ? "bg-white text-black" : "bg-neutral-950 text-white"
                  }`}
                >
                  <Box className="w-5 h-5" />
                </div>

                {!isCollapsed && (
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold tracking-tight truncate ${isDark ? "text-white" : "text-neutral-900"}`}>
                        {activeStore.name}
                      </span>
                      <div className="flex flex-col text-neutral-400 opacity-60">
                        <span className="text-[9px] leading-none">▲</span>
                        <span className="text-[9px] leading-none">▼</span>
                      </div>
                    </div>
                    <div className={`text-[10px] font-mono truncate ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      {activeStore.domain}
                    </div>
                  </div>
                )}
              </div>

              {/* "⇄ Switch stores" Action Row */}
              {!isCollapsed && (
                <div className="mt-2 pt-1 relative">
                  <button
                    onClick={() => setStoreModalOpen(!storeModalOpen)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isDark
                        ? "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
                        : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                    }`}
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 opacity-70" />
                    <span>Switch stores</span>
                  </button>

                  {/* Store Switcher Dropdown Modal */}
                  <AnimatePresence>
                    {storeModalOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setStoreModalOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ duration: 0.16 }}
                          className={`absolute top-full left-0 right-0 mt-1.5 p-2 rounded-2xl border z-50 shadow-2xl ${
                            isDark
                              ? "bg-[#14161A] border-neutral-800 text-white shadow-black/80"
                              : "bg-white border-neutral-200 text-neutral-900 shadow-neutral-900/15"
                          }`}
                        >
                          <div className="px-2 py-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                            <span>Your Stores ({STORES.length})</span>
                          </div>

                          <div className="relative mb-2 px-1">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-2 text-neutral-400 pointer-events-none" />
                            <input
                              type="text"
                              value={storeSearch}
                              onChange={(e) => setStoreSearch(e.target.value)}
                              placeholder="Filter stores..."
                              className={`w-full pl-7 pr-2.5 py-1 rounded-lg text-xs outline-hidden border ${
                                isDark
                                  ? "bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500"
                                  : "bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400"
                              }`}
                            />
                          </div>

                          <div className="space-y-1">
                            {filteredStores.map((store) => {
                              const isCurrent = store.id === activeStore.id;
                              return (
                                <button
                                  key={store.id}
                                  onClick={() => {
                                    setActiveStore(store);
                                    setStoreModalOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                                    isCurrent
                                      ? isDark
                                        ? "bg-neutral-800/80 font-semibold text-white"
                                        : "bg-neutral-100 font-semibold text-neutral-900"
                                      : isDark
                                      ? "hover:bg-neutral-800/40 text-neutral-300"
                                      : "hover:bg-neutral-50 text-neutral-700"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <span>{store.flag}</span>
                                    <div className="truncate">
                                      <div className="truncate">{store.name}</div>
                                      <div className={`text-[10px] font-mono ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                                        {store.location}
                                      </div>
                                    </div>
                                  </div>
                                  {isCurrent && <Check className="w-3.5 h-3.5 shrink-0 ml-1.5 opacity-80" />}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Middle Navigation Section (Scrollable with squiggly subsections) */}
          <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5 scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              // 1. FLAT ITEM (Products, Analytics, Transactions, Orders, Subscribers, Payouts)
              if (item.type === "item") {
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full flex items-center ${
                      isCollapsed ? "justify-center px-0 py-2.5" : "justify-between px-3 py-2"
                    } rounded-xl text-xs transition-colors cursor-pointer ${
                      isActive
                        ? isDark
                          ? "bg-neutral-800/90 text-white font-semibold"
                          : "bg-neutral-100 text-neutral-950 font-semibold shadow-xs"
                        : isDark
                        ? "text-neutral-400 hover:text-white hover:bg-neutral-900/80"
                        : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50"
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? (isDark ? "text-white" : "text-neutral-900") : "opacity-75"}`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.count && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          isDark ? "bg-neutral-800 text-neutral-300" : "bg-neutral-200/80 text-neutral-700"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              }

              // 2. ACCORDION GROUP WITH SQUIGGLY / CURVED CONNECTORS (Posts, Store Catalog, Channels)
              const isOpen = expandedGroups[item.id];
              return (
                <div key={item.id} className="pt-1">
                  {/* Parent Group Header */}
                  <div
                    onClick={() => {
                      if (isCollapsed) {
                        setSidebarState("expanded");
                        setExpandedGroups((prev) => ({ ...prev, [item.id]: true }));
                      } else {
                        toggleGroup(item.id);
                      }
                    }}
                    className={`w-full flex items-center ${
                      isCollapsed ? "justify-center px-0 py-2.5" : "justify-between px-3 py-2"
                    } rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                      isDark
                        ? "text-neutral-400 hover:text-white hover:bg-neutral-900/80"
                        : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50"
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className="w-4 h-4 shrink-0 opacity-75" />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.hasAdd && (
                      <Plus className="w-3.5 h-3.5 opacity-50 hover:opacity-100 transition-opacity" />
                    )}
                  </div>

                  {/* Subsections with squiggly / curved tree branch lines */}
                  {!isCollapsed && isOpen && item.subItems && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-7 pr-2 py-0.5 space-y-0.5 relative"
                    >
                      {item.subItems.map((sub, idx) => {
                        const isSubActive = activeItem === sub.id;
                        const isLast = idx === item.subItems!.length - 1;

                        return (
                          <div key={sub.id} className="relative flex items-center">
                            {/* SVG Tree Connector Branch (Squiggly or Curved) */}
                            <svg
                              className="absolute left-[-16px] w-4 h-7 pointer-events-none overflow-visible"
                              viewBox="0 0 16 28"
                              fill="none"
                            >
                              {/* Vertical Trunk Line */}
                              <line
                                x1="2"
                                y1="0"
                                x2="2"
                                y2={isLast ? "14" : "28"}
                                stroke={isDark ? "#26292E" : "#E2E4E8"}
                                strokeWidth="1.25"
                              />

                              {/* Branch to Child */}
                              {lineStyle === "squiggly" ? (
                                // Squiggly S-curve Wave
                                <path
                                  d="M 2 14 Q 5 10, 8 14 Q 11 18, 15 14"
                                  stroke={
                                    isSubActive
                                      ? isDark
                                        ? "#FFFFFF"
                                        : "#111827"
                                      : isDark
                                      ? "#343840"
                                      : "#CBD0D8"
                                  }
                                  strokeWidth={isSubActive ? "1.75" : "1.25"}
                                  strokeLinecap="round"
                                  fill="none"
                                />
                              ) : (
                                // Smooth Curved Bezier
                                <path
                                  d="M 2 0 V 8 Q 2 14 8 14 H 15"
                                  stroke={
                                    isSubActive
                                      ? isDark
                                        ? "#FFFFFF"
                                        : "#111827"
                                      : isDark
                                      ? "#343840"
                                      : "#CBD0D8"
                                  }
                                  strokeWidth={isSubActive ? "1.75" : "1.25"}
                                  strokeLinecap="round"
                                  fill="none"
                                />
                              )}

                              {/* Active Pulse Dot on endpoint */}
                              {isSubActive && (
                                <circle
                                  cx="15"
                                  cy="14"
                                  r="2"
                                  fill={isDark ? "#FFFFFF" : "#111827"}
                                />
                              )}
                            </svg>

                            {/* Subsection Link Button */}
                            <button
                              onClick={() => setActiveItem(sub.id)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                                isSubActive
                                  ? isDark
                                    ? "text-white font-semibold"
                                    : "text-neutral-950 font-semibold"
                                  : isDark
                                  ? "text-neutral-400 hover:text-neutral-200"
                                  : "text-neutral-500 hover:text-neutral-900"
                              }`}
                            >
                              <span className="truncate">{sub.label}</span>
                              {sub.count !== undefined && (
                                <span
                                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                                    isDark
                                      ? "bg-neutral-800 text-neutral-300"
                                      : "bg-neutral-100 text-neutral-700 border border-neutral-200/70"
                                  }`}
                                >
                                  {sub.count}
                                </span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Fixed Area: Theme Change & Settings */}
          <div className="p-3 border-t shrink-0 transition-colors border-neutral-200/60 dark:border-neutral-800/60">
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-1.5 text-neutral-400">
                <button
                  onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isDark ? "hover:text-white hover:bg-neutral-800/70" : "hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                  title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
                </button>

                <button
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isDark ? "hover:text-white hover:bg-neutral-800/70" : "hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                  title="Store Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isDark
                      ? "text-neutral-300 hover:text-white hover:bg-neutral-800/70"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                  title={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-700" />}
                  <span>{isDark ? "Light mode" : "Dark mode"}</span>
                </button>

                <button
                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                    isDark ? "text-neutral-400 hover:text-white hover:bg-neutral-800/70" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                  title="Store Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.aside>

        {/* ===================================================================== */}
        {/* RIGHT SIDE: CLEAN SKELETON LOADER DASHBOARD (EXACTLY AS REQUESTED) */}
        {/* ===================================================================== */}
        <main
          className={`flex-1 h-full rounded-[26px] p-6 sm:p-10 overflow-y-auto transition-colors duration-300 border shadow-sm ${
            isDark
              ? "bg-[#0C0D0E] border-neutral-800/80 text-white"
              : "bg-white border-neutral-200/90 text-neutral-900"
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
            {/* Top Breadcrumbs & Page Header Skeleton */}
            <div className="space-y-3 pb-6 border-b transition-colors border-neutral-200/60 dark:border-neutral-800/60">
              {/* Explicitly themed breadcrumb */}
              <div className="flex items-center gap-2">
                <div className={`h-3 w-16 rounded-md ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
                <span className={`text-xs ${isDark ? "text-neutral-600" : "text-neutral-300"}`}>/</span>
                <div className={`h-3 w-24 rounded-md ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
                <span className={`text-xs ${isDark ? "text-neutral-600" : "text-neutral-300"}`}>/</span>
                <div className={`h-3 w-20 rounded-md ${isDark ? "bg-neutral-700" : "bg-neutral-300"}`} />
              </div>

              {/* Explicitly themed main title */}
              <div className="flex items-center justify-between pt-1">
                <div className={`h-8 w-56 rounded-xl ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-28 rounded-xl ${isDark ? "bg-neutral-850 bg-neutral-800" : "bg-neutral-100"}`} />
                  <div className={`h-8 w-20 rounded-xl ${isDark ? "bg-neutral-850 bg-neutral-800" : "bg-neutral-100"}`} />
                </div>
              </div>
            </div>

            {/* 3 Metric Summary Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className={`p-5 rounded-2xl border transition-colors space-y-3 ${
                    isDark
                      ? "bg-neutral-900/40 border-neutral-800/70"
                      : "bg-neutral-50/70 border-neutral-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`h-3 w-24 rounded-md ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
                    <div className={`w-6 h-6 rounded-lg ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
                  </div>
                  <div className={`h-7 w-32 rounded-lg ${isDark ? "bg-neutral-700" : "bg-neutral-300"}`} />
                  <div className={`h-2.5 w-20 rounded-md ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
                </div>
              ))}
            </div>

            {/* Large Wave Chart Skeleton Frame */}
            <div
              className={`p-6 rounded-2xl border transition-colors space-y-6 ${
                isDark
                  ? "bg-neutral-900/40 border-neutral-800/70"
                  : "bg-neutral-50/70 border-neutral-200/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className={`h-4 w-40 rounded-md ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
                  <div className={`h-2.5 w-60 rounded-md ${isDark ? "bg-neutral-850 bg-neutral-800" : "bg-neutral-200/80"}`} />
                </div>
                <div className={`h-6 w-24 rounded-full ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
              </div>

              {/* Minimalist SVG Chart Skeleton lines */}
              <div className="h-44 w-full flex items-end justify-between gap-3 pt-6 px-2">
                {[45, 60, 35, 75, 50, 90, 65, 80, 55, 95, 70, 85].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      style={{ height: `${height}%` }}
                      className={`w-full rounded-t-md transition-all ${
                        isDark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"
                      }`}
                    />
                    <div className={`h-2 w-4 rounded-xs ${isDark ? "bg-neutral-850 bg-neutral-800" : "bg-neutral-200"}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Feed Skeleton Rows */}
            <div
              className={`p-6 rounded-2xl border transition-colors space-y-4 ${
                isDark
                  ? "bg-neutral-900/40 border-neutral-800/70"
                  : "bg-neutral-50/70 border-neutral-200/80"
              }`}
            >
              <div className={`h-3.5 w-36 rounded-md ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
              <div className="space-y-2.5 pt-1">
                {[1, 2, 3].map((row) => (
                  <div
                    key={row}
                    className={`h-11 rounded-xl p-3 flex items-center justify-between ${
                      isDark ? "bg-neutral-800/40" : "bg-white border border-neutral-200/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-md ${isDark ? "bg-neutral-700" : "bg-neutral-200"}`} />
                      <div className={`h-3 w-40 rounded-md ${isDark ? "bg-neutral-700" : "bg-neutral-200"}`} />
                    </div>
                    <div className={`h-3 w-20 rounded-md ${isDark ? "bg-neutral-700" : "bg-neutral-200"}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
