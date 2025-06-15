"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Download, 
  MapPin,
  Sparkles,
  Code,
  Brain,
  Zap,
  Rocket,
  Star,
  Globe,
  Terminal,
  Coffee,
  Heart,
  ChevronDown
} from 'lucide-react';

// Floating elements data
const floatingElements = [
  { icon: Code, color: "text-blue-400", delay: 0, x: "10%", y: "20%" },
  { icon: Brain, color: "text-purple-400", delay: 0.5, x: "80%", y: "30%" },
  { icon: Zap, color: "text-yellow-400", delay: 1, x: "15%", y: "70%" },
  { icon: Rocket, color: "text-green-400", delay: 1.5, x: "85%", y: "60%" },
  { icon: Star, color: "text-pink-400", delay: 2, x: "50%", y: "15%" },
  { icon: Globe, color: "text-cyan-400", delay: 2.5, x: "70%", y: "80%" },
];

// Typing animation hook
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const nameText = useTypewriter("Zidan Mubarak", 150);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setMounted(true);
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Floating Orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Tech Icons */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} opacity-20`}
            style={{ left: element.x, top: element.y }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
        );
      })}

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <Badge className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-blue-500/30 rounded-full px-6 py-3 text-base shadow-2xl">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-blue-400 font-medium">Available for Opportunities</span>
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            </Badge>
          </motion.div>

          {/* Main Heading with Typewriter Effect */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4">
              <div className="text-slate-400 text-2xl sm:text-3xl md:text-4xl font-light mb-4 tracking-wider">
                Hello, I'm
              </div>
              <div className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  {nameText}
                </span>
                {showCursor && (
                  <span className="text-blue-400 animate-pulse">|</span>
                )}
                
                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full"
                  animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>

          {/* Animated Role Description */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-300 font-light leading-relaxed">
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AI/ML Engineer
              </motion.span>
              <span className="mx-4 text-slate-500">•</span>
              <motion.span
                className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              >
                Full Stack Developer
              </motion.span>
              <span className="mx-4 text-slate-500">•</span>
              <motion.span
                className="inline-block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-semibold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity }}
              >
                Open Source Contributor
              </motion.span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-5xl mx-auto leading-relaxed font-light">
              Passionate about building{" "}
              <span className="text-blue-400 font-medium">intelligent systems</span> that solve real-world problems. 
              I specialize in{" "}
              <span className="text-purple-400 font-medium">machine learning</span>,{" "}
              <span className="text-green-400 font-medium">web development</span>, and creating innovative{" "}
              <span className="text-pink-400 font-medium">AI solutions</span> that make a difference.
            </p>
          </motion.div>

          {/* Interactive Stats */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { number: "50+", label: "Projects Built", icon: Code, color: "from-blue-400 to-cyan-400" },
                { number: "3+", label: "Years Experience", icon: Brain, color: "from-purple-400 to-pink-400" },
                { number: "∞", label: "Coffee Consumed", icon: Coffee, color: "from-orange-400 to-red-400" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-2xl"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                  >
                    <Icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 mx-auto`} />
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-slate-400 text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-0"
                  onClick={() => scrollToSection('projects')}
                >
                  <Rocket className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                  Explore My Work
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm"
                  onClick={() => scrollToSection('contact')}
                >
                  <Heart className="mr-3 h-5 w-5 group-hover:text-red-400 transition-colors" />
                  Let's Connect
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Location & Availability */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700/50">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>Based in Indonesia</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700/50">
                <Globe className="h-4 w-4 text-green-400 animate-pulse" />
                <span>Available Worldwide</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700/50">
                <Terminal className="h-4 w-4 text-purple-400" />
                <span>Remote Ready</span>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-slate-400 cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-spin-slow" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border border-purple-500/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
      <div className="absolute top-1/4 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
    </div>
  );
}