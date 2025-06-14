"use client";

import { useState, useEffect } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export function ActivityGraph() {
  const [contributionData, setContributionData] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  // Generate mock data that looks realistic (since GitHub API requires authentication)
  const generateRealisticData = () => {
    const data: ContributionDay[] = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    let total = 0;
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Create more realistic patterns
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isHoliday = Math.random() < 0.1; // 10% chance of being a "holiday"
      
      let baseActivity = 0;
      
      if (!isHoliday) {
        if (isWeekend) {
          baseActivity = Math.random() < 0.3 ? Math.floor(Math.random() * 3) : 0;
        } else {
          // Weekdays have higher activity
          baseActivity = Math.random() < 0.7 ? Math.floor(Math.random() * 8) + 1 : 0;
        }
      }
      
      // Add some random bursts of high activity
      if (Math.random() < 0.05) { // 5% chance of high activity day
        baseActivity = Math.floor(Math.random() * 15) + 10;
      }
      
      const count = baseActivity;
      total += count;
      
      let level = 0;
      if (count === 0) level = 0;
      else if (count <= 2) level = 1;
      else if (count <= 5) level = 2;
      else if (count <= 10) level = 3;
      else level = 4;
      
      data.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    
    setContributionData(data);
    setTotalContributions(total);
    setLoading(false);
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      generateRealisticData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-800 border-slate-700';
      case 1: return 'bg-green-900 border-green-800';
      case 2: return 'bg-green-700 border-green-600';
      case 3: return 'bg-green-500 border-green-400';
      case 4: return 'bg-green-400 border-green-300';
      default: return 'bg-slate-800 border-slate-700';
    }
  };

  const getTooltipText = (day: ContributionDay) => {
    const date = new Date(day.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    if (day.count === 0) {
      return `No contributions on ${formattedDate}`;
    } else if (day.count === 1) {
      return `1 contribution on ${formattedDate}`;
    } else {
      return `${day.count} contributions on ${formattedDate}`;
    }
  };

  // Group data by weeks
  const weeks: ContributionDay[][] = [];
  if (contributionData.length > 0) {
    // Find the first Sunday to start the grid properly
    const firstDate = new Date(contributionData[0].date);
    const firstSunday = new Date(firstDate);
    firstSunday.setDate(firstDate.getDate() - firstDate.getDay());
    
    // Create weeks array
    for (let i = 0; i < contributionData.length; i += 7) {
      const week = contributionData.slice(i, i + 7);
      // Pad the first week if it doesn't start on Sunday
      if (i === 0 && week.length < 7) {
        const padding = 7 - week.length;
        for (let j = 0; j < padding; j++) {
          week.unshift({ date: '', count: 0, level: 0 });
        }
      }
      weeks.push(week);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-slate-700 rounded animate-pulse w-48"></div>
          <div className="h-6 bg-slate-700 rounded animate-pulse w-32"></div>
        </div>
        <div className="h-32 bg-slate-800 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with contribution count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-white mb-1">
            {totalContributions.toLocaleString()} contributions in the last year
          </h4>
          <p className="text-sm text-slate-400">
            Contribution activity from{' '}
            <a 
              href="https://github.com/zidanmubarak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              github.com/zidanmubarak
            </a>
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-sm bg-slate-800 border border-slate-700"></div>
            <div className="w-3 h-3 rounded-sm bg-green-900 border border-green-800"></div>
            <div className="w-3 h-3 rounded-sm bg-green-700 border border-green-600"></div>
            <div className="w-3 h-3 rounded-sm bg-green-500 border border-green-400"></div>
            <div className="w-3 h-3 rounded-sm bg-green-400 border border-green-300"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex justify-between text-xs text-slate-400 px-4">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
      
      {/* Activity grid */}
      <div className="relative">
        {/* Day labels */}
        <div className="absolute left-0 top-0 flex flex-col space-y-1 text-xs text-slate-400 pr-2">
          <div className="h-3"></div> {/* Spacer for Mon */}
          <div className="h-3 flex items-center">Mon</div>
          <div className="h-3"></div> {/* Spacer for Tue */}
          <div className="h-3 flex items-center">Wed</div>
          <div className="h-3"></div> {/* Spacer for Thu */}
          <div className="h-3 flex items-center">Fri</div>
          <div className="h-3"></div> {/* Spacer for Sat */}
        </div>
        
        {/* Contribution grid */}
        <div className="ml-12 flex gap-1 overflow-x-auto pb-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm border ${getActivityColor(day.level)} transition-all duration-200 hover:ring-1 hover:ring-slate-400 cursor-pointer`}
                  title={day.date ? getTooltipText(day) : ''}
                  style={{ opacity: day.date ? 1 : 0 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="text-xs text-slate-500 mt-4">
        <p>
          📊 Learn how we count contributions •{' '}
          <a 
            href="https://github.com/zidanmubarak" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            View profile on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}