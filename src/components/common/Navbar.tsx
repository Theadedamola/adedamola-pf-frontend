import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Linkedin, Twitter, Github } from "lucide-react";
import classNames from "classnames";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
    { label: "/home", path: "/" },
    { label: "/me", path: "/about" },
    { label: "/projects", path: "/projects" },
    { label: "/explorations", path: "/explorations" },
    { label: "/blogs", path: "/blogs" },
    { label: "/contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <Github size={18} />,
      href: "https://github.com/Theadedamola",
      label: "GitHub",
    },
    {
      icon: <Twitter size={18} />,
      href: "https://twitter.com/Theadedamola_",
      label: "X",
    },
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/adedamola-alausa/",
      label: "LinkedIn",
    },
  ];

  // If we are at the top of the home page, the text should be white to contrast with the dark hero overlay.
  // Otherwise, or if scrolled, it's black.
  const isDarkBg = isHome && !scrolled;
  const textColor = isDarkBg ? "text-white" : "text-black";
  const mutedTextColor = isDarkBg ? "text-gray-300" : "text-gray-500";
  const hoverTextColor = isDarkBg ? "hover:text-gray-200" : "hover:text-black";

  return (
    <nav 
      className={classNames(
        "fixed top-0 left-0 right-0 z-50 py-8 px-6 md:px-12 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className={classNames("lg:hidden p-2 -ml-2", textColor)}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <NavLink
            to="/"
            className={classNames("hover:opacity-80 transition-opacity", textColor)}
          >
            <Logo className={classNames("w-10 h-10 md:w-12 md:h-12", textColor)} />
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-wrap gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                classNames(
                  "font-mono text-sm transition-colors flex items-center gap-1",
                  isActive ? `${textColor} font-medium` : `${mutedTextColor} ${hoverTextColor}`
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Social Icons */}
        <div className="hidden md:flex items-center gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classNames("transition-colors", textColor, isDarkBg ? "hover:text-gray-300" : "hover:text-gray-600")}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                classNames(
                  "font-mono text-sm transition-colors flex items-center gap-2 py-2",
                  isActive ? "text-black font-medium" : "text-gray-500 hover:text-black"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-black hover:text-gray-600"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
