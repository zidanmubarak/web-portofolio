"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Coffee,
  Code,
  Sparkles,
} from "lucide-react";

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "dashboard", label: "Dashboard" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = navigationItems.map((item) => item.id);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMenuOpen(false);

      setTimeout(() => {
        const headerHeight = 80;
        const elementTop = element.offsetTop - headerHeight;

        window.scrollTo({
          top: elementTop,
          behavior: "smooth",
        });

        setActiveSection(sectionId);
      }, 100);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Modern Logo */}
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Code className="h-6 w-6 text-white" />
                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </div>
            </div>

            {/* Brand Name */}
            <div className="hidden sm:block">
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Zidan Mubarak
              </motion.h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400 font-medium">
                  AI/ML Engineer
                </span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 bg-slate-900/50 backdrop-blur-lg rounded-2xl p-2 border border-slate-700/50">
              {navigationItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavItem"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </nav>

          {/* Social Links & Actions */}
          <div className="flex items-center space-x-3">
            {/* Social Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2.5 hover:bg-slate-800/50 hover:text-blue-400 rounded-xl transition-all duration-300 group"
                  asChild
                >
                  <a
                    href="https://github.com/zidanmubarak"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2.5 hover:bg-slate-800/50 hover:text-blue-400 rounded-xl transition-all duration-300 group"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/zidan-mubarak/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  asChild
                >
                  <a
                    href="https://github.com/sponsors/zidanmubarak"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Coffee className="mr-2 h-3 w-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Sponsor</span>
                    <Sparkles className="ml-1 h-3 w-3 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2.5 hover:bg-slate-800/50 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
            display: isMenuOpen ? "block" : "none",
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="md:hidden overflow-hidden fixed top-20 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 z-50"
        >
          <div className="py-4 px-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                );
              })}
            </nav>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
