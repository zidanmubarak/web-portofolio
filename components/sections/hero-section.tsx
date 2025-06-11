"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParticleBackground } from '@/components/ui/particle-background';
import { 
  ArrowRight, 
  Download, 
  MapPin,
  Sparkles,
  Code,
  Brain,
  Zap
} from 'lucide-react';

export function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi, I'm Zidan";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
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
      <ParticleBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500/20 text-blue-400 border-blue-500/30 backdrop-blur-sm shadow-lg glow-blue text-sm sm:text-base">
              <Sparkles className="mr-2 h-4 w-4" />
              AI/ML Enthusiast • Python Developer • Indonesia 🇮🇩
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold mb-6 sm:mb-8"
            variants={itemVariants}
          >
            <span className="gradient-text">
              {displayText}
              <span className="animate-pulse text-blue-400">|</span>
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-slate-300 mb-6 sm:mb-8 font-light px-4"
            variants={itemVariants}
          >
            Machine Learning Engineer • Full Stack Developer • Open Source Contributor
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
            variants={itemVariants}
          >
            Passionate about building intelligent systems that solve real-world problems. 
            I specialize in machine learning, web development, and creating innovative AI solutions 
            that make a difference. Let's build the future together! 🚀
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 glow-blue"
              onClick={() => scrollToSection('about')}
            >
              <Brain className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              About Me
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('projects')}
            >
              <Code className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              View Projects
            </Button>
            
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              <Zap className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Let's Connect
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex justify-center items-center text-sm sm:text-base md:text-lg text-slate-500 px-4"
            variants={itemVariants}
          >
            <MapPin className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
            Available for remote opportunities worldwide
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}