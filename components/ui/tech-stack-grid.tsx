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
  { name: 'Linux', icon: Server, color: 'text-yellow-300', bgColor: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30', category: 'OS' },
  
  // Additional tech to make scrolling more visible
  { name: 'Bootstrap', icon: Layers, color: 'text-purple-400', bgColor: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30', category: 'Frontend' },
  { name: 'TailwindCSS', icon: Layers, color: 'text-cyan-300', bgColor: 'bg-cyan-400/20 hover:bg-cyan-400/30 border-cyan-400/30', category: 'Frontend' },
  { name: 'MySQL', icon: Database, color: 'text-blue-500', bgColor: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30', category: 'Database' },
  { name: 'Nginx', icon: Server, color: 'text-green-500', bgColor: 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30', category: 'DevOps' },
  { name: 'Figma', icon: Layers, color: 'text-pink-400', bgColor: 'bg-pink-500/20 hover:bg-pink-500/30 border-pink-500/30', category: 'Design' }
];

export function TechStackGrid() {
  // Duplicate the array to create seamless loop
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
      
      {/* Scrolling container */}
      <motion.div
        className="flex gap-4 sm:gap-6"
        animate={{
          x: [0, -50 * techStack.length] // Move by the width of original array
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30, // Adjust speed here
            ease: "linear",
          },
        }}
        style={{
          width: `${duplicatedTechStack.length * 200}px` // Approximate width
        }}
      >
        {duplicatedTechStack.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={`${tech.name}-${index}`}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                transition: { duration: 0.2 }
              }}
              className={`
                flex-shrink-0 w-40 sm:w-48 p-4 sm:p-6 rounded-xl border backdrop-blur-sm
                ${tech.bgColor}
                cursor-pointer group
                shadow-lg hover:shadow-xl
                transition-all duration-300
              `}
            >
              <div className="flex flex-col items-center space-y-3">
                <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${tech.color} group-hover:scale-110 transition-transform duration-200`} />
                <span className="text-sm sm:text-base font-medium text-white group-hover:text-opacity-90 text-center">
                  {tech.name}
                </span>
                <span className="text-xs text-slate-400 text-center">
                  {tech.category}
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
    </div>
  );
}