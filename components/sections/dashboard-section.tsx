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
  Flame
} from 'lucide-react';
import { TechStackGrid } from '@/components/ui/tech-stack-grid';
import { ActivityGraph } from '@/components/charts/activity-graph';

const stats = [
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

const githubStats = [
  { 
    label: "Total Contributions", 
    value: "5,247", 
    color: "from-green-400 to-emerald-400",
    bgGradient: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    icon: "📈"
  },
  { 
    label: "This Week", 
    value: "156", 
    color: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    icon: "⚡"
  },
  { 
    label: "Best Day", 
    value: "289", 
    color: "from-purple-400 to-violet-400",
    bgGradient: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    icon: "🏆"
  },
  { 
    label: "Daily Average", 
    value: "14/day", 
    color: "from-orange-400 to-amber-400",
    bgGradient: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    icon: "🎯"
  }
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

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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
              {stats.map((stat, index) => {
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
              <Badge className="bg-gradient-to-r from-gray-800/80 to-black/80 text-white border-gray-600/50 px-6 py-3 text-base rounded-full backdrop-blur-sm shadow-lg">
                <Github className="mr-2 h-5 w-5" />
                @zidanmubarak
              </Badge>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {githubStats.map((stat, index) => (
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
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">{stat.label}</p>
                      <p className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Activity Graph */}
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
                        Heatmap
                      </span>
                    </CardTitle>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-slate-700 rounded-md mr-3 shadow-inner"></div>
                        <span className="text-slate-400 font-medium">Less</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-md mr-3 shadow-lg"></div>
                        <span className="text-slate-400 font-medium">More</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
                    <ActivityGraph />
                  </div>
                  <p className="text-slate-400 text-base mt-6 flex items-center justify-center">
                    <span className="text-2xl mr-3">📊</span>
                    Contribution activity over the past year - showing consistent development work
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}