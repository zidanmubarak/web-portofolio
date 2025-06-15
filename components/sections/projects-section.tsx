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
  Zap
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
  { id: "all", label: "All Projects", icon: Globe, count: projects.length },
  { id: "Machine Learning", label: "Machine Learning", icon: Brain, count: projects.filter(p => p.category === "Machine Learning").length },
  { id: "Web Development", label: "Web Development", icon: Code2, count: projects.filter(p => p.category === "Web Development").length },
  { id: "Data Science", label: "Data Science", icon: Database, count: projects.filter(p => p.category === "Data Science").length }
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);

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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-blue-500/20 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium">Featured Work</span>
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
            </motion.div>

            <motion.h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
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
              className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              A collection of innovative solutions, from cutting-edge AI implementations to full-stack applications that solve real-world problems.
            </motion.p>
          </div>

          {/* Modern Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-16"
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
                      relative px-6 py-4 text-base font-medium rounded-2xl transition-all duration-300 group
                      ${isActive 
                        ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white border border-blue-500/30 shadow-lg" 
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-slate-700/30"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'}`} />
                      <span className="hidden sm:inline">{category.label}</span>
                      <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 text-xs ${isActive ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-slate-700/50 text-slate-400'}`}
                      >
                        {category.count}
                      </Badge>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-blue-500/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group relative"
                >
                  <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                    {/* Project Image with Overlay */}
                    <div className="relative overflow-hidden h-64">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        {project.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30 backdrop-blur-sm">
                            <Star className="mr-1 h-3 w-3 fill-current" />
                            FEATURED
                          </Badge>
                        )}
                        <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30 backdrop-blur-sm">
                          {project.category}
                        </Badge>
                      </div>

                      {/* Stats Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/80 text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span>{project.stats.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-blue-400" />
                            <span>{project.stats.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-red-400" />
                            <span>{project.stats.likes}</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md rounded-xl"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
                          asChild
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <Play className="h-4 w-4 mr-2" />
                            Demo
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                    
                    <CardContent className="p-8 flex flex-col">
                      {/* Project Title */}
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      {/* Project Description */}
                      <p className="text-slate-400 mb-6 leading-relaxed flex-grow">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack - PERBAIKAN DISINI */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-blue-400" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech && project.tech.length > 0 ? (
                            project.tech.map((tech, techIndex) => (
                              <motion.span 
                                key={`${project.id}-tech-${techIndex}`}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-slate-700/60 to-slate-600/60 text-slate-200 border border-slate-600/40 hover:border-blue-500/40 hover:text-blue-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300 cursor-default"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: techIndex * 0.05 }}
                              >
                                <div className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
                                {tech}
                              </motion.span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-sm italic">No tech stack specified</span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-blue-500/30 rounded-xl transition-all duration-300"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          asChild
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Floating glow effect */}
                  {hoveredProject === project.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10"
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

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Want to see more of my work?
              </h3>
              <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
                Explore my complete portfolio on GitHub and discover more innovative projects, open-source contributions, and experimental code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="https://github.com/zidanmubarak" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-3 h-6 w-6" />
                    View All Projects
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-blue-500/30 px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Sparkles className="mr-3 h-6 w-6" />
                  Let's Collaborate
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}