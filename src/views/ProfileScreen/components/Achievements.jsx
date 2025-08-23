import { CheckCircle } from 'lucide-react';
import { ACHIEVEMENTS } from '../constans';

const Achievements = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Thành tích đã đạt được</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACHIEVEMENTS.map((achievement, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border-2 ${
              achievement.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* <div
                className={`p-3 rounded-lg ${
                  achievement.unlocked ? 'bg-green-100' : 'bg-gray-200'
                }`}
              >
                <achievement.icon
                  className={`w-6 h-6 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`}
                />
              </div> */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                  {achievement.unlocked && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
                <p className="text-gray-600 text-sm">{achievement.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
