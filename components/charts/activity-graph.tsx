"use client";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function ActivityGraph() {
  // Generate mock activity data
  const generateActivityData = () => {
    const data = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const activity = Math.random();
      data.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(activity * 4),
        level: activity < 0.2 ? 0 : activity < 0.4 ? 1 : activity < 0.6 ? 2 : activity < 0.8 ? 3 : 4
      });
    }
    return data;
  };

  const activityData = generateActivityData();
  const weeks = [];
  
  // Group data by weeks
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-800';
      case 1: return 'bg-green-900';
      case 2: return 'bg-green-700';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-400';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Month labels */}
      <div className="flex justify-between text-xs text-slate-400 px-4">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
      
      {/* Activity grid */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${getActivityColor(day.level)} transition-colors hover:ring-1 hover:ring-slate-400`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}