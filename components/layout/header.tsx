"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Download,
  FileText,
  Code,
  Sparkles,
  ArrowUp,
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
  const [isCvPopupOpen, setIsCvPopupOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
      setShowBackToTop(window.scrollY > 300);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/files/Zidan_Mubarak_CV.pdf";
    link.download = "Zidan_Mubarak_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
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
                      className={`relative text-sm font-medium rounded-xl transition-all duration-300 ${
                        isActive
                          ? "px-4 py-2 text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
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
                    onClick={() => setIsCvPopupOpen(true)}
                  >
                    <FileText className="mr-2 h-3 w-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Hire Me!</span>
                    <Sparkles className="ml-1 h-3 w-3 group-hover:scale-110 transition-transform" />
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

                {/* Mobile Hire Me Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => setIsCvPopupOpen(true)}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-white border border-pink-500/30 hover:from-pink-500/30 hover:to-violet-500/30 flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Hire Me!</span>
                    <Sparkles className="h-3 w-3 ml-auto" />
                  </button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 0.5,
            }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40"
          >
            <Button
              onClick={scrollToTop}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 hover:from-pink-600 hover:via-purple-600 hover:to-violet-600 text-white rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 group relative overflow-hidden border border-white/10 backdrop-blur-sm"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 scale-150 group-hover:scale-100" />

              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full"
                  animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="absolute top-3 right-3 w-0.5 h-0.5 bg-white/40 rounded-full"
                  animate={{ y: [0, -3, 0], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white/50 rounded-full"
                  animate={{ y: [0, -2, 0], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                />
              </div>

              {/* Main icon with enhanced animation */}
              <motion.div
                className="relative z-10"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
              </motion.div>

              {/* Enhanced tooltip */}
              <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-slate-900/95 backdrop-blur-sm text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none border border-slate-700/50 shadow-xl">
                <span className="flex items-center gap-2">
                  <ArrowUp className="h-3 w-3" />
                  Back to Top
                </span>
                <div className="absolute top-full right-5 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
              </div>

              {/* Scroll progress indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-slate-600"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-pink-400"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="100, 100"
                    strokeDashoffset="25"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CV Popup Modal */}
      <AnimatePresence>
        {isCvPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setIsCvPopupOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              className="relative bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Zidan Mubarak CV
                    </h2>
                    <p className="text-sm text-slate-400">AI/ML Engineer</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-slate-800/50 rounded-xl"
                  onClick={() => setIsCvPopupOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* CV Preview */}
              <div className="p-6">
                <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Preview CV
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-green-500/20 text-green-400 border-green-500/30"
                    >
                      PDF Format
                    </Badge>
                  </div>

                  {/* CV Preview Frame */}
                  <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden border border-slate-600/50">
                    <iframe
                      src="/files/Zidan_Mubarak_CV.pdf#toolbar=0&navpanes=0&scrollbar=0"
                      className="w-full h-full"
                      title="CV Preview"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
                    onClick={handleDownloadCV}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
