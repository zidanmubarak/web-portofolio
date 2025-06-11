"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/layout/sidebar';
import { HeroSection } from '@/components/sections/hero-section';
import { DashboardSection } from '@/components/sections/dashboard-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HeroSection />;
      case 'dashboard':
        return <DashboardSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 ml-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ 
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="min-h-screen"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}