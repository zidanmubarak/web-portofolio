"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Github,
  Star,
  GitFork,
  Users,
  BookOpen,
  TrendingUp,
  ExternalLink
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
  mostUsedLanguages: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
}

const GITHUB_USERNAME = 'zidanmubarak';

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  const fetchGitHubStats = async () => {
    try {
      setLoading(true);
      
      // Untuk demo, menggunakan mock data yang realistis
      // Dalam implementasi nyata, gunakan GitHub API dengan Personal Access Token
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
        mostUsedLanguages: [
          { name: 'Python', percentage: 35.2, color: '#3776ab' },
          { name: 'JavaScript', percentage: 28.7, color: '#f7df1e' },
          { name: 'TypeScript', percentage: 18.4, color: '#3178c6' },
          { name: 'HTML', percentage: 8.9, color: '#e34f26' },
          { name: 'CSS', percentage: 5.1, color: '#1572b6' },
          { name: 'Other', percentage: 3.7, color: '#6b7280' }
        ]
      };
      
      setStats(mockStats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 text-center">
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

  if (!stats) {
    return (
      <div className="text-center text-slate-400">
        Failed to load GitHub statistics
      </div>
    );
  }

  const mainStats = [
    { 
      label: "Public Repos", 
      value: stats.publicRepos.toLocaleString(), 
      color: "text-blue-400",
      icon: BookOpen
    },
    { 
      label: "Total Stars", 
      value: stats.totalStars.toLocaleString(), 
      color: "text-yellow-400",
      icon: Star
    },
    { 
      label: "Followers", 
      value: stats.followers.toLocaleString(), 
      color: "text-green-400",
      icon: Users
    },
    { 
      label: "Contributions", 
      value: stats.contributionsThisYear.toLocaleString(), 
      color: "text-purple-400",
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {mainStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm card-hover shadow-lg">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mb-2">{stat.label}</p>
                  <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Stats */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
              Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Current Streak</span>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                {stats.currentStreak} days
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Longest Streak</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {stats.longestStreak} days
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Commits</span>
              <span className="text-white font-semibold">{stats.totalCommits.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Forks</span>
              <span className="text-white font-semibold">{stats.totalForks.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Language Stats */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <Code className="mr-2 h-5 w-5 text-blue-400" />
              Most Used Languages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.mostUsedLanguages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-slate-300 text-sm">{lang.name}</span>
                  </div>
                  <span className="text-slate-400 text-sm">{lang.percentage}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: lang.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* GitHub Profile Link */}
      <div className="text-center">
        <Button
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
          asChild
        >
          <a 
            href={`https://github.com/${GITHUB_USERNAME}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github className="mr-2 h-4 w-4" />
            View Full GitHub Profile
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}