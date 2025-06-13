"use client";

import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Globe, 
  Server, 
  Cloud,
  GitBranch,
  Cpu,
  Layers,
  Zap,
  Brain,
  BarChart3,
  Smartphone
} from 'lucide-react';

interface TechItem {
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  logo?: string;
}

const techStack: TechItem[] = [
  // Programming Languages
  { 
    name: 'Python', 
    icon: Code, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20 border-blue-500/30',
    logo: '🐍'
  },
  { 
    name: 'JavaScript', 
    icon: Code, 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-500/20 border-yellow-500/30',
    logo: '⚡'
  },
  { 
    name: 'TypeScript', 
    icon: Code, 
    color: 'text-blue-300', 
    bgColor: 'bg-blue-400/20 border-blue-400/30',
    logo: '📘'
  },
  { 
    name: 'Java', 
    icon: Code, 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20 border-orange-500/30',
    logo: '☕'
  },
  
  // Frontend Frameworks
  { 
    name: 'React', 
    icon: Layers, 
    color: 'text-cyan-400', 
    bgColor: 'bg-cyan-500/20 border-cyan-500/30',
    logo: '⚛️'
  },
  { 
    name: 'Next.js', 
    icon: Globe, 
    color: 'text-white', 
    bgColor: 'bg-gray-500/20 border-gray-500/30',
    logo: '▲'
  },
  { 
    name: 'TailwindCSS', 
    icon: Layers, 
    color: 'text-teal-400', 
    bgColor: 'bg-teal-500/20 border-teal-500/30',
    logo: '🎨'
  },
  { 
    name: 'Bootstrap', 
    icon: Layers, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20 border-purple-500/30',
    logo: '🅱️'
  },
  
  // Backend Frameworks
  { 
    name: 'Django', 
    icon: Server, 
    color: 'text-green-400', 
    bgColor: 'bg-green-500/20 border-green-500/30',
    logo: '🎸'
  },
  { 
    name: 'FastAPI', 
    icon: Zap, 
    color: 'text-teal-400', 
    bgColor: 'bg-teal-500/20 border-teal-500/30',
    logo: '🚀'
  },
  { 
    name: 'Node.js', 
    icon: Server, 
    color: 'text-green-300', 
    bgColor: 'bg-green-400/20 border-green-400/30',
    logo: '🟢'
  },
  { 
    name: 'Express', 
    icon: Server, 
    color: 'text-gray-300', 
    bgColor: 'bg-gray-400/20 border-gray-400/30',
    logo: '🚂'
  },
  
  // AI/ML
  { 
    name: 'TensorFlow', 
    icon: Brain, 
    color: 'text-orange-300', 
    bgColor: 'bg-orange-400/20 border-orange-400/30',
    logo: '🧠'
  },
  { 
    name: 'PyTorch', 
    icon: Brain, 
    color: 'text-red-400', 
    bgColor: 'bg-red-500/20 border-red-500/30',
    logo: '🔥'
  },
  { 
    name: 'Scikit-learn', 
    icon: BarChart3, 
    color: 'text-blue-300', 
    bgColor: 'bg-blue-300/20 border-blue-300/30',
    logo: '📊'
  },
  { 
    name: 'Pandas', 
    icon: Database, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20 border-purple-500/30',
    logo: '🐼'
  },
  { 
    name: 'NumPy', 
    icon: BarChart3, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20 border-blue-500/30',
    logo: '🔢'
  },
  
  // Databases
  { 
    name: 'PostgreSQL', 
    icon: Database, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-600/20 border-blue-600/30',
    logo: '🐘'
  },
  { 
    name: 'MongoDB', 
    icon: Database, 
    color: 'text-green-400', 
    bgColor: 'bg-green-600/20 border-green-600/30',
    logo: '🍃'
  },
  { 
    name: 'Redis', 
    icon: Database, 
    color: 'text-red-400', 
    bgColor: 'bg-red-600/20 border-red-600/30',
    logo: '🔴'
  },
  { 
    name: 'MySQL', 
    icon: Database, 
    color: 'text-blue-300', 
    bgColor: 'bg-blue-400/20 border-blue-400/30',
    logo: '🐬'
  },
  { 
    name: 'SQLite', 
    icon: Database, 
    color: 'text-gray-400', 
    bgColor: 'bg-gray-500/20 border-gray-500/30',
    logo: '💾'
  },
  
  // DevOps & Cloud
  { 
    name: 'Docker', 
    icon: Cloud, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20 border-blue-500/30',
    logo: '🐳'
  },
  { 
    name: 'AWS', 
    icon: Cloud, 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-600/20 border-yellow-600/30',
    logo: '☁️'
  },
  { 
    name: 'Vercel', 
    icon: Globe, 
    color: 'text-white', 
    bgColor: 'bg-gray-600/20 border-gray-600/30',
    logo: '▲'
  },
  { 
    name: 'Netlify', 
    icon: Globe, 
    color: 'text-teal-400', 
    bgColor: 'bg-teal-500/20 border-teal-500/30',
    logo: '🌐'
  },
  
  // Tools
  { 
    name: 'Git', 
    icon: GitBranch, 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20 border-orange-500/30',
    logo: '🌿'
  },
  { 
    name: 'GitHub', 
    icon: GitBranch, 
    color: 'text-white', 
    bgColor: 'bg-gray-500/20 border-gray-500/30',
    logo: '🐙'
  },
  { 
    name: 'VS Code', 
    icon: Code, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20 border-blue-500/30',
    logo: '💻'
  },
  { 
    name: 'Linux', 
    icon: Server, 
    color: 'text-yellow-300', 
    bgColor: 'bg-yellow-500/20 border-yellow-500/30',
    logo: '🐧'
  },
  { 
    name: 'Figma', 
    icon: Smartphone, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20 border-purple-500/30',
    logo: '🎨'
  },
  { 
    name: 'Postman', 
    icon: Zap, 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20 border-orange-500/30',
    logo: '📮'
  }
];

export function TechStackMarquee() {
  // Duplicate the array to create seamless loop
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />
      
      {/* First row - moving left */}
      <motion.div
        className="flex space-x-4 mb-6"
        animate={{
          x: [0, -50 * techStack.length]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {duplicatedTechStack.map((tech, index) => (
          <div
            key={`row1-${index}`}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-full border backdrop-blur-sm
              ${tech.bgColor}
              hover:scale-105 transition-transform duration-300
              whitespace-nowrap flex-shrink-0 min-w-fit
              shadow-lg hover:shadow-xl
            `}
          >
            <span className="text-lg">{tech.logo}</span>
            <span className={`text-sm font-medium ${tech.color}`}>
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Second row - moving right (reverse) */}
      <motion.div
        className="flex space-x-4"
        animate={{
          x: [-50 * techStack.length, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
      >
        {duplicatedTechStack.reverse().map((tech, index) => (
          <div
            key={`row2-${index}`}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-full border backdrop-blur-sm
              ${tech.bgColor}
              hover:scale-105 transition-transform duration-300
              whitespace-nowrap flex-shrink-0 min-w-fit
              shadow-lg hover:shadow-xl
            `}
          >
            <span className="text-lg">{tech.logo}</span>
            <span className={`text-sm font-medium ${tech.color}`}>
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}