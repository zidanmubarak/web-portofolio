"use client";

const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

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
        level: activity < 0.15 ? 0 : activity < 0.35 ? 1 : activity < 0.55 ? 2 : activity < 0.75 ? 3 : 4
      });
    }
    return data;
  };

  const activityData = generateActivityData();
  const weeks = [];
  
  // Group data by weeks (7 days per week)
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-800/50'; // Very dark for no activity
      case 1: return 'bg-green-900/80'; // Dark green
      case 2: return 'bg-green-700'; // Medium green
      case 3: return 'bg-green-500'; // Bright green
      case 4: return 'bg-green-400'; // Brightest green
      default: return 'bg-slate-800/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with title and legend */}
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-white">
          Activity <span className="text-green-400">Graph</span>
        </h4>
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-slate-800/50 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-900/80 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex justify-between text-xs text-slate-400 px-2">
        {months.map((month, index) => (
          <span key={`${month}-${index}`} className="text-center min-w-[24px]">
            {month}
          </span>
        ))}
      </div>
      
      {/* Activity grid */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-3 h-3 rounded-sm ${getActivityColor(day.level)} transition-all duration-200 hover:ring-1 hover:ring-green-400 hover:scale-110 cursor-pointer`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="flex items-start space-x-2 text-sm text-slate-400">
        <div className="w-4 h-4 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>
        <p>Contribution activity over the past year - showing consistent development work</p>
      </div>
    </div>
  );
}