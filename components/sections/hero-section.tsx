"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Database
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
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
            className="absolute text-blue-400/30 font-mono text-sm"
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <Badge className="mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 backdrop-blur-sm shadow-lg text-sm sm:text-base rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                Available for Projects • Indonesia 🇮🇩
              </Badge>
            </motion.div>
            
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
                      className="absolute -right-1 text-blue-400"
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
              Passionate about building intelligent systems that solve real-world problems. 
              I specialize in machine learning, web development, and creating innovative AI solutions.
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection('projects')}
              >
                <Code className="mr-2 h-5 w-5" />
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection('contact')}
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
              <Button size="sm" variant="ghost" className="p-3 hover:bg-slate-800 hover:text-blue-400 rounded-xl transition-all duration-300 hover:scale-110" asChild>
                <a href="https://github.com/zidanmubarak" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" className="p-3 hover:bg-slate-800 hover:text-blue-400 rounded-xl transition-all duration-300 hover:scale-110" asChild>
                <a href="https://linkedin.com/in/zidanmubarak" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" className="p-3 hover:bg-slate-800 hover:text-green-400 rounded-xl transition-all duration-300 hover:scale-110" asChild>
                <a href="mailto:zidan@example.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" className="p-3 hover:bg-slate-800 hover:text-pink-400 rounded-xl transition-all duration-300 hover:scale-110" asChild>
                <a href="https://github.com/sponsors/zidanmubarak" target="_blank" rel="noopener noreferrer">
                  <Coffee className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main Profile Container */}
            <div className="relative">
              {/* Background Artistic Elements */}
              <div className="absolute inset-0 -m-8">
                {/* Colorful Paint Splashes */}
                <motion.div
                  className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/4 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{ duration: 7, repeat: Infinity }}
                />
              </div>

              {/* Profile Image Container */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Geometric Frame */}
                <div className="absolute inset-0 border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl transform rotate-3 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm"></div>
                
                {/* Main Profile Area */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-3xl overflow-hidden border border-slate-700/50 backdrop-blur-lg shadow-2xl">
                  
                  {/* Split Design - Left Side (Designer) */}
                  <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm">
                    <div className="p-6 h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-2">designer</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          UI/UX Designer with a passion for designing beautiful and functional user experiences.
                        </p>
                      </div>
                      
                      {/* Artistic Elements */}
                      <div className="space-y-2">
                        <motion.div 
                          className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                        <motion.div 
                          className="w-3/4 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 2, delay: 1.5 }}
                        />
                        <motion.div 
                          className="w-1/2 h-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "50%" }}
                          transition={{ duration: 2, delay: 2 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Split Design - Right Side (Coder) */}
                  <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80">
                    <div className="p-6 h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-2 font-mono">&lt;coder&gt;</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          AI/ML Engineer who focuses on writing clean, elegant and efficient code.
                        </p>
                      </div>
                      
                      {/* Code Elements */}
                      <div className="space-y-1 font-mono text-xs">
                        <motion.div 
                          className="text-blue-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.5 }}
                        >
                          &lt;html&gt;
                        </motion.div>
                        <motion.div 
                          className="text-green-400 ml-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3 }}
                        >
                          &lt;head&gt;
                        </motion.div>
                        <motion.div 
                          className="text-purple-400 ml-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3.5 }}
                        >
                          class="ai-dev"
                        </motion.div>
                        <motion.div 
                          className="text-yellow-400 ml-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 4 }}
                        >
                          CSS3 HTML5
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Center Avatar */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl border-4 border-white/20">
                    Z
                  </div>

                  {/* Tech Icons Floating */}
                  <motion.div
                    className="absolute top-4 right-4 p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Brain className="h-5 w-5 text-blue-400" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-4 left-4 p-2 bg-purple-500/20 rounded-lg backdrop-blur-sm"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  >
                    <Terminal className="h-5 w-5 text-purple-400" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/3 left-2 p-2 bg-green-500/20 rounded-lg backdrop-blur-sm"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  >
                    <Database className="h-5 w-5 text-green-400" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-1/3 right-2 p-2 bg-pink-500/20 rounded-lg backdrop-blur-sm"
                    animate={{ x: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                  >
                    <Cpu className="h-5 w-5 text-pink-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info */}
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