"use client";

import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Globe, 
  Server, 
  Smartphone,
  Cloud,
  GitBranch,
  Cpu,
  Layers,
  Zap
} from 'lucide-react';

interface TechItem {
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  category: string;
}

const techStack: TechItem[] = [
  // Programming Languages
  { name: 'Python', icon: Code, color: 'text-blue-400', bgColor: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30', category: 'Languages' },
  { name: 'JavaScript', icon: Code, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30', category: 'Languages' },
  { name: 'TypeScript', icon: Code, color: 'text-blue-300', bgColor: 'bg-blue-400/20 hover:bg-blue-400/30 border-blue-400/30', category: 'Languages' },
  { name: 'Java', icon: Code, color: 'text-orange-400', bgColor: 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30', category: 'Languages' },
  
  // Frameworks & Libraries
  { name: 'React', icon: Layers, color: 'text-cyan-400', bgColor: 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/30', category: 'Frontend' },
  { name: 'Next.js', icon: Globe, color: 'text-white', bgColor: 'bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30', category: 'Frontend' },
  { name: 'Django', icon: Server, color: 'text-green-400', bgColor: 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30', category: 'Backend' },
  { name: 'FastAPI', icon: Zap, color: 'text-teal-400', bgColor: 'bg-teal-500/20 hover:bg-teal-500/30 border-teal-500/30', category: 'Backend' },
  
  // AI/ML
  { name: 'TensorFlow', icon: Cpu, color: 'text-orange-300', bgColor: 'bg-orange-400/20 hover:bg-orange-400/30 border-orange-400/30', category: 'AI/ML' },
  { name: 'PyTorch', icon: Cpu, color: 'text-red-400', bgColor: 'bg-red-500/20 hover:bg-red-500/30 border-red-500/30', category: 'AI/ML' },
  { name: 'Scikit-learn', icon: Cpu, color: 'text-blue-300', bgColor: 'bg-blue-300/20 hover:bg-blue-300/30 border-blue-300/30', category: 'AI/ML' },
  { name: 'Pandas', icon: Database, color: 'text-purple-400', bgColor: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30', category: 'AI/ML' },
  
  // Databases
  { name: 'PostgreSQL', icon: Database, color: 'text-blue-400', bgColor: 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/30', category: 'Database' },
  { name: 'MongoDB', icon: Database, color: 'text-green-400', bgColor: 'bg-green-600/20 hover:bg-green-600/30 border-green-600/30', category: 'Database' },
  { name: 'Redis', icon: Database, color: 'text-red-400', bgColor: 'bg-red-600/20 hover:bg-red-600/30 border-red-600/30', category: 'Database' },
  
  // Tools & Others
  { name: 'Docker', icon: Cloud, color: 'text-blue-400', bgColor: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30', category: 'DevOps' },
  { name: 'Git', icon: GitBranch, color: 'text-orange-400', bgColor: 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30', category: 'Tools' },
  { name: 'AWS', icon: Cloud, color: 'text-yellow-400', bgColor: 'bg-yellow-600/20 hover:bg-yellow-600/30 border-yellow-600/30', category: 'Cloud' },
  { name: 'Vercel', icon: Globe, color: 'text-white', bgColor: 'bg-gray-600/20 hover:bg-gray-600/30 border-gray-600/30', category: 'Cloud' },
  { name: 'Linux', icon: Server, color: 'text-yellow-300', bgColor: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30', category: 'OS' }
];

export function TechStackGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      {techStack.map((tech, index) => {
        const Icon = tech.icon;
        return (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -4,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className={`
              tech-button
              relative p-4 rounded-xl border backdrop-blur-sm
              ${tech.bgColor}
              cursor-pointer group
              shadow-lg hover:shadow-xl
              transition-all duration-300
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <Icon className={`h-8 w-8 ${tech.color} group-hover:scale-110 transition-transform duration-200`} />
              <span className="text-sm font-medium text-white group-hover:text-opacity-90">
                {tech.name}
              </span>
            </div>
            
            {/* Glow effect on hover */}
            <div className={`
              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 
              transition-opacity duration-300 blur-xl
              ${tech.bgColor.replace('bg-', 'bg-').replace('/20', '/40')}
            `} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}