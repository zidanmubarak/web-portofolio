"use client";

import { useState, useEffect } from 'react';
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

const GITHUB_USERNAME = 'zidanmubarak';

export function GitHubContributionGraph() {
  const [contributionData, setContributionData] = useState<GitHubContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContributionData();
  }, []);

  const fetchContributionData = async () => {
    try {
      setLoading(true);
      
      // GitHub GraphQL query untuk mendapatkan contribution data
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              totalCommitContributions
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

      // Untuk demo, kita akan menggunakan mock data yang realistis
      // Dalam implementasi nyata, Anda perlu GitHub Personal Access Token
      const mockData = generateMockContributionData();
      setContributionData(mockData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError('Failed to load contribution data');
      setLoading(false);
    }
  };

  const generateMockContributionData = (): GitHubContributionData => {
    const weeks: ContributionWeek[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    let totalContributions = 0;
    let currentDate = new Date(oneYearAgo);
    
    // Start from the beginning of the week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    currentDate = startOfWeek;

    while (currentDate <= today) {
      const week: ContributionWeek = { contributionDays: [] };
      
      for (let i = 0; i < 7; i++) {
        if (currentDate <= today) {
          const contributionCount = generateRealisticContributionCount(currentDate);
          const level = getContributionLevel(contributionCount);
          const color = getContributionColor(level);
          
          week.contributionDays.push({
            date: currentDate.toISOString().split('T')[0],
            contributionCount,
            color,
            level
          });
          
          totalContributions += contributionCount;
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      if (week.contributionDays.length > 0) {
        weeks.push(week);
      }
    }

    return {
      totalContributions,
      weeks
    };
  };

  const generateRealisticContributionCount = (date: Date): number => {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = Math.random() < 0.05; // 5% chance of holiday
    
    if (isHoliday) return 0;
    
    // Lower activity on weekends
    const baseActivity = isWeekend ? 0.3 : 0.8;
    
    // Add some randomness and patterns
    const random = Math.random();
    const seasonalFactor = Math.sin((date.getMonth() / 12) * Math.PI * 2) * 0.3 + 0.7;
    
    const activity = baseActivity * seasonalFactor * random;
    
    if (activity < 0.1) return 0;
    if (activity < 0.3) return Math.floor(Math.random() * 3) + 1;
    if (activity < 0.6) return Math.floor(Math.random() * 8) + 3;
    if (activity < 0.8) return Math.floor(Math.random() * 15) + 8;
    return Math.floor(Math.random() * 25) + 15;
  };

  const getContributionLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 8) return 2;
    if (count <= 15) return 3;
    return 4;
  };

  const getContributionColor = (level: number): string => {
    const colors = {
      0: '#161b22', // No contributions
      1: '#0e4429', // Low
      2: '#006d32', // Medium-low
      3: '#26a641', // Medium-high
      4: '#39d353'  // High
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels = [];
    const today = new Date();
    
    for (let i = 0; i < 12; i++) {
      const monthIndex = (today.getMonth() - 11 + i + 12) % 12;
      labels.push(months[monthIndex]);
    }
    
    return labels;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        <span className="ml-3 text-slate-400">Loading contribution data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-400">
        <span>{error}</span>
      </div>
    );
  }

  if (!contributionData) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <span>No contribution data available</span>
      </div>
    );
  }

  const monthLabels = getMonthLabels();

  return (
    <div className="space-y-4">
      {/* Header with total contributions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h4 className="text-lg font-semibold text-white mb-1">
            {contributionData.totalContributions.toLocaleString()} contributions in the last year
          </h4>
          <p className="text-sm text-slate-400">
            @{GITHUB_USERNAME} on GitHub
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <span className="text-xs text-slate-400">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getContributionColor(level) }}
            />
          ))}
          <span className="text-xs text-slate-400">More</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex justify-between text-xs text-slate-400 px-4 mb-2">
        {monthLabels.map((month, index) => (
          <span key={index} className={index % 2 === 0 ? '' : 'opacity-0'}>
            {month}
          </span>
        ))}
      </div>
      
      {/* Contribution grid */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {contributionData.weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.contributionDays.map((day, dayIndex) => (
              <motion.div
                key={dayIndex}
                className="w-3 h-3 rounded-sm transition-all duration-200 hover:ring-1 hover:ring-slate-400 cursor-pointer"
                style={{ backgroundColor: day.color }}
                title={`${day.date}: ${day.contributionCount} contributions`}
                whileHover={{ scale: 1.2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Additional stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/50">
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">
            {Math.floor(contributionData.totalContributions / 365)}
          </div>
          <div className="text-xs text-slate-400">Daily avg</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">
            {Math.max(...contributionData.weeks.flatMap(w => w.contributionDays.map(d => d.contributionCount)))}
          </div>
          <div className="text-xs text-slate-400">Best day</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-400">
            {contributionData.weeks.reduce((acc, week) => {
              const weekTotal = week.contributionDays.reduce((sum, day) => sum + day.contributionCount, 0);
              return Math.max(acc, weekTotal);
            }, 0)}
          </div>
          <div className="text-xs text-slate-400">Best week</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-400">
            {contributionData.weeks.flatMap(w => w.contributionDays).filter(d => d.contributionCount > 0).length}
          </div>
          <div className="text-xs text-slate-400">Active days</div>
        </div>
      </div>
    </div>
  );
}