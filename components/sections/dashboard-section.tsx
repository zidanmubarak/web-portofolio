"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity,
  Code,
  Clock,
  Calendar,
  TrendingUp,
  Github,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { TechStackMarquee } from '@/components/ui/tech-stack-marquee';
import { GitHubContributionGraph } from '@/components/charts/github-contribution-graph';
import { GitHubStatsCards } from '@/components/charts/github-stats-cards';

const wakatimeStats = [
  {
    title: "Start Date",
    value: "December 01, 2024",
    color: "text-blue-400"
  },
  {
    title: "End Date", 
    value: "December 07, 2024",
    color: "text-green-400"
  },
  {
    title: "Coding Average",
    value: "8 hrs 45 mins",
    color: "text-purple-400"
  },
  {
    title: "Coding Time",
    value: "61 hrs 15 mins", 
    color: "text-orange-400"
  },
  {
    title: "Best Day",
    value: "December 05, 2024 (12 hrs 30 mins)",
    color: "text-pink-400"
  },
  {
    title: "All Time",
    value: "1,847 hrs 22 mins",
    color: "text-cyan-400"
  }
];

export function DashboardSection() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

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

    const updateLastUpdated = () => {
      const now = new Date();
      const updatedString = now.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta'
      });
      setLastUpdated(updatedString);
    };

    updateTime();
    updateLastUpdated();
    
    const timer = setInterval(updateTime, 1000);
    const updateTimer = setInterval(updateLastUpdated, 60000); // Update every minute

    return () => {
      clearInterval(timer);
      clearInterval(updateTimer);
    };
  }, []);

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

  const refreshData = () => {
    // Trigger refresh of GitHub data
    window.location.reload();
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
              Dashboard <span className="gradient-text">Overview</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-6">
              Real-time insights into my coding journey and development activities
            </p>
            {mounted && (
              <div className="inline-block p-3 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                <p className="text-blue-400 font-mono text-sm sm:text-lg">
                  🕒 {currentTime} (Jakarta Time)
                </p>
              </div>
            )}
          </div>

          {/* Wakatime Statistics */}
          <motion.div 
            className="mb-12 sm:mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">
                Wakatime <span className="gradient-text">Statistics</span>
              </h3>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 px-3 sm:px-4 py-2">
                <Activity className="mr-2 h-4 w-4" />
                Last update: {lastUpdated || '2 hours ago'}
              </Badge>
            </div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
              variants={containerVariants}
            >
              {wakatimeStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm card-hover shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                      <p className="text-slate-400 text-xs sm:text-sm mb-2">{stat.title}</p>
                      <p className={`text-lg sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Tech Stack Marquee */}
            <motion.div 
              className="mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                Tech <span className="gradient-text">Stack</span>
              </h4>
              <TechStackMarquee />
            </motion.div>
          </motion.div>

          {/* GitHub Statistics */}
          <motion.div 
            className="mb-8 sm:mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">
                GitHub <span className="text-green-400">Statistics</span>
              </h3>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 sm:px-4 py-2">
                  <Github className="mr-2 h-4 w-4" />
                  @zidanmubarak
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshData}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* GitHub Stats Cards */}
            <motion.div 
              className="mb-8 sm:mb-12"
              variants={itemVariants}
            >
              <GitHubStatsCards />
            </motion.div>

            {/* GitHub Contribution Graph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-white text-lg sm:text-xl mb-4 sm:mb-0">
                      Contribution <span className="text-green-400">Activity</span>
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                      asChild
                    >
                      <a href="https://github.com/zidanmubarak" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <GitHubContributionGraph />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}