"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Github, 
  Star,
  Filter,
  Code2,
  Brain,
  Database,
  Globe,
  Zap,
  Server,
  Cloud,
  Layers
} from 'lucide-react';

// Tech stack icons mapping
const techIcons: { [key: string]: { icon: React.ElementType; color: string; emoji: string } } = {
  // Programming Languages
  'Python': { icon: Code2, color: 'text-blue-400', emoji: '🐍' },
  'JavaScript': { icon: Code2, color: 'text-yellow-400', emoji: '⚡' },
  'TypeScript': { icon: Code2, color: 'text-blue-300', emoji: '📘' },
  'Java': { icon: Code2, color: 'text-orange-400', emoji: '☕' },
  
  // Frontend
  'React': { icon: Layers, color: 'text-cyan-400', emoji: '⚛️' },
  'Next.js': { icon: Globe, color: 'text-white', emoji: '▲' },
  'TailwindCSS': { icon: Layers, color: 'text-teal-400', emoji: '🎨' },
  'Bootstrap': { icon: Layers, color: 'text-purple-400', emoji: '🅱️' },
  'HTML': { icon: Code2, color: 'text-orange-500', emoji: '🌐' },
  'CSS': { icon: Layers, color: 'text-blue-500', emoji: '🎨' },
  'Streamlit': { icon: Globe, color: 'text-red-400', emoji: '📊' },
  
  // Backend
  'Django': { icon: Server, color: 'text-green-400', emoji: '🎸' },
  'FastAPI': { icon: Zap, color: 'text-teal-400', emoji: '🚀' },
  'Node.js': { icon: Server, color: 'text-green-300', emoji: '🟢' },
  'Express': { icon: Server, color: 'text-gray-300', emoji: '🚂' },
  'Flask': { icon: Server, color: 'text-blue-300', emoji: '🌶️' },
  
  // Databases
  'PostgreSQL': { icon: Database, color: 'text-blue-400', emoji: '🐘' },
  'MongoDB': { icon: Database, color: 'text-green-400', emoji: '🍃' },
  'SQLite': { icon: Database, color: 'text-gray-400', emoji: '💾' },
  'Redis': { icon: Database, color: 'text-red-400', emoji: '🔴' },
  'MySQL': { icon: Database, color: 'text-blue-300', emoji: '🐬' },
  
  // AI/ML
  'TensorFlow': { icon: Brain, color: 'text-orange-300', emoji: '🧠' },
  'PyTorch': { icon: Brain, color: 'text-red-400', emoji: '🔥' },
  'scikit-learn': { icon: Brain, color: 'text-blue-300', emoji: '📊' },
  'NumPy': { icon: Brain, color: 'text-blue-400', emoji: '🔢' },
  'pandas': { icon: Database, color: 'text-purple-400', emoji: '🐼' },
  'Matplotlib': { icon: Brain, color: 'text-green-400', emoji: '📈' },
  'Plotly': { icon: Brain, color: 'text-blue-500', emoji: '📊' },
  'Jupyter': { icon: Code2, color: 'text-orange-400', emoji: '📓' },
  'OpenCV': { icon: Brain, color: 'text-green-500', emoji: '👁️' },
  
  // Cloud & DevOps
  'Vercel': { icon: Cloud, color: 'text-white', emoji: '▲' },
  'Netlify': { icon: Cloud, color: 'text-teal-400', emoji: '🌐' },
  'AWS': { icon: Cloud, color: 'text-yellow-400', emoji: '☁️' },
  'Docker': { icon: Cloud, color: 'text-blue-400', emoji: '🐳' },
  'Heroku': { icon: Cloud, color: 'text-purple-500', emoji: '🟣' },
  
  // APIs & Tools
  'Stripe API': { icon: Zap, color: 'text-purple-400', emoji: '💳' },
  'BeautifulSoup': { icon: Code2, color: 'text-yellow-300', emoji: '🍲' },
  'Chart.js': { icon: Brain, color: 'text-pink-400', emoji: '📊' },
  'REST API': { icon: Zap, color: 'text-blue-400', emoji: '🔗' },
  'GraphQL': { icon: Zap, color: 'text-pink-500', emoji: '📡' },
  
  // Default fallback
  'default': { icon: Code2, color: 'text-gray-400', emoji: '⚙️' }
};

