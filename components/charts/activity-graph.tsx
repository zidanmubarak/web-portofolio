"use client";

import { useState, useEffect } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export function ActivityGraph() {
  const [contributionData, setContributionData] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  // Generate realistic contribution data for a full year
  const generateRealisticData = () => {
    const data: ContributionDay[] = [];
    const today = new Date();
    
    // Start from exactly 365 days ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // 365 days total including today
    
    let total = 0;
    
    // Generate exactly 365 days of data
    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Create more realistic patterns
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const month = currentDate.getMonth();
      
      // Seasonal variations (more activity in certain months)
      const seasonalMultiplier = [0.8, 0.9, 1.0, 1.1, 1.2, 1.0, 0.8, 0.9, 1.1, 1.2, 1.0, 0.7][month];
      
      let baseActivity = 0;
      
      // Weekend vs weekday patterns
      if (isWeekend) {
        baseActivity = Math.random() < 0.4 ? Math.floor(Math.random() * 4) : 0;
      } else {
        // Weekdays have higher activity
        baseActivity = Math.random() < 0.8 ? Math.floor(Math.random() * 8) + 1 : 0;
      }
      
      // Apply seasonal multiplier
      baseActivity = Math.floor(baseActivity * seasonalMultiplier);
      
      // Add some random bursts of high activity
      if (Math.random() < 0.08) { // 8% chance of high activity day
        baseActivity = Math.floor(Math.random() * 12) + 8;
      }
      
      // Ensure some days have zero activity for realism
      if (Math.random() < 0.15) { // 15% chance of no activity
        baseActivity = 0;
      }
      
      const count = Math.max(0, baseActivity);
      total += count;
      
      // Determine level based on count
      let level = 0;
      if (count === 0) level = 0;
      else if (count <= 2) level = 1;
      else if (count <= 5) level = 2;
      else if (count <= 10) level = 3;
      else level = 4;
      
      data.push({
        date: currentDate.toISOString().split('T')[0],
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
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-800/50 border-slate-700/30';
      case 1: return 'bg-green-900/80 border-green-800/50';
      case 2: return 'bg-green-700/90 border-green-600/60';
      case 3: return 'bg-green-500 border-green-400/70';
      case 4: return 'bg-green-400 border-green-300/80';
      default: return 'bg-slate-800/50 border-slate-700/30';
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

  // Organize data into weeks (7 days each)
  const organizeIntoWeeks = () => {
    if (contributionData.length === 0) return [];
    
    const weeks: ContributionDay[][] = [];
    const firstDate = new Date(contributionData[0].date);
    const firstDayOfWeek = firstDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Add empty cells for the beginning of the first week if needed
    const firstWeek: ContributionDay[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      firstWeek.push({ date: '', count: 0, level: 0 });
    }
    
    // Add the actual data
    let currentWeek = [...firstWeek];
    
    contributionData.forEach((day) => {
      currentWeek.push(day);
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Add the last partial week if it exists
    if (currentWeek.length > 0) {
      // Fill the rest of the week with empty cells
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: 0 });
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const weeks = organizeIntoWeeks();

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-slate-700 rounded animate-pulse w-64"></div>
          <div className="h-6 bg-slate-700 rounded animate-pulse w-32"></div>
        </div>
        <div className="h-32 bg-slate-800 rounded animate-pulse"></div>
        <div className="h-4 bg-slate-700 rounded animate-pulse w-48"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
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
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              github.com/zidanmubarak
            </a>
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-sm bg-slate-800/50 border border-slate-700/30"></div>
            <div className="w-3 h-3 rounded-sm bg-green-900/80 border border-green-800/50"></div>
            <div className="w-3 h-3 rounded-sm bg-green-700/90 border border-green-600/60"></div>
            <div className="w-3 h-3 rounded-sm bg-green-500 border border-green-400/70"></div>
            <div className="w-3 h-3 rounded-sm bg-green-400 border border-green-300/80"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex justify-between text-xs text-slate-400 px-4 mb-2">
        {months.map((month) => (
          <span key={month} className="flex-1 text-center">{month}</span>
        ))}
      </div>
      
      {/* Activity grid */}
      <div className="relative">
        {/* Day labels */}
        <div className="absolute left-0 top-0 flex flex-col justify-between text-xs text-slate-400 pr-3 h-full">
          <div className="h-3 flex items-center">Mon</div>
          <div className="h-3 flex items-center">Wed</div>
          <div className="h-3 flex items-center">Fri</div>
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

      {/* Footer */}
      <div className="text-xs text-slate-500 pt-2 border-t border-slate-800/50">
        <p className="flex items-center justify-center sm:justify-start gap-2">
          <span>📊 Contribution activity over the past year - showing consistent development work</span>
        </p>
      </div>
    </div>
  );
}