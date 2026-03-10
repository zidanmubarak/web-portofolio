"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Star,
  GitFork,
  Users,
  Activity,
  ExternalLink,
} from "lucide-react";
import { Icon } from "@iconify/react";

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
}

const techStack = [
  { name: "Python", icon: "logos:python" },
  { name: "TensorFlow", icon: "logos:tensorflow" },
  { name: "PyTorch", icon: "logos:pytorch-icon" },
  { name: "Scikit-learn", icon: "simple-icons:scikitlearn" },
  { name: "Pandas", icon: "simple-icons:pandas" },
  { name: "NumPy", icon: "logos:numpy" },
  { name: "Django", icon: "logos:django-icon" },
  { name: "FastAPI", icon: "logos:fastapi-icon" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "React", icon: "logos:react" },
  { name: "PostgreSQL", icon: "logos:postgresql" },
];

export function DashboardSection() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    forks: 0,
    followers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/zidanmubarak"),
          fetch(
            "https://api.github.com/users/zidanmubarak/repos?per_page=100"
          ),
        ]);

        if (userRes.ok && reposRes.ok) {
          const user: GitHubUser = await userRes.json();
          const repos: GitHubRepo[] = await reposRes.json();

          const totalStars = repos.reduce(
            (sum, repo) => sum + repo.stargazers_count,
            0
          );
          const totalForks = repos.reduce(
            (sum, repo) => sum + repo.forks_count,
            0
          );

          setStats({
            repos: user.public_repos,
            stars: totalStars,
            forks: totalForks,
            followers: user.followers,
          });
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const statItems = [
    { label: "Repositories", value: stats.repos, icon: Code },
    { label: "Stars", value: stats.stars, icon: Star },
    { label: "Forks", value: stats.forks, icon: GitFork },
    { label: "Followers", value: stats.followers, icon: Users },
  ];

  if (!mounted) return null;

  return (
    <section className="py-24 lg:py-32 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-6">
            Dashboard
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
            A snapshot of my development activity and the technologies I work
            with daily.
          </p>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-neutral-500" />
              <h3 className="text-xl font-medium text-white">GitHub Stats</h3>
            </div>
            <a
              href="https://github.com/zidanmubarak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              View Profile
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon className="w-5 h-5 text-neutral-500" />
                  <span className="text-sm text-neutral-400">{stat.label}</span>
                </div>
                <p className="text-3xl font-medium text-white">
                  {loading ? "—" : stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-5 h-5 text-neutral-500" />
            <h3 className="text-xl font-medium text-white">Tech Stack</h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors group"
              >
                <Icon
                  icon={tech.icon}
                  className="w-8 h-8 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm text-neutral-400">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-xl border border-neutral-800 text-center"
        >
          <p className="text-xl text-neutral-300 italic mb-4">
            "Thoughts give rise to actions, actions form habits, habits shape
            character, and character creates destiny."
          </p>
          <p className="text-neutral-500">— Aristotle</p>
        </motion.div>
      </div>
    </section>
  );
}
