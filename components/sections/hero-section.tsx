"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Right Side Visual Elements - 2 Columns */}
      {mounted && (
        <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 hidden md:flex gap-4 items-center">
          {/* Column 1 - Moving Down */}
          <div className="relative h-72 overflow-hidden">
            {/* Top Gradient Fade */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex flex-col items-center gap-4"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "linear",
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex flex-col items-center gap-4">
                  {/* Orange Capsule Large */}
                  <div className="w-9 h-24 rounded-full border-2 border-orange-500 flex flex-col items-center justify-between py-4">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <div className="w-2 h-2 rounded-full bg-orange-500/50" />
                  </div>

                  {/* Dashed Line */}
                  <div className="w-[1px] h-10 border-l border-dashed border-neutral-700" />

                  {/* Orange Dot */}
                  <div className="w-3 h-3 rounded-full bg-orange-500" />

                  {/* Small Gray Capsule */}
                  <div className="w-7 h-16 rounded-full border border-neutral-600 flex flex-col items-center justify-between py-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  </div>

                  {/* Gap */}
                  <div className="h-6" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Column 2 - Moving Up */}
          <div className="relative h-72 overflow-hidden">
            {/* Top Gradient Fade */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ y: "-50%" }}
              animate={{ y: "0%" }}
              transition={{ 
                duration: 18, 
                repeat: Infinity, 
                ease: "linear",
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex flex-col items-center gap-4">
                  {/* Small Capsule */}
                  <div className="w-6 h-12 rounded-full border border-neutral-700 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                  </div>

                  {/* Dashed Line */}
                  <div className="w-[1px] h-8 border-l border-dashed border-neutral-700" />

                  {/* Dots Group */}
                  <div className="flex flex-col gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-neutral-600" />
                    <div className="w-2 h-2 rounded-full bg-neutral-500" />
                  </div>

                  {/* Gray Capsule */}
                  <div className="w-7 h-20 rounded-full border border-neutral-600 flex flex-col items-center justify-between py-3">
                    <div className="w-2 h-2 rounded-full bg-neutral-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                  </div>

                  {/* Dashed Line */}
                  <div className="w-[1px] h-6 border-l border-dashed border-neutral-800" />

                  {/* Small Dot */}
                  <div className="w-2 h-2 rounded-full bg-neutral-600" />

                  {/* Gap */}
                  <div className="h-4" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-[clamp(3.5rem,12vw,7rem)] font-medium leading-[0.85] tracking-tight">
            <span className="block text-white">AI/ML</span>
            <span className="block text-neutral-500">Engineer</span>
          </h1>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 mb-8"
        >
          <p className="text-xl sm:text-2xl text-neutral-400 font-light tracking-wide">
            Zidan Mubarak
          </p>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-neutral-400">Available for opportunities</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg text-neutral-500 max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Building intelligent systems with machine learning. 
          Solving real-world problems through data-driven solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group px-8 py-3.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Projects
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3.5 border border-neutral-700 text-white text-sm font-medium rounded-lg hover:border-neutral-500 hover:bg-neutral-900/50 transition-all duration-300"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center gap-5"
        >
          <a
            href="https://github.com/zidanmubarak"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-neutral-600 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/zidan-mubarak/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-neutral-600 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:zidanmubarak00@gmail.com"
            className="p-3 text-neutral-600 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-neutral-600 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-neutral-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}