"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Icon } from "@iconify/react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Climate Agriculture ML Analysis",
    description:
      "Machine learning analysis for climate-based agriculture using Jupyter Notebook. Predicts agricultural yields based on climate data.",
    category: "Machine Learning",
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
    github: "https://github.com/zidanmubarak/climate-agriculture-ml-analysis",
    image: "/images/projects/climate-agriculture.png",
  },
  {
    id: 2,
    title: "NusantaraGo-ML",
    description:
      "Intelligent tourism recommendation app for Indonesia using ML. Combines machine learning with web development.",
    category: "Machine Learning",
    tech: ["Python", "Flask", "TensorFlow", "Scikit-learn"],
    github: "https://github.com/NusantaraGo/NusantaraGo-ML",
    image: "/images/projects/nusantarago.png",
  },
  {
    id: 3,
    title: "Toko Buku CLI CRUD",
    description:
      "Command Line Interface application for bookstore management with complete CRUD operations.",
    category: "Python Development",
    tech: ["Python", "SQLite", "CLI"],
    github: "https://github.com/zidanmubarak/toko-buku-cli-crud",
    image: "/images/projects/tokobuku-cli.png",
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description:
      "Interactive data visualization dashboard using Python. Displays various charts for comprehensive data analysis.",
    category: "Data Science",
    tech: ["Python", "Matplotlib", "Plotly", "Pandas"],
    github: "https://github.com/zidanmubarak/data-visualization-dashboard",
    image: "/images/projects/data-visualization.png",
  },
  {
    id: 5,
    title: "Guest Book System",
    description:
      "Web-based guest book system using PHP. Simple application to manage and display visitor messages.",
    category: "Web Development",
    tech: ["PHP", "MySQL", "Bootstrap"],
    github: "https://github.com/zidanmubarak/guest-book-system",
    image: "/images/projects/guestbook.png",
  },
  {
    id: 6,
    title: "Portfolio Website",
    description:
      "Personal portfolio website showcasing projects, skills, and experience. Built with modern technologies.",
    category: "Web Development",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/zidanmubarak/web-portofolio",
    demo: "https://zidanmubarak.vercel.app",
    image: "/images/projects/web-portofolio.png",
  },
];

const techIcons: Record<string, string> = {
  Python: "logos:python",
  Pandas: "simple-icons:pandas",
  "Scikit-learn": "simple-icons:scikitlearn",
  Matplotlib: "logos:matplotlib-icon",
  Flask: "logos:flask",
  TensorFlow: "logos:tensorflow",
  SQLite: "logos:sqlite",
  CLI: "mdi:console",
  Plotly: "simple-icons:plotly",
  PHP: "logos:php",
  MySQL: "logos:mysql",
  Bootstrap: "logos:bootstrap",
  "Next.js": "logos:nextjs-icon",
  TypeScript: "logos:typescript-icon",
  "Tailwind CSS": "logos:tailwindcss-icon",
};

export function ProjectsSection() {
  return (
    <section className="py-24 lg:py-32 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-6">
            Projects
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
            A collection of work from machine learning models to full-stack
            applications. Each project represents a unique challenge solved.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="group h-full rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300 overflow-hidden bg-neutral-950">
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium text-white bg-black/60 backdrop-blur-sm border border-neutral-700 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-medium text-white mb-2 group-hover:text-neutral-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {project.tech.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1.5 px-2 py-1 text-xs text-neutral-400 bg-neutral-900 rounded"
                      >
                        {techIcons[tech] && (
                          <Icon icon={techIcons[tech]} className="w-3.5 h-3.5" />
                        )}
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white hover:text-neutral-300 transition-colors ml-auto"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/zidanmubarak?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
          >
            View all projects on GitHub
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
