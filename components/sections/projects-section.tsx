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
  Globe
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Neural Network from Scratch",
    description: "A professional implementation of a neural network using only NumPy for MNIST digit classification with 95% accuracy.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Machine Learning",
    tech: [
      { name: "Python", icon: "🐍", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "NumPy", icon: "🔢", color: "bg-blue-400/20 text-blue-300 border-blue-400/30" },
      { name: "Matplotlib", icon: "📊", color: "bg-green-500/20 text-green-400 border-green-500/30" },
      { name: "Jupyter", icon: "📓", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" }
    ],
    github: "https://github.com/zidanmubarak/neural-network-scratch",
    demo: "https://neural-network-demo.vercel.app",
    stars: 45
  },
  {
    id: 2,
    title: "ridwanhalim.com",
    description: "My personal portfolio site, powered by Django and TailwindCSS, running serverless on Vercel with modern design.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: [
      { name: "Django", icon: "🎸", color: "bg-green-500/20 text-green-400 border-green-500/30" },
      { name: "TailwindCSS", icon: "🎨", color: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
      { name: "PostgreSQL", icon: "🐘", color: "bg-blue-600/20 text-blue-400 border-blue-600/30" },
      { name: "Vercel", icon: "▲", color: "bg-gray-500/20 text-white border-gray-500/30" }
    ],
    github: "https://github.com/zidanmubarak/portfolio",
    demo: "https://ridwanhalim.com",
    stars: 23
  },
  {
    id: 3,
    title: "BeliMadu.com",
    description: "E-commerce platform for honey products with payment integration, inventory management, and responsive design.",
    image: "https://images.pexels.com/photos/4474052/pexels-photo-4474052.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: [
      { name: "Django", icon: "🎸", color: "bg-green-500/20 text-green-400 border-green-500/30" },
      { name: "Bootstrap", icon: "🅱️", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
      { name: "SQLite", icon: "💾", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
      { name: "JavaScript", icon: "⚡", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" }
    ],
    github: "https://github.com/zidanmubarak/belimadu",
    demo: "https://belimadu.com",
    stars: 18
  },
  {
    id: 4,
    title: "PDDikti Data Vault",
    description: "REST API for accessing Indonesia's higher education data with advanced filtering and real-time updates.",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: [
      { name: "Python", icon: "🐍", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "FastAPI", icon: "🚀", color: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
      { name: "BeautifulSoup", icon: "🍲", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
      { name: "pandas", icon: "🐼", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" }
    ],
    github: "https://github.com/zidanmubarak/pddikti-api",
    demo: "https://pddikti-api.com",
    stars: 67
  },
  {
    id: 5,
    title: "MLB API Stats Hub",
    description: "Comprehensive REST API and dashboard for Mobile Legends game statistics with real-time data visualization.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: [
      { name: "Node.js", icon: "🟢", color: "bg-green-400/20 text-green-300 border-green-400/30" },
      { name: "Express", icon: "🚂", color: "bg-gray-400/20 text-gray-300 border-gray-400/30" },
      { name: "MongoDB", icon: "🍃", color: "bg-green-600/20 text-green-400 border-green-600/30" },
      { name: "React", icon: "⚛️", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" }
    ],
    github: "https://github.com/zidanmubarak/mlb-stats",
    demo: "https://mlb-stats.com",
    stars: 34
  },
  {
    id: 6,
    title: "Bike Rental Insights Dashboard",
    description: "Interactive analytics dashboard correlating weather patterns with bike rental trends using machine learning.",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: [
      { name: "Python", icon: "🐍", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Streamlit", icon: "🌊", color: "bg-red-500/20 text-red-400 border-red-500/30" },
      { name: "Plotly", icon: "📈", color: "bg-blue-400/20 text-blue-300 border-blue-400/30" },
      { name: "scikit-learn", icon: "📊", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" }
    ],
    github: "https://github.com/zidanmubarak/bike-rental-insights",
    demo: "https://bike-insights.streamlit.app",
    stars: 29
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
                    
                    {/* Tech Stack with Icons */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <div
                          key={tech.name}
                          className={`
                            flex items-center space-x-1 px-2 py-1 rounded-full text-xs
                            ${tech.color} border backdrop-blur-sm
                            hover:scale-105 transition-transform duration-200
                          `}
                        >
                          <span className="text-sm">{tech.icon}</span>
                          <span className="font-medium">{tech.name}</span>
                        </div>
                      ))}
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