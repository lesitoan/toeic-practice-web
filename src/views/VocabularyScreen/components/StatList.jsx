import { Clock, Target, Zap, Award } from 'lucide-react';
export default function StatsList() {
  const statsData = [
    {
      icon: <Target className="w-8 h-8" />,
      value: 158,
      label: 'Từ đã học hôm nay',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: 7,
      label: 'Streak (ngày liên tục)',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 2847,
      label: 'Tổng từ đã học',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: '45m',
      label: 'Thời gian học hôm nay',
      gradient: 'from-orange-500 to-orange-600',
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-bgPrimary shadow-lg p-6 rounded-lg">
      {statsData.map((stat, index) => (
        <div key={index} className={`bg-gradient-to-r ${stat.gradient} text-white p-6 rounded-2xl`}>
          <div className="flex items-center justify-between mb-2">
            {stat.icon}
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
          <p className="text-blue-100">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
