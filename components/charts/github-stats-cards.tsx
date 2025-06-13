"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  GitFork, 
  Eye, 
  Code, 
  Users, 
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  contributionsThisYear: number;
  longestStreak: number;
  currentStreak: number;
  mostUsedLanguage: string;
  accountAge: number;
}

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export function GitHubStatsCards() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [topRepos, setTopRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  const fetchGitHubStats = async () => {
    try {
      setLoading(true);
      
      // Mock data untuk demo - dalam implementasi nyata gunakan GitHub API
      const mockStats: GitHubStats = {
        publicRepos: 42,
        followers: 156,
        following: 89,
        totalStars: 234,
        totalForks: 67,
        totalCommits: 1247,
        contributionsThisYear: 892,
        longestStreak: 45,
        currentStreak: 12,
        mostUsedLanguage: "Python",
        accountAge: 3
      };

      const mockRepos: Repository[] = [
        {
          name: "neural-network-scratch",
          description: "Neural network implementation from scratch using NumPy",
          stars: 45,
          forks: 12,
          language: "Python",
          url: "https://github.com/zidanmubarak/neural-network-scratch"
        },
        {
          name: "ai-portfolio",
          description: "Modern AI/ML portfolio website built with Next.js",
          stars: 23,
          forks: 8,
          language: "TypeScript",
          url: "https://github.com/zidanmubarak/ai-portfolio"
        },
        {
          name: "pddikti-api",
          description: "REST API for Indonesia's higher education data",
          stars: 67,
          forks: 15,
          language: "Python",
          url: "https://github.com/zidanmubarak/pddikti-api"
        }
      ];

      setStats(mockStats);
      setTopRepos(mockRepos);
      
      // Untuk implementasi nyata dengan GitHub API:
      /*
      const [userResponse, reposResponse] = await Promise.all([
        fetch('https://api.github.com/users/zidanmubarak', {
          headers: {
            'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
          }
        }),
        fetch('https://api.github.com/users/zidanmubarak/repos?sort=stars&per_page=6', {
          headers: {
            'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
          }
        })
      ]);

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();
      
      // Process and set the data
      */
      
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-8 bg-slate-700 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      label: "Public Repos",
      value: stats.publicRepos,
      icon: Code,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      label: "Followers",
      value: stats.followers,
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/20"
    },
    {
      label: "Total Stars",
      value: stats.totalStars,
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20"
    },
    {
      label: "Total Forks",
      value: stats.totalForks,
      icon: GitFork,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    },
    {
      label: "Contributions",
      value: stats.contributionsThisYear,
      icon: TrendingUp,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20"
    },
    {
      label: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: Calendar,
      color: "text-red-400",
      bgColor: "bg-red-500/20"
    },
    {
      label: "Longest Streak",
      value: `${stats.longestStreak} days`,
      icon: Award,
      color: "text-pink-400",
      bgColor: "bg-pink-500/20"
    },
    {
      label: "Account Age",
      value: `${stats.accountAge} years`,
      icon: Calendar,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Top Repositories */}
      <div>
        <h4 className="text-xl font-bold text-white mb-6">Top Repositories</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topRepos.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 shadow-lg hover:shadow-xl h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-semibold text-white text-lg truncate">
                      {repo.name}
                    </h5>
                    <Badge variant="outline" className="text-xs bg-slate-800/50 text-slate-300 border-slate-600">
                      {repo.language}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        {repo.stars}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-4 w-4 mr-1 text-blue-400" />
                        {repo.forks}
                      </div>
                    </div>
                    
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Language Stats */}
      <div>
        <h4 className="text-xl font-bold text-white mb-6">Most Used Language</h4>
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {stats.mostUsedLanguage}
                </div>
                <p className="text-slate-400">Primary programming language</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}