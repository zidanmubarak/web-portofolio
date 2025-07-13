"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Code,
  Clock,
  Github,
  Zap,
  Star,
  GitFork,
  Users,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Eye,
  Coffee,
  Brain,
  Database,
  Server,
  Globe,
} from "lucide-react";
import { TechStackGrid } from "@/components/ui/tech-stack-grid";

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

interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
  };
  repo: {
    name: string;
  };
  payload: any;
  created_at: string;
}

interface GitHubActivity {
  day: string;
  commits: number;
  hours: number;
}

// Activity data will be fetched from GitHub API

// GitHub API functions
const fetchGitHubUser = async (
  username: string
): Promise<GitHubUser | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
  }
  return null;
};

const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
  }
  return [];
};

const fetchGitHubEvents = async (username: string): Promise<GitHubEvent[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events?per_page=30`
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching GitHub events:", error);
  }
  return [];
};

const fetchGitHubActivity = async (
  username: string
): Promise<GitHubActivity[]> => {
  try {
    // Get commits from the last 7 days
    const response = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`
    );
    if (response.ok) {
      const events = await response.json();

      // Process events to get activity data
      const activityMap = new Map<string, { commits: number; hours: number }>();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      // Initialize with 0 values
      days.forEach((day) => {
        activityMap.set(day, { commits: 0, hours: 0 });
      });

      // Process events from the last 7 days
      const now = new Date();
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      events.forEach((event: GitHubEvent) => {
        const eventDate = new Date(event.created_at);
        if (eventDate >= lastWeek) {
          const dayName = days[eventDate.getDay()];
          const current = activityMap.get(dayName) || { commits: 0, hours: 0 };

          if (event.type === "PushEvent") {
            current.commits += event.payload.commits?.length || 1;
            current.hours += Math.random() * 2 + 1; // Simulate hours based on commits
          }

          activityMap.set(dayName, current);
        }
      });

      return days.map((day) => {
        const data = activityMap.get(day) || { commits: 0, hours: 0 };
        return {
          day,
          commits: data.commits,
          hours: Math.round(data.hours * 10) / 10,
        };
      });
    }
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
  }

  // Fallback to default data if API fails
  return [
    { day: "Mon", hours: 8.5, commits: 12 },
    { day: "Tue", hours: 7.2, commits: 8 },
    { day: "Wed", hours: 9.1, commits: 15 },
    { day: "Thu", hours: 6.8, commits: 6 },
    { day: "Fri", hours: 8.9, commits: 11 },
    { day: "Sat", hours: 5.4, commits: 4 },
    { day: "Sun", hours: 3.2, commits: 2 },
  ];
};

