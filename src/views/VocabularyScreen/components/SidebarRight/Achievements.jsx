import { Award } from 'lucide-react';
import { achievements } from '../../constants';

export default function Achievements() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-yellow-500" />
        Thành tích
      </h3>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="text-2xl">{achievement.icon}</div>
            <div>
              <div className="font-semibold text-gray-800">{achievement.title}</div>
              <div className="text-sm text-gray-600">{achievement.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
