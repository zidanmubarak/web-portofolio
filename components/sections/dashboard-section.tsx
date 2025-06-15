"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity,
  Code,
  Clock,
  Calendar,
  TrendingUp,
  Github,
  Zap,
  Target,
  Award,
  Flame,
  Star,
  GitFork,
  Users
} from 'lucide-react';
import { TechStackGrid } from '@/components/ui/tech-stack-grid';

// Types for GitHub API responses
interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const wakatimeStats = [
  {
    title: "Start Date",
    value: "December 01, 2024",
    color: "from-blue-400 to-cyan-400",
    icon: Calendar,
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    title: "End Date", 
    value: "December 07, 2024",
    color: "from-green-400 to-emerald-400",
    icon: Target,
    bgGradient: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30"
  },
  {
    title: "Coding Average",
    value: "8 hrs 45 mins",
    color: "from-purple-400 to-violet-400",
    icon: TrendingUp,
    bgGradient: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30"
  },
  {
    title: "Coding Time",
    value: "61 hrs 15 mins", 
    color: "from-orange-400 to-red-400",
    icon: Clock,
    bgGradient: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30"
  },
  {
    title: "Best Day",
    value: "December 05, 2024",
    subtitle: "12 hrs 30 mins",
    color: "from-pink-400 to-rose-400",
    icon: Award,
    bgGradient: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30"
  },
  {
    title: "All Time",
    value: "1,847 hrs 22 mins",
    color: "from-cyan-400 to-blue-400",
    icon: Flame,
    bgGradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30"
  }
];

// GitHub API functions
const fetchGitHubUser = async (username: string): Promise<GitHubUser | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
  }
  return null;
};

const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
  }
  return [];
};

// Generate contribution data (since GitHub's contribution API requires authentication)
const generateContributionData = (): ContributionDay[] => {
  const contributions: ContributionDay[] = [];
  const today = new Date();
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const count = Math.floor(Math.random() * 10); // Random contributions for demo
    const level = count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 6 ? 3 : 4;
    
    contributions.push({
      date: new Date(d).toISOString().split('T')[0],
      count,
      level
    });
  }
  
  return contributions;
};

