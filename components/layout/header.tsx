"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, FileText, Download, ExternalLink } from "lucide-react";
import Image from "next/image";

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "dashboard", label: "Dashboard" },
  { id: "contact", label: "Contact" },
];

// Google Docs CV URLs
const GOOGLE_DOC_ID = "1B3Lv2ZyZuLOva0zn8Y4hWBECGRSaAdYBpVMW1La75Xs";
const CV_PREVIEW_URL = `https://docs.google.com/document/d/${GOOGLE_DOC_ID}/preview`;
const CV_DOWNLOAD_URL = `https://docs.google.com/document/d/${GOOGLE_DOC_ID}/export?format=pdf`;
const CV_VIEW_URL = `https://docs.google.com/document/d/${GOOGLE_DOC_ID}/view`;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isCvPopupOpen, setIsCvPopupOpen] = useState(false);

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

      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMenuOpen(false);
      const headerHeight = 80;
      const elementTop = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementTop, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleDownloadCV = () => {
    window.open(CV_DOWNLOAD_URL, "_blank");
  };

  const handleOpenInDocs = () => {
    window.open(CV_VIEW_URL, "_blank");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-neutral-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/profil/logo.png"
                alt="ZM Logo"
                width={36}
                height={36}
                className="rounded-md"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "text-white bg-neutral-800/50"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/30"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Social links - desktop */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href="https://github.com/zidanmubarak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/zidan-mubarak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              {/* Hire Me button - desktop */}
              <button
                onClick={() => setIsCvPopupOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Hire Me
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-neutral-800"
            >
              <div className="px-6 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "text-white bg-neutral-800"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setIsCvPopupOpen(true)}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-black bg-white rounded-lg mt-4"
                >
                  <FileText className="w-4 h-4" />
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-neutral-900 rounded-xl shadow-2xl border border-neutral-800 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <div>
                  <h2 className="text-xl font-medium text-white">
                    Zidan Mubarak
                  </h2>
                  <p className="text-sm text-neutral-400">AI/ML Engineer</p>
                </div>
                <button
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                  onClick={() => setIsCvPopupOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CV Preview */}
              <div className="p-6">
                <div className="bg-neutral-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white">
                      CV Preview
                    </h3>
                    <span className="text-xs text-neutral-500 px-2 py-1 bg-neutral-700 rounded">
                      Google Docs
                    </span>
                  </div>

                  <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden">
                    <iframe
                      src={CV_PREVIEW_URL}
                      className="w-full h-full"
                      title="CV Preview"
                      allow="autoplay"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadCV}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-black bg-white font-medium rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={handleOpenInDocs}
                    className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-neutral-800 font-medium rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in Docs
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
