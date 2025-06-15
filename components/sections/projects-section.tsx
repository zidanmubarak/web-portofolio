"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Play,
  ArrowUpRight,
  Sparkles,
  Eye,
  Heart,
  Zap,
  Rocket,
  Lightning,
  Layers,
  Cpu
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Neural Network from Scratch",
    description: "A professional implementation of a neural network using only NumPy for MNIST digit classification with detailed explanations and visualizations.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Machine Learning",
    tech: ["Python", "NumPy", "Matplotlib", "Scikit-learn", "Jupyter", "Pandas", "TensorFlow"],
    github: "https://github.com/zidanmubarak/neural-network-scratch",
    demo: "https://neural-network-demo.vercel.app",
    stats: { stars: 124, views: "2.1k", likes: 89 }
  },
  {
    id: 2,
    title: "ridwanhalim.com",
    description: "My personal portfolio site, powered by Django and TailwindCSS, running on serverless architecture with modern design principles.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Django", "Python", "TailwindCSS", "PostgreSQL", "Vercel", "HTML5", "JavaScript"],
    github: "https://github.com/zidanmubarak/portfolio",
    demo: "https://ridwanhalim.com",
    stats: { stars: 87, views: "1.8k", likes: 65 }
  },
  {
    id: 3,
    title: "BeliMadu.com",
    description: "E-commerce hotspot for honey treats, built with Django and Bootstrap, featuring secure payment integration and inventory management.",
    image: "https://images.pexels.com/photos/4474052/pexels-photo-4474052.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Django", "Python", "Bootstrap", "SQLite", "JavaScript", "CSS3", "PayPal API"],
    github: "https://github.com/zidanmubarak/belimadu",
    demo: "https://belimadu.com",
    stats: { stars: 156, views: "3.2k", likes: 112 }
  },
  {
    id: 4,
    title: "PDDikti Data Vault",
    description: "API unlocking Indonesia's higher education data from PDDikti with comprehensive data processing and analytics capabilities.",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: ["Python", "FastAPI", "BeautifulSoup", "Pandas", "Requests", "JSON", "SQLAlchemy"],
    github: "https://github.com/zidanmubarak/pddikti-api",
    demo: "https://pddikti-api.com",
    stats: { stars: 203, views: "4.5k", likes: 178 }
  },
  {
    id: 5,
    title: "MLB API Stats Hub",
    description: "REST API and website loaded with Mobile Legends game stats, providing real-time data and comprehensive analytics dashboard.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Node.js", "Express.js", "MongoDB", "React", "Chart.js", "Axios", "JWT"],
    github: "https://github.com/zidanmubarak/mlb-stats",
    demo: "https://mlb-stats.com",
    stats: { stars: 98, views: "2.7k", likes: 73 }
  },
  {
    id: 6,
    title: "Bike Rental Insights Dashboard",
    description: "Interactive dashboard tying weather to bike rental trends with predictive analytics and beautiful data visualizations.",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: ["Python", "Streamlit", "Plotly", "Pandas", "Scikit-learn", "Seaborn", "NumPy"],
    github: "https://github.com/zidanmubarak/bike-rental-insights",
    demo: "https://bike-insights.streamlit.app",
    stats: { stars: 145, views: "3.8k", likes: 134 }
  }
];

