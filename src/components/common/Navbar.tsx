import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Linkedin,
  Twitter,
  Github,
  Home,
  User,
  Terminal,
  LayoutGrid,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import classNames from "classnames";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "/home", path: "/", icon: Home },
    { label: "/me", path: "/about", icon: User },
    { label: "/projects", path: "/projects", icon: Terminal },
    { label: "/explorations", path: "/explorations", icon: LayoutGrid },
    { label: "/blogs", path: "/blogs", icon: BookOpen },
    { label: "/contact", path: "/contact", icon: MessageSquare },
  ];

  const socialLinks = [
    {
      icon: <Github size={18} />,
      href: "https://github.com/Theadedamola",
      label: "GitHub",
    },
    {
      icon: <Twitter size={18} />,
      href: "https://x.com/Theadedamola_",
      label: "X",
    },
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/adedamola-alausa/",
      label: "LinkedIn",
    },
  ];

  const isDarkBg = isHome && !scrolled;
  const textColor = isDarkBg ? "text-white" : "text-black";
  const mutedTextColor = isDarkBg ? "text-gray-300" : "text-gray-500";
  const hoverTextColor = isDarkBg ? "hover:text-gray-200" : "hover:text-black";

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={classNames(
          "fixed top-0 left-0 right-0 z-40 px-6 md:px-12 transition-all duration-300",
          scrolled
            ? "py-3 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-neutral-200/60 shadow-xs"
            : "py-4 md:py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className={classNames(
              "hover:opacity-80 transition-opacity flex items-center gap-2",
              textColor
            )}
            aria-label="Home"
          >
            <Logo className={classNames("w-8 h-8 md:w-9 md:h-9", textColor)} />
          </NavLink>

          {/* Desktop Nav Links (Hidden on small screens) */}
          <div className="hidden lg:flex flex-wrap gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  classNames(
                    "font-mono text-sm transition-colors flex items-center gap-1",
                    isActive
                      ? `${textColor} font-medium`
                      : `${mutedTextColor} ${hoverTextColor}`
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(
                  "transition-colors",
                  textColor,
                  isDarkBg ? "hover:text-gray-300" : "hover:text-gray-600"
                )}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Floating Island Dock for Small Screens (< lg) */}
      <div className="lg:hidden fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-neutral-200/90 shadow-xl shadow-neutral-900/10 select-none">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-transform active:scale-90"
                aria-label={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMobileDockBubble"
                    className="absolute inset-0 rounded-full bg-neutral-950 shadow-md"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 30,
                    }}
                  />
                )}
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.2 : 1.75}
                  className={classNames(
                    "relative z-10 transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : "text-neutral-500 hover:text-neutral-900"
                  )}
                />
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
