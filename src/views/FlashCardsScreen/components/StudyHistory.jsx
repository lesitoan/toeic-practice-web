import { BookOpen, Calendar, Clock, Play, Target } from 'lucide-react';

export default function StudyHistory({ history, onContinue }) {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  if (history.length === 0) {
    return (
      <div className="bg-bgSecondary rounded-lg shadow-lg p-6">
        <h3 className="text-h3 mb-4">Lịch sử học tập</h3>
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Chưa có buổi học nào. Bắt đầu học để xem tiến trình của bạn!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgSecondary rounded-lg shadow-lg p-6">
      <h3 className="text-h3 mb-4">Lịch sử học tập</h3>

      <div className="space-y-4">
        {history.map((item) => {
          const { date, time } = formatDateTime(item.studiedAt);

          return (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">{item.collectionTitle}</h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        {date} {time}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>{item.wordsStudied} words</span>
                    </div>

                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      <span>{item.accuracy}% accuracy</span>
                    </div>

                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{item.timeSpent} minutes</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onContinue(item)}
                  className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Continue
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