const categories = [
  { id: "all", label: "All Projects", icon: Globe, count: projects.length, color: "from-slate-400 to-slate-500" },
  { id: "Machine Learning", label: "Machine Learning", icon: Brain, count: projects.filter(p => p.category === "Machine Learning").length, color: "from-purple-400 to-pink-500" },
  { id: "Web Development", label: "Web Development", icon: Code2, count: projects.filter(p => p.category === "Web Development").length, color: "from-blue-400 to-cyan-500" },
  { id: "Data Science", label: "Data Science", icon: Database, count: projects.filter(p => p.category === "Data Science").length, color: "from-green-400 to-emerald-500" }
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="min-h-screen py-20 lg:py-32 relative overflow-hidden bg-slate-950">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-20 right-20 w-4 h-4 bg-blue-400/30 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-6 h-6 bg-purple-400/30 rounded-full"
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Header Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-blue-500/20 rounded-full px-8 py-4 mb-8"
            >
              <Rocket className="h-6 w-6 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium text-lg">Featured Work</span>
              <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
            </motion.div>

            <motion.h2 
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              My{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-2xl sm:text-3xl text-slate-300 max-w-5xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              A collection of innovative solutions, from cutting-edge AI implementations to full-stack applications that solve real-world problems and push the boundaries of technology.
            </motion.p>
          </div>

          {/* Enhanced Modern Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      relative px-8 py-5 text-lg font-medium rounded-2xl transition-all duration-300 group border-2
                      ${isActive 
                        ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white border-blue-500/40 shadow-2xl" 
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50 border-slate-700/30 hover:border-blue-500/30"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${category.color} ${isActive ? 'bg-opacity-30' : 'bg-opacity-20'} transition-all duration-300`}>
                        <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'} transition-colors`} />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-3">
                          <span className="hidden sm:inline font-semibold">{category.label}</span>
                          <span className="sm:hidden font-semibold">{category.label.split(' ')[0]}</span>
                          <Badge 
                            variant="secondary" 
                            className={`text-sm font-bold ${isActive ? 'bg-blue-500/30 text-blue-200 border-blue-400/40' : 'bg-slate-700/50 text-slate-400 border-slate-600/50'} transition-all duration-300`}
                          >
                            {category.count}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border-2 border-blue-500/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Glow effect */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl -z-10" />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group relative"
                >
                  <Card className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-slate-700/50 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                    {/* Enhanced Project Image with Overlay */}
                    <div className="relative overflow-hidden h-72">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Enhanced Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                        {project.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-300 border-yellow-500/40 backdrop-blur-sm shadow-lg">
                            <Star className="mr-2 h-4 w-4 fill-current" />
                            FEATURED
                          </Badge>
                        )}
                        <Badge className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-300 border-blue-500/40 backdrop-blur-sm shadow-lg">
                          {project.category}
                        </Badge>
                      </div>

                      {/* Enhanced Stats Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white/90 text-sm">
                        <div className="flex items-center gap-6">
                          <motion.div 
                            className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="font-semibold">{project.stats.stars}</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Eye className="h-4 w-4 text-blue-400" />
                            <span className="font-semibold">{project.stats.views}</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Heart className="h-4 w-4 text-red-400" />
                            <span className="font-semibold">{project.stats.likes}</span>
                          </motion.div>
                        </div>
                      </div>

                      {/* Enhanced Hover Actions */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-sm"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            size="lg"
                            variant="secondary"
                            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md rounded-2xl shadow-xl"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-5 w-5 mr-3" />
                              Code
                            </a>
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-xl"
                            asChild
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <Rocket className="h-5 w-5 mr-3" />
                              Demo
                              <ArrowUpRight className="h-4 w-4 ml-2" />
                            </a>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    <CardContent className="p-8 flex flex-col">
                      {/* Enhanced Project Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      
                      {/* Enhanced Project Description */}
                      <p className="text-slate-400 mb-8 leading-relaxed flex-grow text-lg">
                        {project.description}
                      </p>
                      
                      {/* Enhanced Tech Stack */}
                      <div className="mb-8">
                        <h4 className="text-base font-semibold text-slate-300 mb-4 flex items-center">
                          <Lightning className="h-5 w-5 mr-3 text-blue-400" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {project.tech && project.tech.length > 0 ? (
                            project.tech.map((tech, techIndex) => (
                              <motion.span 
                                key={`${project.id}-tech-${techIndex}`}
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-slate-700/70 to-slate-600/70 text-slate-200 border border-slate-600/50 hover:border-blue-500/50 hover:text-blue-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 cursor-default"
                                whileHover={{ scale: 1.05, y: -2 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: techIndex * 0.05 }}
                              >
                                <div className="w-2 h-2 rounded-full bg-blue-400 mr-3 animate-pulse" />
                                {tech}
                              </motion.span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-sm italic">No tech stack specified</span>
                          )}
                        </div>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-4 mt-auto">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-blue-500/40 rounded-2xl transition-all duration-300 py-3"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-5 w-5 mr-3" />
                              View Code
                            </a>
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1"
                        >
                          <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 py-3"
                            asChild
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-5 w-5 mr-3" />
                              Live Demo
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Floating glow effect */}
                  {hoveredProject === project.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-24"
          >
            <div className="bg-gradient-to-r from-slate-900/60 via-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-16 shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              
              <div className="relative z-10">
                <motion.div
                  className="flex items-center justify-center gap-4 mb-8"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket className="h-10 w-10 text-blue-400" />
                  <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
                  <Rocket className="h-10 w-10 text-pink-400" />
                </motion.div>
                
                <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Want to see more of my work?
                </h3>
                <p className="text-slate-400 mb-12 text-xl max-w-3xl mx-auto leading-relaxed">
                  Explore my complete portfolio on GitHub and discover more innovative projects, open-source contributions, and experimental code that pushes the boundaries of technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                      asChild
                    >
                      <a href="https://github.com/zidanmubarak" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-4 h-7 w-7" />
                        View All Projects
                        <ArrowUpRight className="ml-3 h-6 w-6" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-blue-500/40 px-12 py-6 text-xl rounded-2xl transition-all duration-300"
                      onClick={() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <Lightning className="mr-4 h-7 w-7" />
                      Let's Collaborate
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}