// Contribution Heatmap Component
const ContributionHeatmap = ({ data }: { data: ContributionDay[] }) => {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  
  data.forEach((day, index) => {
    const dayOfWeek = new Date(day.date).getDay();
    
    if (index === 0) {
      // Fill empty days at the beginning of first week
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push({ date: '', count: 0, level: 0 });
      }
    }
    
    currentWeek.push(day);
    
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-800';
      case 1: return 'bg-green-900';
      case 2: return 'bg-green-700';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-400';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-1 min-w-fit">
        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm ${
                    day.date ? getLevelColor(day.level) : 'bg-transparent'
                  } hover:ring-2 hover:ring-white/50 transition-all duration-200 cursor-pointer`}
                  title={day.date ? `${day.count} contributions on ${day.date}` : ''}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function DashboardSection() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [contributionData, setContributionData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);

  const username = 'zidanmubarak';

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      
      const [user, repos] = await Promise.all([
        fetchGitHubUser(username),
        fetchGitHubRepos(username)
      ]);
      
      setGithubUser(user);
      setGithubRepos(repos);
      setContributionData(generateContributionData());
      setLoading(false);
    };

    if (mounted) {
      fetchGitHubData();
    }
  }, [mounted]);

  // Calculate GitHub stats
  const totalStars = githubRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = githubRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalContributions = contributionData.reduce((sum, day) => sum + day.count, 0);
  const thisWeekContributions = contributionData.slice(-7).reduce((sum, day) => sum + day.count, 0);

  const githubStats = [
    { 
      label: "Public Repos", 
      value: githubUser?.public_repos.toString() || "0", 
      color: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      icon: Code
    },
    { 
      label: "Total Stars", 
      value: totalStars.toString(), 
      color: "from-yellow-400 to-orange-400",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      icon: Star
    },
    { 
      label: "Total Forks", 
      value: totalForks.toString(), 
      color: "from-green-400 to-emerald-400",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      icon: GitFork
    },
    { 
      label: "Followers", 
      value: githubUser?.followers.toString() || "0", 
      color: "from-purple-400 to-violet-400",
      bgGradient: "from-purple-500/20 to-violet-500/20",
      borderColor: "border-purple-500/30",
      icon: Users
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Dashboard <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Overview</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-6">
              Real-time insights into my coding journey and development activities
            </p>
            <div className="inline-block p-4 bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-2xl border border-slate-700/50 backdrop-blur-lg shadow-2xl">
              <p className="text-blue-400 font-mono text-lg">
                🕒 Loading... (Jakarta Time)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 sm:py-20 lg:py-24 relative overflow-hidden">
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
          <div className="text-center mb-16 sm:mb-20">
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Dashboard{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Overview
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto mb-8 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Real-time insights into my coding journey and development activities
            </motion.p>
            
            <motion.div 
              className="inline-block p-6 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 rounded-3xl border border-slate-600/50 backdrop-blur-lg shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-mono text-xl font-bold" suppressHydrationWarning>
                🕒 {currentTime} (Jakarta Time)
              </p>
            </motion.div>
          </div>

          {/* Wakatime Statistics */}
          <div className="mb-20">
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-between mb-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-0">
                Wakatime{" "}
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  Statistics
                </span>
              </h3>
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 px-6 py-3 text-base rounded-full backdrop-blur-sm shadow-lg">
                <Activity className="mr-2 h-5 w-5 animate-pulse" />
                Live • Updated 2 hours ago
              </Badge>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {wakatimeStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className={`bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor} backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-3xl`}>
                      <CardContent className="p-8 relative">
                        <div className="absolute top-4 right-4 p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                          <IconComponent className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                        </div>
                        <div className="space-y-3">
                          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.title}</p>
                          <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-tight`}>
                            {stat.value}
                          </p>
                          {stat.subtitle && (
                            <p className="text-slate-400 text-lg font-medium">
                              {stat.subtitle}
                            </p>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Tech Stack Section */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Tech Stack Arsenal
                </span>
              </h4>
              <div className="bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-lg shadow-2xl">
                <TechStackGrid />
              </div>
            </motion.div>
          </div>

          {/* GitHub Statistics */}
          <div className="mb-16">
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-between mb-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-0">
                GitHub{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Analytics
                </span>
              </h3>
              <div className="flex items-center gap-4">
                <Badge className="bg-gradient-to-r from-gray-800/80 to-black/80 text-white border-gray-600/50 px-6 py-3 text-base rounded-full backdrop-blur-sm shadow-lg">
                  <Github className="mr-2 h-5 w-5" />
                  @{username}
                </Badge>
                {loading && (
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30 px-4 py-2 text-sm rounded-full">
                    <Activity className="mr-2 h-4 w-4 animate-spin" />
                    Fetching...
                  </Badge>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {githubStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.7 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="group perspective-1000"
                  >
                    <Card className={`bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor} backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-3xl`}>
                      <CardContent className="p-8 text-center relative">
                        <div className="mb-4 p-3 rounded-2xl bg-white/10 backdrop-blur-sm inline-block group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                        </div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">{stat.label}</p>
                        <p className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {loading ? '...' : stat.value}
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Contribution Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 border border-slate-600/50 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-0">
                      Contribution{" "}
                      <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        Activity
                      </span>
                    </CardTitle>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-slate-800 rounded-sm mr-3"></div>
                        <span className="text-slate-400 font-medium">Less</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-sm mr-3"></div>
                        <span className="text-slate-400 font-medium">More</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
                    {loading ? (
                      <div className="flex items-center justify-center h-32">
                        <Activity className="h-8 w-8 animate-spin text-green-400" />
                        <span className="ml-3 text-slate-400">Loading contribution data...</span>
                      </div>
                    ) : (
                      <ContributionHeatmap data={contributionData} />
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                    <p className="flex items-center">
                      <span className="text-xl mr-2">📊</span>
                      {totalContributions} contributions in the last year
                    </p>
                    <p className="text-green-400 font-medium">
                      {thisWeekContributions} contributions this week
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}