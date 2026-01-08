import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Linkedin, Twitter, Github } from "lucide-react";
import classNames from "classnames";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "/home", path: "/" },
    { label: "/me", path: "/about" },
    { label: "/projects", path: "/projects" },
    { label: "/explorations", path: "/explorations" },
    { label: "/blogs", path: "/blogs" },
    // { label: '/résumé', path: '/resume', isLocked: true },
    { label: "/contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <Github size={18} />,
      href: "https://github.com/Theadedamola",
      label: "GitHub",
    }, // Placeholder for the book icon
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

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 py-8 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <NavLink
            to="/"
            className="text-black hover:opacity-80 transition-opacity"
          >
            <Logo className="w-10 h-10 md:w-12 md:h-12 text-black" />
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-wrap gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                classNames(
                  "font-mono text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1",
                  { "text-black font-medium": isActive },
                )
              }
            >
              {item.label}
              {/* {item.isLocked && <Lock size={12} className="opacity-60" />} */}
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
              className="text-black hover:text-gray-600 transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                classNames(
                  "font-mono text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-2 py-2",
                  { "text-black font-medium": isActive },
                )
              }
            >
              {item.label}
              {/* {item.isLocked && <Lock size={12} />} */}
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
