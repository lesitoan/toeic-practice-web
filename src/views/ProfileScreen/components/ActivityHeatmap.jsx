import { useState, useEffect } from 'react';

export default function ActivityHeatmap() {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [activityData, setActivityData] = useState({});

  useEffect(() => {
    const data = {};
    const today = new Date();

    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const random = Math.random();
      if (random > 0.3) {
        data[dateStr] = Math.floor(Math.random() * 6);
      } else {
        data[dateStr] = 0;
      }
    }

    setActivityData(data);
  }, []);

  const getColor = (count) => {
    if (count === 0) return 'bg-gray-100';
    if (count === 1) return 'bg-green-200';
    if (count === 2) return 'bg-green-300';
    if (count === 3) return 'bg-green-400';
    if (count === 4) return 'bg-green-500';
    return 'bg-green-600';
  };

  const generateWeeks = () => {
    const weeks = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 365);

    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    let currentWeek = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < 53 * 7; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = activityData[dateStr] || 0;

      currentWeek.push({
        date: new Date(currentDate),
        dateStr,
        count,
        dayOfWeek: currentDate.getDay(),
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weeks;
  };

  const weeks = generateWeeks();
  const months = [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ];
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  // Calculate month positions
  const getMonthLabels = () => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const month = week[0].date.getMonth();
      if (month !== lastMonth && weekIndex > 0) {
        labels.push({
          month: months[month],
          position: weekIndex,
        });
        lastMonth = month;
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  const totalTests = Object.values(activityData).reduce((sum, count) => sum + count, 0);
  const activeDays = Object.values(activityData).filter((count) => count > 0).length;

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Lịch sử luyện thi TOEIC</h3>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>{totalTests} bài thi trong năm qua</span>
          <span>•</span>
          <span>{activeDays} ngày hoạt động</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {monthLabels.map((label, idx) => (
              <div
                key={idx}
                className="text-xs text-gray-600"
                style={{
                  marginLeft:
                    idx === 0
                      ? `${label.position * 13}px`
                      : `${(label.position - monthLabels[idx - 1].position) * 13}px`,
                }}
              >
                {label.month}
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 mr-2">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className="h-3 flex items-center text-xs text-gray-600"
                  style={{ visibility: idx % 2 === 1 ? 'visible' : 'hidden' }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => {
                    const isToday = day.dateStr === new Date().toISOString().split('T')[0];
                    const isFuture = day.date > new Date();

                    return (
                      <div
                        key={`${weekIdx}-${dayIdx}`}
                        className={`w-3 h-3 rounded-sm cursor-pointer transition-all ${
                          isFuture ? 'bg-gray-50' : getColor(day.count)
                        } ${isToday ? 'ring-2 ring-blue-500' : ''} ${
                          hoveredCell === day.dateStr ? 'ring-2 ring-gray-400 scale-110' : ''
                        }`}
                        onMouseEnter={() => !isFuture && setHoveredCell(day.dateStr)}
                        // onMouseLeave={() => setHoveredCell(null)}
                        title={`${day.dateStr}: ${day.count} bài thi`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Tooltip */}
          {hoveredCell && (
            <div className="mt-4 text-sm text-gray-700 bg-gray-100 p-3 rounded-md">
              <div className="font-medium">
                {new Date(hoveredCell).toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="text-gray-600">{activityData[hoveredCell]} bài thi thử TOEIC</div>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-600">
            <span>Ít</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map((level) => (
                <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`} />
              ))}
            </div>
            <span>Nhiều</span>
          </div>
        </div>
      </div>
    </div>
  );
}
