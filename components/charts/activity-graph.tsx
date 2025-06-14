"use client";

import { useEffect, useState } from 'react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function ActivityGraph() {
  const [contributionData, setContributionData] = useState<ContributionWeek[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    // Generate mock data that looks like real GitHub contributions
    // In a real implementation, you would fetch from GitHub API
    const generateGitHubLikeData = () => {
      const data: ContributionDay[] = [];
      const today = new Date();
      const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      
      let total = 0;
      
      for (let i = 0; i < 365; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        // Create more realistic contribution patterns
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = Math.random() < 0.1;
        
        let baseActivity = 0;
        if (!isWeekend && !isHoliday) {
          baseActivity = Math.random() * 0.8 + 0.2; // Higher activity on weekdays
        } else if (!isHoliday) {
          baseActivity = Math.random() * 0.4; // Lower activity on weekends
        }
        
        // Add some streaks and patterns
        const streakBonus = Math.sin(i / 7) * 0.3 + 0.3;
        const activity = Math.min(baseActivity + streakBonus, 1);
        
        const count = Math.floor(activity * 15); // Max 15 contributions per day
        total += count;
        
        let level = 0;
        if (count === 0) level = 0;
        else if (count <= 3) level = 1;
        else if (count <= 6) level = 2;
        else if (count <= 9) level = 3;
        else level = 4;
        
        data.push({
          date: date.toISOString().split('T')[0],
          count,
          level
        });
      }
      
      setTotalContributions(total);
      return data;
    };

    const data = generateGitHubLikeData();
    
    // Group data by weeks (starting from Sunday)
    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];
    
    // Find the first Sunday
    const firstDate = new Date(data[0].date);
    const firstSunday = new Date(firstDate);
    firstSunday.setDate(firstDate.getDate() - firstDate.getDay());
    
    // Add empty days before the first date if needed
    for (let i = 0; i < firstDate.getDay(); i++) {
      currentWeek.push({
        date: '',
        count: 0,
        level: 0
      });
    }
    
    data.forEach((day, index) => {
      currentWeek.push(day);
      
      if (currentWeek.length === 7) {
        weeks.push({ days: [...currentWeek] });
        currentWeek = [];
      }
    });
    
    // Add remaining days to the last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: '',
          count: 0,
          level: 0
        });
      }
      weeks.push({ days: currentWeek });
    }
    
    setContributionData(weeks);
    setIsLoading(false);
  }, []);

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-800/50';
      case 1: return 'bg-green-800';
      case 2: return 'bg-green-600';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-400';
      default: return 'bg-slate-800/50';
    }
  };

  const getMonthLabels = () => {
    const labels = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      labels.push(months[date.getMonth()]);
    }
    
    return labels;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between text-xs text-slate-400 px-4">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 53 }, (_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }, (_, dayIndex) => (
                <div
                  key={dayIndex}
                  className="w-3 h-3 rounded-sm bg-slate-800/50 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with title and stats */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">Activity Graph</h4>
        <div className="flex items-center space-x-4 text-sm text-slate-400">
          <span>{totalContributions.toLocaleString()} contributions in the last year</span>
          <div className="flex items-center space-x-2">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-sm bg-slate-800/50"></div>
              <div className="w-3 h-3 rounded-sm bg-green-800"></div>
              <div className="w-3 h-3 rounded-sm bg-green-600"></div>
              <div className="w-3 h-3 rounded-sm bg-green-500"></div>
              <div className="w-3 h-3 rounded-sm bg-green-400"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex justify-between text-xs text-slate-400 px-2">
        {getMonthLabels().map((month, index) => (
          <span key={index} className="w-10 text-center">{month}</span>
        ))}
      </div>
      
      {/* Activity grid */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {contributionData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.days.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${getActivityColor(day.level)} transition-colors hover:ring-1 hover:ring-slate-400 cursor-pointer`}
                title={day.date ? `${day.date}: ${day.count} contributions` : 'No date'}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="text-xs text-slate-500 mt-4">
        <p>📊 Contribution activity over the past year - Learn how we count contributions</p>
      </div>
    </div>
  );
}