// Helper functions
const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${Math.floor(diffInSeconds / 2592000)} months ago`;
};

const getEventIcon = (eventType: string) => {
  switch (eventType) {
    case "PushEvent":
      return Code;
    case "CreateEvent":
      return GitFork;
    case "IssuesEvent":
      return Eye;
    case "PullRequestEvent":
      return Star;
    case "ForkEvent":
      return GitFork;
    case "WatchEvent":
      return Star;
    case "DeleteEvent":
      return Eye;
    default:
      return Activity;
  }
};

const getEventAction = (event: GitHubEvent): string => {
  switch (event.type) {
    case "PushEvent":
      return `Pushed ${event.payload.commits?.length || 1} commit${
        event.payload.commits?.length !== 1 ? "s" : ""
      }`;
    case "CreateEvent":
      return `Created ${event.payload.ref_type}`;
    case "IssuesEvent":
      return `${event.payload.action} issue`;
    case "PullRequestEvent":
      return `${event.payload.action} pull request`;
    case "ForkEvent":
      return "Forked repository";
    case "WatchEvent":
      return "Starred repository";
    case "DeleteEvent":
      return `Deleted ${event.payload.ref_type}`;
    default:
      return event.type;
  }
};

export function DashboardSection() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [githubEvents, setGithubEvents] = useState<GitHubEvent[]>([]);
  const [githubActivity, setGithubActivity] = useState<GitHubActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tech");

  const username = "zidanmubarak";

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
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

      const [user, repos, events, activity] = await Promise.all([
        fetchGitHubUser(username),
        fetchGitHubRepos(username),
        fetchGitHubEvents(username),
        fetchGitHubActivity(username),
      ]);

      setGithubUser(user);
      setGithubRepos(repos);
      setGithubEvents(events);
      setGithubActivity(activity);
      setLoading(false);
    };

    if (mounted) {
      fetchGitHubData();
    }
  }, [mounted]);

  // Calculate GitHub stats
  const totalStars = githubRepos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = githubRepos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  const githubStats = [
    {
      label: "Public Repos",
      value: githubUser?.public_repos.toString() || "0",
      color: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      icon: Code,
      change: "+3",
    },
    {
      label: "Total Stars",
      value: totalStars.toString(),
      color: "from-yellow-400 to-orange-400",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      icon: Star,
      change: "+12",
    },
    {
      label: "Total Forks",
      value: totalForks.toString(),
      color: "from-green-400 to-emerald-400",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      icon: GitFork,
      change: "+8",
    },
    {
      label: "Followers",
      value: githubUser?.followers.toString() || "0",
      color: "from-purple-400 to-violet-400",
      bgGradient: "from-purple-500/20 to-violet-500/20",
      borderColor: "border-purple-500/30",
      icon: Users,
      change: "+5",
    },
  ];

  const tabs = [
    { id: "tech", label: "Tech Stack", icon: Code },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "github", label: "GitHub", icon: Github },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen py-20 lg:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-slate-800 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-slate-800 rounded-lg w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 lg:py-32 relative overflow-hidden bg-slate-950">
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
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-blue-500/20 rounded-full px-6 py-3 mb-8"
            >
              <BarChart3 className="h-5 w-5 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium">
                Analytics Dashboard
              </span>
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
            </motion.div>

            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Development{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Insights
              </span>
            </motion.h2>

            <motion.p
              className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto mb-8 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Real-time insights into my coding journey, development activities,
              and technical growth
            </motion.p>

            {/* Live Clock */}
            <motion.div
              className="inline-block p-6 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 rounded-3xl border border-slate-600/50 backdrop-blur-lg shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-mono text-lg font-bold">
                  {currentTime} (Jakarta Time)
                </span>
              </div>
            </motion.div>
          </div>

          {/* Modern Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="flex bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                      ${
                        isActive
                          ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon
                      className={`h-4 w-4 ${isActive ? "text-blue-400" : ""}`}
                    />
                    <span className="hidden sm:inline">{tab.label}</span>

                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === "tech" && (
                <motion.div
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <TechStackGrid />
                </motion.div>
              )}

              {activeTab === "activity" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                  {/* Weekly Activity Chart */}
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3">
                        <Activity className="h-6 w-6 text-blue-400" />
                        Weekly Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {loading
                          ? // Loading skeleton
                            Array.from({ length: 7 }).map((_, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 animate-pulse"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-8 h-4 bg-slate-700 rounded"></div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-4 h-4 bg-slate-700 rounded"></div>
                                      <div className="w-12 h-4 bg-slate-700 rounded"></div>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2"></div>
                                  </div>
                                </div>
                                <div className="w-20 h-6 bg-slate-700 rounded"></div>
                              </div>
                            ))
                          : githubActivity.map((day, index) => (
                              <motion.div
                                key={day.day}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20"
                              >
                                <div className="flex items-center gap-4">
                                  <span className="text-white font-medium w-8">
                                    {day.day}
                                  </span>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Clock className="h-4 w-4 text-blue-400" />
                                      <span className="text-slate-300">
                                        {day.hours}h
                                      </span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2">
                                      <motion.div
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${Math.max(
                                            (day.hours / 12) * 100,
                                            5
                                          )}%`,
                                        }}
                                        transition={{
                                          delay: index * 0.1 + 0.5,
                                          duration: 0.8,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  {day.commits} commits
                                </Badge>
                              </motion.div>
                            ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3">
                        <Zap className="h-6 w-6 text-yellow-400" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {loading ? (
                          // Loading skeleton
                          Array.from({ length: 4 }).map((_, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 animate-pulse"
                            >
                              <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
                              <div className="flex-1">
                                <div className="w-24 h-4 bg-slate-700 rounded mb-1"></div>
                                <div className="w-32 h-3 bg-slate-700 rounded"></div>
                              </div>
                              <div className="w-16 h-3 bg-slate-700 rounded"></div>
                            </div>
                          ))
                        ) : githubEvents.length > 0 ? (
                          githubEvents.slice(0, 8).map((event, index) => {
                            const Icon = getEventIcon(event.type);
                            return (
                              <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                              >
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                  <Icon className="h-4 w-4 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-white font-medium">
                                    {getEventAction(event)}
                                  </p>
                                  <p className="text-slate-400 text-sm">
                                    {event.repo.name}
                                  </p>
                                </div>
                                <span className="text-slate-500 text-sm">
                                  {formatTimeAgo(event.created_at)}
                                </span>
                              </motion.div>
                            );
                          })
                        ) : (
                          <div className="text-center py-8">
                            <Activity className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                            <p className="text-slate-400">
                              No recent activity found
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "github" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {githubStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.7 }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        className="group perspective-1000"
                      >
                        <Card
                          className={`bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/8 hover:shadow-3xl`}
                        >
                          <CardContent className="p-8 text-center relative">
                            <div className="flex justify-between items-start mb-4">
                              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                <IconComponent
                                  className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                                />
                              </div>
                              {stat.change && (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  {stat.change}
                                </Badge>
                              )}
                            </div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">
                              {stat.label}
                            </p>
                            <p
                              className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                            >
                              {loading ? "..." : stat.value}
                            </p>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-violet-500/10 backdrop-blur-xl border border-pink-500/30 shadow-2xl rounded-3xl overflow-hidden relative group">
              {/* Background gradient border effect */}
              <div
                className="absolute inset-0 rounded-3xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(45deg, #ec4899, #8b5cf6, #a855f7)",
                }}
              ></div>
              <CardContent className="p-8 sm:p-12 text-center relative z-10 bg-slate-950 rounded-[calc(1.5rem-1px)]">
                <motion.div
                  whileHover={{ scale: 1.01 }} /* Reduced scale on hover */
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center gap-3">
                    <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 flex-shrink-0 animate-pulse" />
                    <em className="bg-gradient-to-r from-pink-400 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                      "Thoughts give rise to actions, actions form habits, habits shape character, and character creates destiny."
                    </em>
                    <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 flex-shrink-0 animate-pulse" />
                  </h3>
                  <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
                    — Aristoteles —
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
