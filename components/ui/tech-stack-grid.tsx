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
}

const techStack: TechItem[] = [
  // Programming Languages
  { name: 'Python', icon: Code, color: 'text-blue-400', bgColor: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30' },
  { name: 'JavaScript', icon: Code, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30' },
  { name: 'TypeScript', icon: Code, color: 'text-blue-300', bgColor: 'bg-blue-400/20 hover:bg-blue-400/30 border-blue-400/30' },
  { name: 'Java', icon: Code, color: 'text-orange-400', bgColor: 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30' },
  { name: 'React', icon: Layers, color: 'text-cyan-400', bgColor: 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/30' },
  { name: 'Next.js', icon: Globe, color: 'text-white', bgColor: 'bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/30' },
  { name: 'Django', icon: Server, color: 'text-green-400', bgColor: 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30' },
  { name: 'FastAPI', icon: Zap, color: 'text-teal-400', bgColor: 'bg-teal-500/20 hover:bg-teal-500/30 border-teal-500/30' },
  { name: 'TensorFlow', icon: Cpu, color: 'text-orange-300', bgColor: 'bg-orange-400/20 hover:bg-orange-400/30 border-orange-400/30' },
  { name: 'PyTorch', icon: Cpu, color: 'text-red-400', bgColor: 'bg-red-500/20 hover:bg-red-500/30 border-red-500/30' },
  { name: 'PostgreSQL', icon: Database, color: 'text-blue-400', bgColor: 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/30' },
  { name: 'MongoDB', icon: Database, color: 'text-green-400', bgColor: 'bg-green-600/20 hover:bg-green-600/30 border-green-600/30' },
  { name: 'Redis', icon: Database, color: 'text-red-400', bgColor: 'bg-red-600/20 hover:bg-red-600/30 border-red-600/30' },
  { name: 'Docker', icon: Cloud, color: 'text-blue-400', bgColor: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30' },
  { name: 'Git', icon: GitBranch, color: 'text-orange-400', bgColor: 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30' },
  { name: 'AWS', icon: Cloud, color: 'text-yellow-400', bgColor: 'bg-yellow-600/20 hover:bg-yellow-600/30 border-yellow-600/30' },
  { name: 'Vercel', icon: Globe, color: 'text-white', bgColor: 'bg-gray-600/20 hover:bg-gray-600/30 border-gray-600/30' },
  { name: 'Linux', icon: Server, color: 'text-yellow-300', bgColor: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30' },
  { name: 'Bootstrap', icon: Layers, color: 'text-purple-400', bgColor: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30' },
  { name: 'TailwindCSS', icon: Layers, color: 'text-cyan-300', bgColor: 'bg-cyan-400/20 hover:bg-cyan-400/30 border-cyan-400/30' },
  { name: 'MySQL', icon: Database, color: 'text-blue-500', bgColor: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30' },
  { name: 'Nginx', icon: Server, color: 'text-green-500', bgColor: 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30' },
  { name: 'Figma', icon: Layers, color: 'text-pink-400', bgColor: 'bg-pink-500/20 hover:bg-pink-500/30 border-pink-500/30' },
  { name: 'Pandas', icon: Database, color: 'text-purple-400', bgColor: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30' },
  { name: 'Scikit-learn', icon: Cpu, color: 'text-blue-300', bgColor: 'bg-blue-300/20 hover:bg-blue-300/30 border-blue-300/30' }
];

// Split tech stack into multiple rows
const createRows = (arr: TechItem[], rowSizes: number[]) => {
  const rows = [];
  let currentIndex = 0;
  
  for (const size of rowSizes) {
    rows.push(arr.slice(currentIndex, currentIndex + size));
    currentIndex += size;
  }
  
  return rows;
};

const techRows = createRows(techStack, [6, 7, 6, 6]); // Different sizes for each row

export function TechStackGrid() {
  return (
    <div className="relative py-8 bg-slate-950 overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Tech Stack Arsenal
        </h2>
      </div>

      <div className="space-y-4">
        {techRows.map((row, rowIndex) => {
          // Duplicate row for seamless scrolling
          const duplicatedRow = [...row, ...row, ...row];
          
          return (
            <div key={rowIndex} className="relative overflow-hidden">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
              
              {/* Scrolling container */}
              <motion.div
                className="flex gap-3"
                animate={{
                  x: rowIndex % 2 === 0 ? [0, -160 * row.length] : [-160 * row.length, 0]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25 + (rowIndex * 2), // Different speeds for each row
                    ease: "linear",
                  },
                }}
                style={{
                  width: `${duplicatedRow.length * 160}px`
                }}
              >
                {duplicatedRow.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={`${tech.name}-${rowIndex}-${index}`}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      className={`
                        flex-shrink-0 w-36 px-4 py-3 rounded-lg border backdrop-blur-sm
                        ${tech.bgColor}
                        cursor-pointer group
                        shadow-md hover:shadow-lg
                        transition-all duration-300 relative
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-6 w-6 ${tech.color} group-hover:scale-110 transition-transform duration-200 flex-shrink-0`} />
                        <span className="text-sm font-medium text-white group-hover:text-opacity-90 truncate">
                          {tech.name}
                        </span>
                      </div>
                      
                      {/* Glow effect on hover */}
                      <div className={`
                        absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 
                        transition-opacity duration-300 blur-xl
                        ${tech.bgColor.replace('bg-', 'bg-').replace('/20', '/40')}
                      `} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}