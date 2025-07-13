"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Spline from "@splinetool/react-spline";
import {
  ArrowRight,
  Download,
  MapPin,
  Sparkles,
  Code,
  Brain,
  Zap,
  Github,
  Linkedin,
  Mail,
  Coffee,
  Terminal,
  Cpu,
  Database,
  Bot,
  CpuIcon,
  Rocket,
} from "lucide-react";

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const [particleTargetPositions, setParticleTargetPositions] = useState<
    Array<{ x: number; y: number }>
  >([]);
  const fullName = "Zidan Mubarak";

  const roles = ["AI/ML Engineer", "Python Enthusiast", "ML Project Builder"];

  const codeSnippets = [
    "import tensorflow as tf",
    "from sklearn import datasets",
    "def neural_network():",
    "model = tf.keras.Sequential()",
    "return predictions",
    "# Building the future with AI",
  ];

  // Tambahkan lebih banyak quotes AI/ML
  const aiQuotes = [
    "Neural Networks in Action",
    "Automate. Predict. Innovate.",
    "AI is not magic, it's mathematics",
    "From data to decision",
    "Deep Learning, Deep Impact",
    "Data is the new oil",
    "Smart solutions for a smarter world",
  ];

  // Pilih 7 quotes secara acak untuk orbit
  const [orbitQuotes, setOrbitQuotes] = useState<string[]>([]);
  useEffect(() => {
    const shuffled = aiQuotes.sort(() => 0.5 - Math.random());
    setOrbitQuotes(shuffled.slice(0, 6));
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullName.length) {
        setDisplayText(fullName.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleTimer);
  }, []);

  // Initialize particle positions after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const positions = codeSnippets.map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setParticleTargetPositions(positions);
    }
  }, []);

  // Untuk partikel acak, gunakan state dan inisialisasi di client
  const [particlePositions, setParticlePositions] = useState<
    Array<{ top: number; left: number }>
  >([]);
  useEffect(() => {
    const arr = Array.from({ length: 5 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setParticlePositions(arr);
  }, []);

  // Tambahkan state untuk cek client
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-32 bg-slate-950">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Render semua elemen acak dan Spline hanya di client */}
      {isClient && (
        <>
          {/* Floating Code Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {codeSnippets.map((code, index) => (
              <motion.div
                key={index}
                className="absolute text-blue-400/30 font-mono text-sm"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  x: particleTargetPositions[index]?.x || 0,
                  y: particleTargetPositions[index]?.y || 0,
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: index * 2,
                }}
              >
                {code}
              </motion.div>
            ))}
          </div>

          {/* Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-purple-500/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-cyan-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg"
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Main Heading */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
                <span className="block text-white">
                  Hi, I'm{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {displayText}
                    </span>
                    <motion.span
                      className="absolute -right-6 text-blue-400"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  </span>
                </span>
              </h1>

              {/* Animated Role */}
              <div className="h-16 flex items-center justify-center lg:justify-start">
                <motion.h2
                  key={currentRole}
                  className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[currentRole]}
                </motion.h2>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              I enjoy building intelligent systems that solve real-world
              problems using machine learning. My main focus is on data-driven
              solutions, especially in classification, recommendation systems,
              and computer vision.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection("projects")}
              >
                <Code className="mr-2 h-5 w-5" />
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start space-x-4"
            >
              <Button
                size="sm"
                variant="ghost"
                className="p-3 hover:bg-slate-800 hover:text-blue-400 rounded-xl transition-all duration-300 hover:scale-110"
                asChild
              >
                <a
                  href="https://github.com/zidanmubarak"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-3 hover:bg-slate-800 hover:text-blue-400 rounded-xl transition-all duration-300 hover:scale-110"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/zidan-mubarak/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-3 hover:bg-slate-800 hover:text-green-400 rounded-xl transition-all duration-300 hover:scale-110"
                asChild
              >
                <a href="mailto:zidanmubarak00@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-3 hover:bg-slate-800 hover:text-pink-400 rounded-xl transition-all duration-300 hover:scale-110"
                asChild
              >
                <a
                  href="https://github.com/sponsors/zidanmubarak"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Robot Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Orbit Quotes - 7 posisi mengelilingi robot */}
              {orbitQuotes[0] && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-10 text-blue-200 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-900/40 shadow-md backdrop-blur-md pointer-events-none select-none animate-float1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{ zIndex: 20 }}
                >
                  {orbitQuotes[0]}
                </motion.div>
              )}
              {orbitQuotes[1] && (
                <motion.div
                  className="absolute left-0 top-4 sm:top-8 text-purple-200 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-900/40 shadow-md backdrop-blur-md pointer-events-none select-none animate-float2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  style={{ zIndex: 20 }}
                >
                  {orbitQuotes[1]}
                </motion.div>
              )}
              {orbitQuotes[2] && (
                <motion.div
                  className="absolute right-0 top-8 sm:top-16 text-pink-200 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-pink-900/40 shadow-md backdrop-blur-md pointer-events-none select-none animate-float3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  style={{ zIndex: 20 }}
                >
                  {orbitQuotes[2]}
                </motion.div>
              )}
              {orbitQuotes[3] && (
                <motion.div
                  className="absolute left-0 bottom-12 sm:bottom-20 text-green-200 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-green-900/40 shadow-md backdrop-blur-md pointer-events-none select-none animate-float4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  style={{ zIndex: 20 }}
                >
                  {orbitQuotes[3]}
                </motion.div>
              )}
              {orbitQuotes[4] && (
                <motion.div
                  className="absolute right-0 bottom-10 sm:bottom-16 text-yellow-200 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-yellow-900/40 shadow-md backdrop-blur-md pointer-events-none select-none animate-float5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 1.3 }}
                  style={{ zIndex: 20 }}
                >
                  {orbitQuotes[4]}
                </motion.div>
              )}
              {orbitQuotes[5] && (
                <motion.div
                  className="absolute left-1/4 bottom-0 text-cyan-200 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-900/40 shadow-md backdrop-blur-md pointer-events-none select-none animate-float6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  style={{ zIndex: 20 }}
                >
                  {orbitQuotes[5]}
                </motion.div>
              )}
              {orbitQuotes[6] && (
                <motion.div
                  className="absolute right-1/4 bottom-0 text-indigo-200 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-indigo-900/40 shadow-md backdrop-blur-md pointer-events-none select-none animate-float7"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.7 }}
                  style={{ zIndex: 20 }}
                >
                  {orbitQuotes[6]}
                </motion.div>
              )}

              {/* Subtle Glow Effects */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <motion.div
                  className="w-full h-[300px] md:h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>

              {/* Responsive 3D Scene Container */}
              <motion.div
                className="relative w-full h-[220px] xs:h-[260px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl lg:rounded-[40px] overflow-hidden mx-auto"
                animate={{
                  y: [0, -10, 0],
                  boxShadow: [
                    "0 15px 30px -12px rgba(59, 130, 246, 0.1)",
                    "0 20px 40px -10px rgba(139, 92, 246, 0.2)",
                    "0 15px 30px -12px rgba(59, 130, 246, 0.1)",
                  ],
                }}
                transition={{
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  boxShadow: {
                    duration: 8,
                    repeat: Infinity,
                  },
                }}
              >
                {/* Spline 3D Scene */}
                {isClient && (
                  <Spline
                    scene="https://prod.spline.design/Tc0Gc71hFDDGgfR1/scene.splinecode"
                    className="w-full h-full"
                    // title="3D AI Assistant"
                  />
                )}

                {/* Subtle HUD Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Floating Particles */}
                  {particlePositions.map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      style={{
                        top: `${pos.top}%`,
                        left: `${pos.left}%`,
                      }}
                    />
                  ))}

                  {/* Corner Highlights */}
                  <div className="absolute top-3 left-3 w-2 h-2 bg-blue-400 rounded-full opacity-70"></div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-purple-400 rounded-full opacity-70"></div>
                  <div className="absolute bottom-3 left-3 w-2 h-2 bg-pink-400 rounded-full opacity-70"></div>
                  <div className="absolute bottom-3 right-3 w-2 h-2 bg-cyan-400 rounded-full opacity-70"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info - Moved the badge info here for better placement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-500">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <span>Based in Indonesia</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-400 animate-pulse" />
              <span>Available for remote opportunities worldwide</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
