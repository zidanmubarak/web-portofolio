"use client";

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
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
  Smartphone,
  Palette,
  Shield,
  Package
} from 'lucide-react';

interface TechStackProps {
  technologies: string[];
  className?: string;
}

// Tech stack mapping with icons and colors
const techMapping: Record<string, {
  icon: React.ElementType;
  color: string;
  bgColor: string;
  logo?: string;
}> = {
  // Programming Languages
  'Python': { 
    icon: Code, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20 border-blue-500/30',
    logo: '🐍'
  },
  'JavaScript': { 
    icon: Code, 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-500/20 border-yellow-500/30',
    logo: '⚡'
  },
  'TypeScript': { 
    icon: Code, 
    color: 'text-blue-300', 
    bgColor: 'bg-blue-400/20 border-blue-400/30',
    logo: '📘'
  },
  'Java': { 
    icon: Code, 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20 border-orange-500/30',
    logo: '☕'
  },
  
  // Frontend Frameworks & Libraries
  'React': { 
    icon: Layers, 
    color: 'text-cyan-400', 
    bgColor: 'bg-cyan-500/20 border-cyan-500/30',
    logo: '⚛️'
  },
  'Next.js': { 
    icon: Globe, 
    color: 'text-white', 
    bgColor: 'bg-gray-500/20 border-gray-500/30',
    logo: '▲'
  },
  'TailwindCSS': { 
    icon: Palette, 
    color: 'text-teal-400', 
    bgColor: 'bg-teal-500/20 border-teal-500/30',
    logo: '🎨'
  },
  'Bootstrap': { 
    icon: Palette, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20 border-purple-500/30',
    logo: '🅱️'
  },
  'Chart.js': { 
    icon: BarChart3, 
    color: 'text-pink-400', 
    bgColor: 'bg-pink-500/20 border-pink-500/30',
    logo: '📊'
  },
  
  // Backend Frameworks
  'Django': { 
    icon: Server, 
    color: 'text-green-400', 
    bgColor: 'bg-green-500/20 border-green-500/30',
    logo: '🎸'
  },
  'FastAPI': { 
    icon: Zap, 
    color: 'text-teal-400', 
    bgColor: 'bg-teal-500/20 border-teal-500/30',
    logo: '🚀'
  },
  'Node.js': { 
    icon: Server, 
    color: 'text-green-300', 
    bgColor: 'bg-green-400/20 border-green-400/30',
    logo: '🟢'
  },
  'Express': { 
    icon: Server, 
    color: 'text-gray-300', 
    bgColor: 'bg-gray-400/20 border-gray-400/30',
    logo: '🚂'
  },
  
  // AI/ML Libraries
  'TensorFlow': { 
    icon: Brain, 
    color: 'text-orange-300', 
    bgColor: 'bg-orange-400/20 border-orange-400/30',
    logo: '🧠'
  },
  'PyTorch': { 
    icon: Brain, 
    color: 'text-red-400', 
    bgColor: 'bg-red-500/20 border-red-500/30',
    logo: '🔥'
  },
  'scikit-learn': { 
    icon: BarChart3, 
    color: 'text-blue-300', 
    bgColor: 'bg-blue-300/20 border-blue-300/30',
    logo: '📊'
  },
  'pandas': { 
    icon: Database, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20 border-purple-500/30',
    logo: '🐼'
  },
  'NumPy': { 
    icon: BarChart3, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20 border-blue-500/30',
    logo: '🔢'
  },
  'Matplotlib': { 
    icon: BarChart3, 
    color: 'text-indigo-400', 
    bgColor: 'bg-indigo-500/20 border-indigo-500/30',
    logo: '📈'
  },
  'Plotly': { 
    icon: BarChart3, 
    color: 'text-blue-500', 
    bgColor: 'bg-blue-600/20 border-blue-600/30',
    logo: '📊'
  },
  'Jupyter': { 
    icon: Code, 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20 border-orange-500/30',
    logo: '📓'
  },
  
  // Databases
  'PostgreSQL': { 
    icon: Database, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-600/20 border-blue-600/30',
    logo: '🐘'
  },
  'MongoDB': { 
    icon: Database, 
    color: 'text-green-400', 
    bgColor: 'bg-green-600/20 border-green-600/30',
    logo: '🍃'
  },
  'Redis': { 
    icon: Database, 
    color: 'text-red-400', 
    bgColor: 'bg-red-600/20 border-red-600/30',
    logo: '🔴'
  },
  'SQLite': { 
    icon: Database, 
    color: 'text-gray-400', 
    bgColor: 'bg-gray-500/20 border-gray-500/30',
    logo: '💾'
  },
  'MySQL': { 
    icon: Database, 
    color: 'text-blue-300', 
    bgColor: 'bg-blue-400/20 border-blue-400/30',
    logo: '🐬'
  },
  
  // Cloud & Deployment
  'Vercel': { 
    icon: Cloud, 
    color: 'text-white', 
    bgColor: 'bg-gray-600/20 border-gray-600/30',
    logo: '▲'
  },
  'Netlify': { 
    icon: Cloud, 
    color: 'text-teal-400', 
    bgColor: 'bg-teal-500/20 border-teal-500/30',
    logo: '🌐'
  },
  'AWS': { 
    icon: Cloud, 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-600/20 border-yellow-600/30',
    logo: '☁️'
  },
  'Docker': { 
    icon: Cloud, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20 border-blue-500/30',
    logo: '🐳'
  },
  'Streamlit': { 
    icon: Globe, 
    color: 'text-red-400', 
    bgColor: 'bg-red-500/20 border-red-500/30',
    logo: '🎈'
  },
  
  // APIs & Services
  'Stripe API': { 
    icon: Shield, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20 border-purple-500/30',
    logo: '💳'
  },
  'BeautifulSoup': { 
    icon: Code, 
    color: 'text-green-400', 
    bgColor: 'bg-green-500/20 border-green-500/30',
    logo: '🍲'
  },
  
  // Tools & Others
  'Git': { 
    icon: GitBranch, 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20 border-orange-500/30',
    logo: '🌿'
  },
  'GitHub': { 
    icon: GitBranch, 
    color: 'text-white', 
    bgColor: 'bg-gray-500/20 border-gray-500/30',
    logo: '🐙'
  },
  
  // Default fallback
  'default': { 
    icon: Package, 
    color: 'text-slate-400', 
    bgColor: 'bg-slate-500/20 border-slate-500/30',
    logo: '📦'
  }
};

export function ProjectTechStack({ technologies, className = "" }: TechStackProps) {
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
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {technologies.map((tech, index) => {
        const techInfo = techMapping[tech] || techMapping['default'];
        const Icon = techInfo.icon;
        
        return (
          <motion.div
            key={`${tech}-${index}`}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant="outline"
              className={`
                flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium
                border backdrop-blur-sm transition-all duration-300
                ${techInfo.bgColor}
                hover:shadow-lg hover:shadow-current/20
                cursor-default
              `}
            >
              {techInfo.logo ? (
                <span className="text-sm">{techInfo.logo}</span>
              ) : (
                <Icon className={`h-3 w-3 ${techInfo.color}`} />
              )}
              <span className={techInfo.color}>{tech}</span>
            </Badge>
          </motion.div>
        );
      })}
    </motion.div>
  );
}