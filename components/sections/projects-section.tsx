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
    description: "A professional implementation of a neural network using only NumPy for MNIST digit classification.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Machine Learning",
    tech: ["Python", "NumPy", "Matplotlib", "scikit-learn"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 2,
    title: "ridwanhalim.com",
    description: "My personal portfolio site, powered by Django and TailwindCSS, running on serverless on Vercel.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Django", "TailwindCSS", "PostgreSQL", "Vercel"],
    github: "https://github.com",
    demo: "https://ridwanhalim.com"
  },
  {
    id: 3,
    title: "BeliMadu.com",
    description: "E-commerce hotspot for honey treats, built with Django and Bootstrap, hosted on Vercel.",
    image: "https://images.pexels.com/photos/4474052/pexels-photo-4474052.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Django", "Bootstrap", "SQLite", "Vercel"],
    github: "https://github.com",
    demo: "https://belimadu.com"
  },
  {
    id: 4,
    title: "PDDikti Data Vault",
    description: "API unlocking Indonesia's higher education data from PDDikti.",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: ["Python", "FastAPI", "BeautifulSoup", "pandas"],
    github: "https://github.com",
    demo: "https://pddikti-api.com"
  },
  {
    id: 5,
    title: "MLB API Stats Hub",
    description: "REST API and website loaded with Mobile Legends game stats.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["Node.js", "Express", "MongoDB", "React"],
    github: "https://github.com",
    demo: "https://mlb-stats.com"
  },
  {
    id: 6,
    title: "Bike Rental Insights Dashboard",
    description: "Interactive dashboard tying weather to bike rental trends.",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: ["Python", "Streamlit", "Plotly", "pandas"],
    github: "https://github.com",
    demo: "https://bike-insights.com"
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
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">My <span className="text-blue-400">Projects</span></h1>
            <p className="text-slate-400">
              A bunch of projects I've built, from cool client apps to open-source stuff I'm super proud of.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                        ⭐ FEATURED
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Github className="mr-2 h-3 w-3" />
                        Code
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Live Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>1</Button>
              <Button variant="ghost" size="sm">2</Button>
              <Button variant="ghost" size="sm">3</Button>
              <span className="flex items-center px-2 text-slate-400">...</span>
              <Button variant="ghost" size="sm">8</Button>
              <Button variant="ghost" size="sm">›</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}