const projects = [
  {
    id: 1,
    title: "Neural Network from Scratch",
    description: "A professional implementation of a neural network using only NumPy for MNIST digit classification with 95% accuracy and comprehensive visualization.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Machine Learning",
    tech: ["Python", "NumPy", "Matplotlib", "scikit-learn", "Jupyter", "OpenCV"],
    github: "https://github.com/zidanmubarak/neural-network-scratch",
    demo: "https://neural-network-demo.vercel.app",
    stars: 45,
    techDetails: {
      "Python": "Core programming language for ML implementation",
      "NumPy": "Matrix operations and mathematical computations",
      "Matplotlib": "Data visualization and training progress plots",
      "scikit-learn": "Dataset loading and preprocessing utilities",
      "Jupyter": "Interactive development and experimentation",
      "OpenCV": "Image processing and computer vision tasks"
    }
  },
  {
    id: 2,
    title: "ridwanhalim.com",
    description: "My personal portfolio website built with Django and modern web technologies, featuring responsive design and optimized performance.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Django", "TailwindCSS", "PostgreSQL", "Vercel", "Python", "HTML", "CSS"],
    github: "https://github.com/zidanmubarak/portfolio",
    demo: "https://ridwanhalim.com",
    stars: 23,
    techDetails: {
      "Django": "Backend framework for robust web application",
      "TailwindCSS": "Utility-first CSS framework for styling",
      "PostgreSQL": "Relational database for data storage",
      "Vercel": "Serverless deployment platform",
      "Python": "Server-side programming language",
      "HTML": "Markup structure and semantic elements",
      "CSS": "Custom styling and animations"
    }
  },
  {
    id: 3,
    title: "BeliMadu.com",
    description: "E-commerce platform for honey products with integrated payment system, inventory management, and responsive user interface.",
    image: "https://images.pexels.com/photos/4474052/pexels-photo-4474052.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Django", "Bootstrap", "SQLite", "Stripe API", "JavaScript", "Python"],
    github: "https://github.com/zidanmubarak/belimadu",
    demo: "https://belimadu.com",
    stars: 18,
    techDetails: {
      "Django": "Full-stack web framework for e-commerce logic",
      "Bootstrap": "Responsive UI components and grid system",
      "SQLite": "Lightweight database for product catalog",
      "Stripe API": "Secure payment processing integration",
      "JavaScript": "Interactive frontend functionality",
      "Python": "Backend business logic and data processing"
    }
  },
  {
    id: 4,
    title: "PDDikti Data Vault",
    description: "REST API for accessing Indonesia's higher education data with advanced filtering, caching, and real-time updates.",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: ["Python", "FastAPI", "BeautifulSoup", "pandas", "Redis", "PostgreSQL"],
    github: "https://github.com/zidanmubarak/pddikti-api",
    demo: "https://pddikti-api.com",
    stars: 67,
    techDetails: {
      "Python": "Core language for data processing and API development",
      "FastAPI": "High-performance API framework with automatic docs",
      "BeautifulSoup": "Web scraping and HTML parsing",
      "pandas": "Data manipulation and analysis",
      "Redis": "Caching layer for improved performance",
      "PostgreSQL": "Robust data storage and querying"
    }
  },
  {
    id: 5,
    title: "MLB API Stats Hub",
    description: "Comprehensive REST API and dashboard for Mobile Legends game statistics with real-time data visualization and analytics.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Node.js", "Express", "MongoDB", "React", "Chart.js", "JavaScript"],
    github: "https://github.com/zidanmubarak/mlb-stats",
    demo: "https://mlb-stats.com",
    stars: 34,
    techDetails: {
      "Node.js": "JavaScript runtime for server-side development",
      "Express": "Web framework for API endpoints",
      "MongoDB": "NoSQL database for flexible data storage",
      "React": "Frontend library for interactive UI",
      "Chart.js": "Data visualization and statistics charts",
      "JavaScript": "Full-stack development language"
    }
  },
  {
    id: 6,
    title: "Bike Rental Insights Dashboard",
    description: "Interactive analytics dashboard correlating weather patterns with bike rental trends using machine learning algorithms.",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: ["Python", "Streamlit", "Plotly", "pandas", "scikit-learn", "NumPy"],
    github: "https://github.com/zidanmubarak/bike-rental-insights",
    demo: "https://bike-insights.streamlit.app",
    stars: 29,
    techDetails: {
      "Python": "Data science and machine learning implementation",
      "Streamlit": "Interactive web app framework for data science",
      "Plotly": "Advanced interactive data visualizations",
      "pandas": "Data cleaning and statistical analysis",
      "scikit-learn": "Machine learning models and predictions",
      "NumPy": "Numerical computing and array operations"
    }
  }
];

