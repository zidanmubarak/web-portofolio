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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-8 px-6 py-3 bg-blue-500/20 text-blue-400 border-blue-500/30 backdrop-blur-sm shadow-lg glow-blue">
              <Sparkles className="mr-2 h-4 w-4" />
              AI/ML Enthusiast • Python Developer • Indonesia 🇮🇩
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-7xl md:text-9xl font-bold mb-8"
            variants={itemVariants}
          >
            <span className="gradient-text">
              {displayText}
              <span className="animate-pulse text-blue-400">|</span>
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-4xl text-slate-300 mb-8 font-light"
            variants={itemVariants}
          >
            Machine Learning Engineer • Full Stack Developer • Open Source Contributor
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            Passionate about building intelligent systems that solve real-world problems. 
            I specialize in machine learning, web development, and creating innovative AI solutions 
            that make a difference. Let's build the future together! 🚀
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 glow-blue">
              <Brain className="mr-2 h-5 w-5" />
              About Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Code className="mr-2 h-5 w-5" />
              View Projects
            </Button>
            
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Zap className="mr-2 h-5 w-5" />
              Let's Connect
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex justify-center items-center text-lg text-slate-500"
            variants={itemVariants}
          >
            <MapPin className="mr-2 h-5 w-5" />
            Available for remote opportunities worldwide
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}