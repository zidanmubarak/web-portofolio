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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Jakarta'
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">
              Dashboard <span className="gradient-text">Overview</span>
            </h1>
            <p className="text-xl text-slate-400">
              Real-time insights into my coding journey and development activities
            </p>
            <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 backdrop-blur-sm">
              <p className="text-blue-400 font-mono text-lg">
                🕒 {formatTime(currentTime)} (Jakarta Time)
              </p>
            </div>
          </div>

          {/* Wakatime Statistics */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                Wakatime <span className="gradient-text">Statistics</span>
              </h2>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                <Activity className="mr-2 h-4 w-4" />
                Last update: 2 hours ago
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm card-hover shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack Grid */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">
                Tech <span className="gradient-text">Stack</span>
              </h3>
              <TechStackGrid />
            </div>
          </div>

          {/* GitHub Statistics */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                GitHub <span className="text-green-400">Statistics</span>
              </h2>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
                <Github className="mr-2 h-4 w-4" />
                @zidanmubarak
              </Badge>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {githubStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm card-hover shadow-lg">
                    <CardContent className="p-6 text-center">
                      <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                      <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Activity Graph */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl">
                    Activity <span className="text-green-400">Graph</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm">
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
                <p className="text-slate-400 text-sm mt-6">
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