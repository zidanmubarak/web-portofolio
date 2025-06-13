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
  Zap,
  Brain,
  BarChart3
} from 'lucide-react';

interface TechItem {
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  category: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
}

const techStack: TechItem[] = [
  // Programming Languages
  { 
    name: 'Python', 
    icon: Code, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30', 
    category: 'Languages',
    level: 'Expert'
  },
  { 
    name: 'JavaScript', 
    icon: Code, 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30', 
    category: 'Languages',
    level: 'Advanced'
  },
  { 
    name: 'TypeScript', 
    icon: Code, 
    color: 'text-blue-300', 
    bgColor: 'bg-blue-400/20 hover:bg-blue-400/30 border-blue-400/30', 
    category: 'Languages',
    level: 'Advanced'
  },
  { 
    name: 'Java', 
    icon: Code, 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30', 
    category: 'Languages',
    level: 'Intermediate'
  },
  
  // Frontend Frameworks
  { 
    name: 'React', 
    icon: Layers, 
    color: 'text-cyan-400', 
    bgColor: 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/30', 
    category: 'Frontend',
    level: 'Expert'
  },
  { 
    name: 'Next.js', 
    icon: Globe, 
    color: 'text-white', 
    bgColor: 'bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30', 
    category: 'Frontend',
    level: 'Advanced'
  },
  { 
    name: 'TailwindCSS', 
    icon: Layers, 
    color: 'text-teal-400', 
    bgColor: 'bg-teal-500/20 hover:bg-teal-500/30 border-teal-500/30', 
    category: 'Frontend',
    level: 'Expert'
  },
  
  // Backend Frameworks
  { 
    name: 'Django', 
    icon: Server, 
    color: 'text-green-400', 
    bgColor: 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30', 
    category: 'Backend',
    level: 'Expert'
  },
  { 
    name: 'FastAPI', 
    icon: Zap, 
    color: 'text-teal-400', 
    bgColor: 'bg-teal-500/20 hover:bg-teal-500/30 border-teal-500/30', 
    category: 'Backend',
    level: 'Advanced'
  },
  { 
    name: 'Node.js', 
    icon: Server, 
    color: 'text-green-300', 
    bgColor: 'bg-green-400/20 hover:bg-green-400/30 border-green-400/30', 
    category: 'Backend',
    level: 'Advanced'
  },
  
  // AI/ML
  { 
    name: 'TensorFlow', 
    icon: Brain, 
    color: 'text-orange-300', 
    bgColor: 'bg-orange-400/20 hover:bg-orange-400/30 border-orange-400/30', 
    category: 'AI/ML',
    level: 'Advanced'
  },
  { 
    name: 'PyTorch', 
    icon: Brain, 
    color: 'text-red-400', 
    bgColor: 'bg-red-500/20 hover:bg-red-500/30 border-red-500/30', 
    category: 'AI/ML',
    level: 'Advanced'
  },
  { 
    name: 'Scikit-learn', 
    icon: BarChart3, 
    color: 'text-blue-300', 
    bgColor: 'bg-blue-300/20 hover:bg-blue-300/30 border-blue-300/30', 
    category: 'AI/ML',
    level: 'Expert'
  },
  { 
    name: 'Pandas', 
    icon: Database, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30', 
    category: 'AI/ML',
    level: 'Expert'
  },
  
  // Databases
  { 
    name: 'PostgreSQL', 
    icon: Database, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/30', 
    category: 'Database',
    level: 'Advanced'
  },
  { 
    name: 'MongoDB', 
    icon: Database, 
    color: 'text-green-400', 
    bgColor: 'bg-green-600/20 hover:bg-green-600/30 border-green-600/30', 
    category: 'Database',
    level: 'Advanced'
  },
  { 
    name: 'Redis', 
    icon: Database, 
    color: 'text-red-400', 
    bgColor: 'bg-red-600/20 hover:bg-red-600/30 border-red-600/30', 
    category: 'Database',
    level: 'Intermediate'
  },
  
  // DevOps & Cloud
  { 
    name: 'Docker', 
    icon: Cloud, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30', 
    category: 'DevOps',
    level: 'Advanced'
  },
  { 
    name: 'AWS', 
    icon: Cloud, 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-600/20 hover:bg-yellow-600/30 border-yellow-600/30', 
    category: 'Cloud',
    level: 'Intermediate'
  },
  { 
    name: 'Vercel', 
    icon: Globe, 
    color: 'text-white', 
    bgColor: 'bg-gray-600/20 hover:bg-gray-600/30 border-gray-600/30', 
    category: 'Cloud',
    level: 'Advanced'
  },
  
  // Tools
  { 
    name: 'Git', 
    icon: GitBranch, 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30', 
    category: 'Tools',
    level: 'Expert'
  },
  { 
    name: 'Linux', 
    icon: Server, 
    color: 'text-yellow-300', 
    bgColor: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30', 
    category: 'OS',
    level: 'Advanced'
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Expert': return 'text-green-400';
    case 'Advanced': return 'text-blue-400';
    case 'Intermediate': return 'text-yellow-400';
    default: return 'text-gray-400';
  }
};

export function TechStackGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
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
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
    >
      {techStack.map((tech, index) => {
        const Icon = tech.icon;
        return (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative p-3 sm:p-4 rounded-xl border backdrop-blur-sm
              ${tech.bgColor}
              cursor-pointer group
              shadow-lg hover:shadow-xl
              transition-all duration-300
              overflow-hidden
            `}
          >
            {/* Background glow effect */}
            <div className={`
              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 
              transition-opacity duration-300 blur-xl
              ${tech.bgColor.replace('bg-', 'bg-').replace('/20', '/40')}
            `} />
            
            <div className="relative z-10 flex flex-col items-center space-y-1 sm:space-y-2">
              <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${tech.color} group-hover:scale-110 transition-transform duration-200`} />
              <span className="text-xs sm:text-sm font-medium text-white group-hover:text-opacity-90 text-center leading-tight">
                {tech.name}
              </span>
              
              {/* Level indicator */}
              <div className={`text-xs ${getLevelColor(tech.level)} opacity-70 group-hover:opacity-100 transition-opacity`}>
                {tech.level}
              </div>
            </div>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-current opacity-20 transition-all duration-300" 
                 style={{ borderColor: tech.color.replace('text-', '') }} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}