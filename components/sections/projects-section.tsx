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
  Play
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Neural Network from Scratch",
    description: "A professional implementation of a neural network using only NumPy for MNIST digit classification with detailed explanations and visualizations.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Machine Learning",
    tech: ["Python", "NumPy", "Matplotlib", "Scikit-learn", "Jupyter", "Pandas"],
    github: "https://github.com/zidanmubarak/neural-network-scratch",
    demo: "https://neural-network-demo.vercel.app"
  },
  {
    id: 2,
    title: "ridwanhalim.com",
    description: "My personal portfolio site, powered by Django and TailwindCSS, running on serverless architecture with modern design principles.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Django", "Python", "TailwindCSS", "PostgreSQL", "Vercel", "HTML5"],
    github: "https://github.com/zidanmubarak/portfolio",
    demo: "https://ridwanhalim.com"
  },
  {
    id: 3,
    title: "BeliMadu.com",
    description: "E-commerce hotspot for honey treats, built with Django and Bootstrap, featuring secure payment integration and inventory management.",
    image: "https://images.pexels.com/photos/4474052/pexels-photo-4474052.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Django", "Python", "Bootstrap", "SQLite", "JavaScript", "CSS3"],
    github: "https://github.com/zidanmubarak/belimadu",
    demo: "https://belimadu.com"
  },
  {
    id: 4,
    title: "PDDikti Data Vault",
    description: "API unlocking Indonesia's higher education data from PDDikti with comprehensive data processing and analytics capabilities.",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: ["Python", "FastAPI", "BeautifulSoup", "Pandas", "Requests", "JSON"],
    github: "https://github.com/zidanmubarak/pddikti-api",
    demo: "https://pddikti-api.com"
  },
  {
    id: 5,
    title: "MLB API Stats Hub",
    description: "REST API and website loaded with Mobile Legends game stats, providing real-time data and comprehensive analytics dashboard.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Node.js", "Express.js", "MongoDB", "React", "Chart.js", "Axios"],
    github: "https://github.com/zidanmubarak/mlb-stats",
    demo: "https://mlb-stats.com"
  },
  {
    id: 6,
    title: "Bike Rental Insights Dashboard",
    description: "Interactive dashboard tying weather to bike rental trends with predictive analytics and beautiful data visualizations.",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: ["Python", "Streamlit", "Plotly", "Pandas", "Scikit-learn", "Seaborn"],
    github: "https://github.com/zidanmubarak/bike-rental-insights",
    demo: "https://bike-insights.streamlit.app"
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
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              A collection of projects I've built, from innovative AI solutions to full-stack applications that solve real-world problems.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-sm sm:text-base ${
                    selectedCategory === category.id
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                </Button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  {/* Project Image */}
                  <div className="relative overflow-hidden h-48 sm:h-56">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-xs sm:text-sm">
                        <Star className="mr-1 h-3 w-3" />
                        FEATURED
                      </Badge>
                    )}
                    
                    {/* Category Badge */}
                    <Badge className="absolute top-3 left-3 bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      {project.category}
                    </Badge>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-background/90 hover:bg-background"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 sm:p-6 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-4 text-sm sm:text-base leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack - Fixed styling */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={`${project.id}-${techIndex}`}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-600/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 text-xs sm:text-sm border-slate-600 text-slate-300 hover:bg-slate-800"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1 sm:mr-2 h-3 w-3" />
                          View Code
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 sm:mr-2 h-3 w-3" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

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
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
              asChild
            >
              <a href="https://github.com/zidanmubarak" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View More on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}