const categories = [
  { id: "all", label: "All Projects", icon: Globe },
  { id: "Machine Learning", label: "Machine Learning", icon: Brain },
  { id: "Web Development", label: "Web Development", icon: Code2 },
  { id: "Data Science", label: "Data Science", icon: Database }
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const toggleTechDetails = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const getTechIcon = (techName: string) => {
    return techIcons[techName] || techIcons['default'];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="min-h-screen py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              A collection of projects I've built, from innovative AI solutions to full-stack applications that solve real-world problems.
            </p>
          </div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-sm sm:text-base transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                </Button>
              );
            })}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 overflow-hidden h-full shadow-xl hover:shadow-2xl">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      {project.featured && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm shadow-lg">
                          ⭐ FEATURED
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-slate-800/80 text-slate-200 text-xs backdrop-blur-sm">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {project.stars}
                      </Badge>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="outline" className="bg-blue-500/20 border-blue-500/50 text-blue-300 text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-4 line-clamp-3 flex-grow text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack Preview */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.slice(0, 4).map((tech) => {
                          const techInfo = getTechIcon(tech);
                          return (
                            <div
                              key={tech}
                              className="flex items-center space-x-1 px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
                            >
                              <span className="text-xs">{techInfo.emoji}</span>
                              <span className={`text-xs font-medium ${techInfo.color}`}>
                                {tech}
                              </span>
                            </div>
                          );
                        })}
                        {project.tech.length > 4 && (
                          <Badge variant="outline" className="text-xs bg-slate-800/50 text-slate-400 border-slate-600">
                            +{project.tech.length - 4} more
                          </Badge>
                        )}
                      </div>

                      {/* Tech Details Toggle */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTechDetails(project.id)}
                        className="text-blue-400 hover:text-blue-300 p-0 h-auto text-xs"
                      >
                        {expandedProject === project.id ? 'Hide Tech Details' : 'Show Tech Details'}
                      </Button>

                      {/* Expanded Tech Details */}
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 space-y-2 border-t border-slate-700/50 pt-3"
                        >
                          {project.tech.map((tech) => {
                            const techInfo = getTechIcon(tech);
                            const description = project.techDetails[tech];
                            return (
                              <div key={tech} className="flex items-start space-x-3 p-2 rounded-lg bg-slate-800/30">
                                <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
                                  <span className="text-sm">{techInfo.emoji}</span>
                                  <span className={`text-sm font-medium ${techInfo.color}`}>
                                    {tech}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  {description}
                                </p>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 text-xs sm:text-sm border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1 sm:mr-2 h-3 w-3" />
                          Code
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 sm:mr-2 h-3 w-3" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16"
          >
            <p className="text-slate-400 mb-6 text-sm sm:text-base">
              Want to see more of my work?
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="https://github.com/zidanmubarak" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View All on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}