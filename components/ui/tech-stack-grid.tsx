"use client";

import { motion } from 'framer-motion';

const techStack = [
  // Row 1 - Languages
  {
    name: "Python",
    category: "Languages",
    icon: "🐍",
    color: "from-blue-400 to-yellow-400",
    bgColor: "from-blue-500/20 to-yellow-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    name: "JavaScript",
    category: "Languages", 
    icon: "⚡",
    color: "from-yellow-400 to-yellow-600",
    bgColor: "from-yellow-500/20 to-yellow-600/20",
    borderColor: "border-yellow-500/30"
  },
  {
    name: "TypeScript",
    category: "Languages",
    icon: "🔷",
    color: "from-blue-400 to-blue-600",
    bgColor: "from-blue-500/20 to-blue-600/20", 
    borderColor: "border-blue-500/30"
  },
  {
    name: "Java",
    category: "Languages",
    icon: "☕",
    color: "from-orange-400 to-red-500",
    bgColor: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30"
  },
  {
    name: "PHP",
    category: "Languages",
    icon: "🐘",
    color: "from-purple-400 to-blue-500",
    bgColor: "from-purple-500/20 to-blue-500/20",
    borderColor: "border-purple-500/30"
  },
  {
    name: "C++",
    category: "Languages",
    icon: "⚙️",
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-600/20 to-indigo-600/20",
    borderColor: "border-blue-600/30"
  },

  // Row 2 - Frontend
  {
    name: "React",
    category: "Frontend",
    icon: "⚛️",
    color: "from-cyan-400 to-blue-500",
    bgColor: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30"
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: "🔺",
    color: "from-gray-400 to-gray-600",
    bgColor: "from-gray-500/20 to-gray-600/20",
    borderColor: "border-gray-500/30"
  },
  {
    name: "Vue.js",
    category: "Frontend",
    icon: "💚",
    color: "from-green-400 to-green-600",
    bgColor: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-500/30"
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: "🎨",
    color: "from-cyan-400 to-teal-500",
    bgColor: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/30"
  },
  {
    name: "Bootstrap",
    category: "Frontend",
    icon: "🅱️",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-600/20 to-pink-500/20",
    borderColor: "border-purple-500/30"
  },
  {
    name: "Figma",
    category: "Frontend",
    icon: "🎭",
    color: "from-pink-400 to-violet-500",
    bgColor: "from-pink-500/20 to-violet-500/20",
    borderColor: "border-pink-500/30"
  },

  // Row 3 - Backend & Database
  {
    name: "Node.js",
    category: "Backend",
    icon: "🟢",
    color: "from-green-500 to-green-700",
    bgColor: "from-green-600/20 to-green-700/20",
    borderColor: "border-green-600/30"
  },
  {
    name: "Django",
    category: "Backend",
    icon: "🎸",
    color: "from-green-600 to-green-800",
    bgColor: "from-green-700/20 to-green-800/20",
    borderColor: "border-green-700/30"
  },
  {
    name: "Laravel",
    category: "Backend",
    icon: "🔶",
    color: "from-red-500 to-orange-500",
    bgColor: "from-red-600/20 to-orange-500/20",
    borderColor: "border-red-500/30"
  },
  {
    name: "MySQL",
    category: "Database",
    icon: "🗄️",
    color: "from-blue-500 to-orange-500",
    bgColor: "from-blue-600/20 to-orange-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: "🐘",
    color: "from-blue-600 to-blue-800",
    bgColor: "from-blue-700/20 to-blue-800/20",
    borderColor: "border-blue-600/30"
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: "🍃",
    color: "from-green-500 to-green-700",
    bgColor: "from-green-600/20 to-green-700/20",
    borderColor: "border-green-500/30"
  },

  // Row 4 - Tools & Others
  {
    name: "Git",
    category: "Tools",
    icon: "🌿",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-600/20 to-red-500/20",
    borderColor: "border-orange-500/30"
  },
  {
    name: "Docker",
    category: "Tools",
    icon: "🐳",
    color: "from-blue-400 to-cyan-500",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/30"
  },
  {
    name: "AWS",
    category: "Cloud",
    icon: "☁️",
    color: "from-orange-400 to-yellow-500",
    bgColor: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-400/30"
  },
  {
    name: "Firebase",
    category: "Cloud",
    icon: "🔥",
    color: "from-yellow-500 to-red-500",
    bgColor: "from-yellow-600/20 to-red-500/20",
    borderColor: "border-yellow-500/30"
  },
  {
    name: "Vercel",
    category: "Cloud",
    icon: "▲",
    color: "from-gray-600 to-black",
    bgColor: "from-gray-700/20 to-black/20",
    borderColor: "border-gray-600/30"
  },
  {
    name: "Nginx",
    category: "Tools",
    icon: "🔧",
    color: "from-green-500 to-green-700",
    bgColor: "from-green-600/20 to-green-700/20",
    borderColor: "border-green-500/30"
  }
];

// Group technologies by rows
const rows = [
  techStack.slice(0, 6),   // Languages
  techStack.slice(6, 12),  // Frontend
  techStack.slice(12, 18), // Backend & Database
  techStack.slice(18, 24)  // Tools & Others
];

// Duplicate items for seamless loop
const createInfiniteArray = (arr: any[]) => [...arr, ...arr, ...arr];

interface TechCardProps {
  tech: {
    name: string;
    category: string;
    icon: string;
    color: string;
    bgColor: string;
    borderColor: string;
  };
}

const TechCard = ({ tech }: TechCardProps) => (
  <motion.div
    className={`
      flex-shrink-0 flex items-center gap-3 px-6 py-4 mx-2
      bg-gradient-to-r ${tech.bgColor} 
      border ${tech.borderColor} 
      rounded-2xl backdrop-blur-sm shadow-lg
      hover:scale-105 transition-all duration-300
      min-w-fit whitespace-nowrap
    `}
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
    }}
  >
    <span className="text-2xl">{tech.icon}</span>
    <div>
      <p className={`font-bold text-lg bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
        {tech.name}
      </p>
      <p className="text-slate-400 text-sm font-medium">
        {tech.category}
      </p>
    </div>
  </motion.div>
);

export function TechStackGrid() {
  return (
    <div className="space-y-8 overflow-hidden">
      {rows.map((row, rowIndex) => {
        const isEven = rowIndex % 2 === 0;
        const infiniteRow = createInfiniteArray(row);
        
        return (
          <div key={rowIndex} className="relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: isEven ? [-1000, 0] : [0, -1000]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20 + rowIndex * 2, // Different speeds for each row
                  ease: "linear"
                }
              }}
            >
              {infiniteRow.map((tech, index) => (
                <TechCard key={`${tech.name}-${index}`} tech={tech} />
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}