"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  level: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function GitHubContributionGraph() {
  const [contributionData, setContributionData] = useState<GitHubContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubContributions();
  }, []);

  const fetchGitHubContributions = async () => {
    try {
      setLoading(true);
      
      // GitHub GraphQL query untuk mendapatkan contribution data
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
      `;

      const variables = {
        username: "zidanmubarak"
      };

      // Untuk demo, kita akan menggunakan mock data yang mirip dengan GitHub
      // Dalam implementasi nyata, Anda perlu menggunakan GitHub Personal Access Token
      const mockData = generateMockContributionData();
      setContributionData(mockData);
      setLoading(false);

      // Uncomment ini untuk menggunakan GitHub API yang sesungguhnya:
      /*
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      setContributionData(data.data.user.contributionsCollection.contributionCalendar);
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
    } finally {
      setLoading(false);
    }
  };

  const generateMockContributionData = (): GitHubContributionData => {
    const weeks: ContributionWeek[] = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    let totalContributions = 0;
    
    // Generate 53 weeks of data
    for (let week = 0; week < 53; week++) {
      const contributionDays: ContributionDay[] = [];
      
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (week * 7) + day);
        
        if (currentDate > today) break;
        
        // Generate realistic contribution pattern
        const isWeekend = day === 0 || day === 6;
        const baseActivity = isWeekend ? 0.3 : 0.7;
        const randomFactor = Math.random();
        const seasonalFactor = Math.sin((week / 53) * Math.PI * 2) * 0.3 + 0.7;
        
        const activity = baseActivity * randomFactor * seasonalFactor;
        let contributionCount = 0;
        let level = 0;
        
        if (activity > 0.8) {
          contributionCount = Math.floor(Math.random() * 15) + 10;
          level = 4;
        } else if (activity > 0.6) {
          contributionCount = Math.floor(Math.random() * 8) + 5;
          level = 3;
        } else if (activity > 0.4) {
          contributionCount = Math.floor(Math.random() * 4) + 2;
          level = 2;
        } else if (activity > 0.2) {
          contributionCount = Math.floor(Math.random() * 2) + 1;
          level = 1;
        }
        
        totalContributions += contributionCount;
        
        contributionDays.push({
          date: currentDate.toISOString().split('T')[0],
          contributionCount,
          color: getContributionColor(level),
          level
        });
      }
      
      if (contributionDays.length > 0) {
        weeks.push({ contributionDays });
      }
    }
    
    return {
      totalContributions,
      weeks
    };
  };

  const getContributionColor = (level: number): string => {
    switch (level) {
      case 0: return '#161b22';
      case 1: '#0e4429';
      case 2: return '#006d32';
      case 3: return '#26a641';
      case 4: return '#39d353';
      default: return '#161b22';
    }
  };

  const getContributionLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        <span className="ml-3 text-slate-400">Loading contribution data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">Failed to load GitHub contributions</p>
        <button 
          onClick={fetchGitHubContributions}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!contributionData) return null;

  // Get month labels for the year
  const getMonthLabels = () => {
    const labels: { month: string; x: number }[] = [];
    const today = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear() - 1, today.getMonth() + i + 1, 1);
      const monthIndex = date.getMonth();
      const weekIndex = Math.floor(i * 4.33); // Approximate weeks per month
      
      labels.push({
        month: months[monthIndex],
        x: weekIndex * 14 // 14px per week (12px width + 2px gap)
      });
    }
    
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="space-y-4">
      {/* Header with total contributions */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-white mb-1">
            {contributionData.totalContributions.toLocaleString()} contributions in the last year
          </h4>
          <p className="text-sm text-slate-400">
            Contribution activity over the past year
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getContributionColor(level) }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="relative h-4">
        {monthLabels.map((label, index) => (
          <span
            key={index}
            className="absolute text-xs text-slate-400"
            style={{ left: `${label.x}px` }}
          >
            {label.month}
          </span>
        ))}
      </div>
      
      {/* Contribution grid */}
      <div className="relative">
        {/* Day labels */}
        <div className="absolute -left-8 top-0 flex flex-col justify-between h-full text-xs text-slate-400">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        
        {/* Contribution squares */}
        <div className="flex gap-1 overflow-x-auto pb-2">
          {contributionData.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  className="w-3 h-3 rounded-sm transition-all duration-200 hover:ring-1 hover:ring-slate-400 cursor-pointer"
                  style={{ backgroundColor: day.color }}
                  title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: (weekIndex * 7 + dayIndex) * 0.001,
                    duration: 0.2 
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Additional stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {contributionData.totalContributions}
          </div>
          <div className="text-xs text-slate-400">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {Math.floor(contributionData.totalContributions / 365)}
          </div>
          <div className="text-xs text-slate-400">Daily Avg</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {Math.max(...contributionData.weeks.flatMap(w => w.contributionDays.map(d => d.contributionCount)))}
          </div>
          <div className="text-xs text-slate-400">Best Day</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">
            {contributionData.weeks.reduce((acc, week) => {
              const weekTotal = week.contributionDays.reduce((sum, day) => sum + day.contributionCount, 0);
              return Math.max(acc, weekTotal);
            }, 0)}
          </div>
          <div className="text-xs text-slate-400">Best Week</div>
        </div>
      </div>
    </div>
  );
}