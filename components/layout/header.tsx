"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  FolderOpen, 
  BarChart3, 
  Mail,
  Github,
  Linkedin,
  Coffee
} from 'lucide-react';

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Avatar className="w-10 h-10 border-2 border-blue-500/50 shadow-lg">
              <AvatarImage src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                ZM
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Zidan Mubarak</h1>
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                Available
              </Badge>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-500' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </motion.div>
              );
            })}
          </nav>

          {/* Social Links & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Social Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="p-2 hover:bg-slate-800 hover:text-blue-400" asChild>
                <a href="https://github.com/zidanmubarak" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-slate-800 hover:text-blue-400" asChild>
                <a href="https://linkedin.com/in/zidanmubarak" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600" asChild>
                <a href="https://github.com/sponsors/zidanmubarak" target="_blank" rel="noopener noreferrer">
                  <Coffee className="mr-1 h-3 w-3" />
                  Sponsor
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800/50 py-4"
          >
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`justify-start transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
              
              {/* Mobile Social Links */}
              <div className="pt-4 border-t border-slate-800/50">
                <div className="flex justify-center space-x-3">
                  <Button size="sm" variant="ghost" className="p-2" asChild>
                    <a href="https://github.com/zidanmubarak" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2" asChild>
                    <a href="https://linkedin.com/in/zidanmubarak" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-pink-500 to-violet-500" asChild>
                    <a href="https://github.com/sponsors/zidanmubarak" target="_blank" rel="noopener noreferrer">
                      <Coffee className="mr-1 h-3 w-3" />
                      Sponsor
                    </a>
                  </Button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}