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
  Github
} from 'lucide-react';
import { TechStackGrid } from '@/components/ui/tech-stack-grid';
import { ActivityGraph } from '@/components/charts/activity-graph';

const stats = [
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

const githubStats = [
  { label: "Total", value: "5,247", color: "text-green-400" },
  { label: "This Week", value: "156", color: "text-blue-400" },
  { label: "Best Day", value: "289", color: "text-purple-400" },
  { label: "Average", value: "14/day", color: "text-orange-400" }
];

export function DashboardSection() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

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

    // Set initial time
    updateTime();
    
    // Update every second
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render time until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Dashboard <span className="gradient-text">Overview</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-6">
              Real-time insights into my coding journey and development activities
            </p>
            <div className="inline-block p-3 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 backdrop-blur-sm">
              <p className="text-blue-400 font-mono text-sm sm:text-lg">
                🕒 Loading... (Jakarta Time)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="inline-block p-3 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 backdrop-blur-sm">
              <p className="text-blue-400 font-mono text-sm sm:text-lg" suppressHydrationWarning>
                🕒 {currentTime} (Jakarta Time)
              </p>
            </div>
          </div>

          {/* Wakatime Statistics */}
          <div className="mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">
                Wakatime <span className="gradient-text">Statistics</span>
              </h3>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 px-3 sm:px-4 py-2">
                <Activity className="mr-2 h-4 w-4" />
                Last update: 2 hours ago
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm card-hover shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                      <p className="text-slate-400 text-xs sm:text-sm mb-2">{stat.title}</p>
                      <p className={`text-lg sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack Grid */}
            <div className="mb-8 sm:mb-12">
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                Tech <span className="gradient-text">Stack</span>
              </h4>
              <TechStackGrid />
            </div>
          </div>

          {/* GitHub Statistics */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">
                GitHub <span className="text-green-400">Statistics</span>
              </h3>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 sm:px-4 py-2">
                <Github className="mr-2 h-4 w-4" />
                @zidanmubarak
              </Badge>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {githubStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm card-hover shadow-lg">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <p className="text-slate-400 text-xs sm:text-sm mb-2">{stat.label}</p>
                      <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Activity Graph */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-white text-lg sm:text-xl mb-4 sm:mb-0">
                    Activity <span className="text-green-400">Graph</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-slate-800 rounded-sm mr-2"></div>
                      <span className="text-slate-400">Less</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-sm mr-2"></div>
                      <span className="text-slate-400">More</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ActivityGraph />
                <p className="text-slate-400 text-xs sm:text-sm mt-4 sm:mt-6">
                  📊 Contribution activity over the past year - showing consistent development work
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}