import { Pause, Volume2 } from 'lucide-react';
import { parts } from '../../constants';

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export default function QuestionNavigation({ currentQuestion, jumpToQuestion, timeLeft, answers }) {
  const renderQuestionGrid = () => {
    const grids = [];
    parts.forEach((part) => {
      const questions = [];
      for (let i = part.startQ; i <= part.endQ; i++) {
        const isAnswered = answers[i];
        const isCurrent = i === currentQuestion;
        questions.push(
          <button
            key={i}
            onClick={() => jumpToQuestion(i)}
            className={`w-8 h-8 text-xs border rounded ${
              isCurrent
                ? 'bg-blue-600 text-white border-blue-600'
                : isAnswered
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {i}
          </button>
        );
      }

      grids.push(
        <div key={part.id} className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">{part.name}</h4>
          <div className="grid grid-cols-7 gap-1">{questions}</div>
        </div>
      );
    });
    return grids;
  };

  return (
    <div className="w-80 bg-bgSecondary rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Test 1</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">Thoát</button>
        </div>

        <div className="bg-white rounded-lg p-3 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatTime(timeLeft)}</div>
            <div className="text-xs text-gray-600">Thời gian còn lại</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button className="text-sm text-blue-600 hover:text-blue-800">Nộp bài</button>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="bg-white rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">00:00</span>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-600" />
            <div className="w-4 h-1 bg-blue-600 rounded"></div>
          </div>
          <button className="text-blue-600">
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Part Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {parts.map((part) => {
          const isActive = currentQuestion >= part.startQ && currentQuestion <= part.endQ;
          return (
            <button
              key={part.id}
              onClick={() => jumpToQuestion(part.startQ)}
              className={`px-3 py-1 text-sm rounded ${
                isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {part.name}
            </button>
          );
        })}
      </div>

      {/* Question Grid */}
      <div className="space-y-4 h-[50vh] overflow-scroll">{renderQuestionGrid()}</div>
    </div>
  );
}
