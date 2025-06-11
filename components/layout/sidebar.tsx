"use client";

import { motion } from 'framer-motion';
import { 
  Home, 
  BarChart3, 
  FolderOpen, 
  User, 
  Mail,
  Github,
  Linkedin,
  Coffee
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen w-64 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800/50 z-50 shadow-2xl"
    >
      <div className="flex flex-col h-full p-6">
        {/* Profile Section */}
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative mb-4">
            <Avatar className="w-20 h-20 border-2 border-blue-500/50 shadow-lg glow-blue">
              <AvatarImage src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                ZM
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
          </div>
          <h2 className="text-xl font-bold text-white mb-1 gradient-text">Zidan Mubarak</h2>
          <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
            ✓ Available
          </Badge>
          <p className="text-sm text-slate-400 text-center mt-2">
            @zidanmubarak
          </p>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.li 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start text-left transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-500 glow-blue' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:translate-x-1'
                    }`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Social Links */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-center space-x-3">
            <Button size="sm" variant="ghost" className="p-2 hover:bg-slate-800 hover:text-blue-400 transition-colors">
              <Github className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2 hover:bg-slate-800 hover:text-blue-400 transition-colors">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2 hover:bg-slate-800 hover:text-blue-400 transition-colors">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Coffee className="mr-2 h-4 w-4" />
            Sponsor
          </Button>
        </motion.div>
      </div>
    </motion.aside>
  );
}