"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Github,
  Linkedin,
  Mail,
  Coffee,
  Terminal,
  Cpu,
  Database,
  Globe,
  Star,
  Heart,
  Rocket,
  Lightning
} from 'lucide-react';

export function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [particleTargetPositions, setParticleTargetPositions] = useState<Array<{x: number, y: number}>>([]);
  const fullName = "Zidan Mubarak";
  
  const roles = [
    "AI/ML Engineer",
    "Full Stack Developer", 
    "Python Enthusiast",
    "Open Source Contributor"
  ];

  const codeSnippets = [
    "import tensorflow as tf",
    "from sklearn import datasets",
    "def neural_network():",
    "model = tf.keras.Sequential()",
    "return predictions",
    "# Building the future with AI"
  ];
  
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
    if (typeof window !== 'undefined') {
      const positions = codeSnippets.map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }));
      setParticleTargetPositions(positions);
    }
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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-32 bg-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((code, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-400/20 font-mono text-sm"
            initial={{ 
              x: 0,
              y: 0,
              opacity: 0 
            }}
            animate={{ 
              x: particleTargetPositions[index]?.x || 0,
              y: particleTargetPositions[index]?.y || 0,
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: index * 2
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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 backdrop-blur-lg border border-green-500/20 rounded-full px-6 py-3 mb-8">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">Available for Projects</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400">Indonesia 🇮🇩</span>
              </div>
            </motion.div>
            
            {/* Main Heading */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6">
                <span className="block text-white mb-2">
                  Hi, I'm{" "}
                </span>
                <span className="relative block">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {displayText}
                  </span>
                  <motion.span
                    className="absolute -right-2 text-blue-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                </span>
              </h1>
              
              {/* Animated Role */}
              <div className="h-20 flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.h2 
                    key={currentRole}
                    className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-300"
                    initial={{ opacity: 0, y: 20, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: -90 }}
                    transition={{ duration: 0.6 }}
                  >
                    {roles[currentRole]}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Passionate about building intelligent systems that solve real-world problems. 
              I specialize in machine learning, web development, and creating innovative AI solutions.
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
                onClick={() => scrollToSection('projects')}
              >
                <Rocket className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                View My Work
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-blue-500/30 px-10 py-5 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                onClick={() => scrollToSection('contact')}
              >
                <Lightning className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Get In Touch
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center lg:justify-start space-x-6"
            >
              {[
                { icon: Github, href: "https://github.com/zidanmubarak", color: "hover:text-gray-400" },
                { icon: Linkedin, href: "https://linkedin.com/in/zidanmubarak", color: "hover:text-blue-400" },
                { icon: Mail, href: "mailto:zidan@example.com", color: "hover:text-green-400" },
                { icon: Coffee, href: "https://github.com/sponsors/zidanmubarak", color: "hover:text-pink-400" }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className={`p-4 text-slate-400 ${social.color} rounded-2xl transition-all duration-300 hover:bg-slate-800/50 group`} 
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main Profile Container */}
            <div className="relative">
              {/* Background Artistic Elements */}
              <div className="absolute inset-0 -m-12">
                {/* Enhanced Colorful Paint Splashes */}
                <motion.div
                  className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                    x: [0, 20, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/4 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                    x: [0, -15, 0],
                    y: [0, 15, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    x: [0, 25, 0],
                    y: [0, -25, 0]
                  }}
                  transition={{ duration: 7, repeat: Infinity }}
                />
              </div>

              {/* Enhanced Profile Image Container */}
              <div className="relative w-96 h-96 sm:w-[28rem] sm:h-[28rem]">
                {/* Multiple Geometric Frames */}
                <motion.div 
                  className="absolute inset-0 border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl transform rotate-3 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm"
                  animate={{ rotate: [3, -2, 3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute inset-2 border-2 border-cyan-400/30 rounded-3xl transform -rotate-2"
                  animate={{ rotate: [-2, 1, -2] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                
                {/* Main Profile Area */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-3xl overflow-hidden border border-slate-700/50 backdrop-blur-lg shadow-2xl">
                  
                  {/* Enhanced Split Design - Left Side (Designer) */}
                  <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-pink-500/15 backdrop-blur-sm">
                    <div className="p-8 h-full flex flex-col justify-between">
                      <div>
                        <motion.h3 
                          className="text-white font-bold text-2xl mb-3"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          designer
                        </motion.h3>
                        <p className="text-slate-300 text-base leading-relaxed">
                          UI/UX Designer with a passion for designing beautiful and functional user experiences.
                        </p>
                      </div>
                      
                      {/* Enhanced Artistic Elements */}
                      <div className="space-y-3">
                        <motion.div 
                          className="w-full h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                        <motion.div 
                          className="w-3/4 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 2, delay: 1.5 }}
                        />
                        <motion.div 
                          className="w-1/2 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "50%" }}
                          transition={{ duration: 2, delay: 2 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Split Design - Right Side (Coder) */}
                  <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90">
                    <div className="p-8 h-full flex flex-col justify-between">
                      <div>
                        <motion.h3 
                          className="text-white font-bold text-2xl mb-3 font-mono"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                          &lt;coder&gt;
                        </motion.h3>
                        <p className="text-slate-300 text-base leading-relaxed">
                          AI/ML Engineer who focuses on writing clean, elegant and efficient code.
                        </p>
                      </div>
                      
                      {/* Enhanced Code Elements */}
                      <div className="space-y-2 font-mono text-sm">
                        <motion.div 
                          className="text-blue-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.5 }}
                        >
                          &lt;html&gt;
                        </motion.div>
                        <motion.div 
                          className="text-green-400 ml-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3 }}
                        >
                          &lt;head&gt;
                        </motion.div>
                        <motion.div 
                          className="text-purple-400 ml-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3.5 }}
                        >
                          class="ai-dev"
                        </motion.div>
                        <motion.div 
                          className="text-yellow-400 ml-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 4 }}
                        >
                          CSS3 HTML5
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Center Avatar */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 40px rgba(147, 51, 234, 0.5)",
                        "0 0 20px rgba(59, 130, 246, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Z
                  </motion.div>

                  {/* Enhanced Tech Icons Floating */}
                  <motion.div
                    className="absolute top-6 right-6 p-3 bg-blue-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30"
                    animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Brain className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-6 left-6 p-3 bg-purple-500/20 rounded-2xl backdrop-blur-sm border border-purple-500/30"
                    animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  >
                    <Terminal className="h-6 w-6 text-purple-400" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/3 left-4 p-3 bg-green-500/20 rounded-2xl backdrop-blur-sm border border-green-500/30"
                    animate={{ x: [0, 10, 0], rotate: [0, 3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  >
                    <Database className="h-6 w-6 text-green-400" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-1/3 right-4 p-3 bg-pink-500/20 rounded-2xl backdrop-blur-sm border border-pink-500/30"
                    animate={{ x: [0, -10, 0], rotate: [0, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                  >
                    <Cpu className="h-6 w-6 text-pink-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20 lg:mt-24"
        >
          <div className="bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 text-slate-400">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="h-6 w-6 text-blue-400" />
                <span className="text-lg">Based in Indonesia</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="h-6 w-6 text-green-400 animate-pulse" />
                <span className="text-lg">Available for remote opportunities worldwide</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <Globe className="h-6 w-6 text-purple-400" />
                <span className="text-lg">Open to collaboration</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}