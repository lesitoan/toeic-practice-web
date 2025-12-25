import { Pause, Volume2 } from 'lucide-react';
import PopupConfirmSubmit from '../PopupConfirmSubmit';
import { useState } from 'react';

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export default function QuestionNavigation({
  currentQuestion,
  jumpToQuestion,
  timeLeft,
  answers,
  questions,
  questionsByPosition,
  totalQuestions,
  testSessionSelected,
  onSubmit,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Group questions by part
  const questionsByPart = {};
  if (questions) {
    questions.forEach((q) => {
      const partNum = q.part;
      if (!questionsByPart[partNum]) {
        questionsByPart[partNum] = [];
      }
      questionsByPart[partNum].push(q);
    });
  }

  const renderQuestionGrid = () => {
    if (!testSessionSelected?.parts) {
      return <div className="text-sm text-gray-500">Đang tải câu hỏi...</div>;
    }

    const grids = [];
    testSessionSelected.parts.forEach((part) => {
      const partQuestions = questionsByPart[part.part] || [];
      const questionButtons = [];

      partQuestions.forEach((q) => {
        const position = q.position;
        const isAnswered = answers[position];
        const isCurrent = position === currentQuestion;

        questionButtons.push(
          <button
            key={position}
            onClick={() => jumpToQuestion(position)}
            className={`w-8 h-8 text-xs border rounded ${
              isCurrent
                ? 'bg-blue-600 text-white border-blue-600'
                : isAnswered
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {position}
          </button>
        );
      });

      if (questionButtons.length > 0) {
        grids.push(
          <div key={part.part} className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Part {part.part}</h4>
            <div className="grid grid-cols-7 gap-1">{questionButtons}</div>
          </div>
        );
      }
    });
    return grids;
  };

  return (
    <div className="w-80 bg-bgSecondary rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            {testSessionSelected?.template?.name || 'Test'}
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">Thoát</button>
        </div>

        <div className="bg-white rounded-lg p-3 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatTime(timeLeft)}</div>
            <div className="text-xs text-gray-600">Thời gian còn lại</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="text-lg text-white hover:bg-green-400 w-full bg-green-600 py-2 rounded-lg"
          >
            Nộp bài
          </button>
        </div>
      </div>

      {/* Audio Controls */}
      {/* <div className="bg-white rounded-lg p-3 mb-4">
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
      </div> */}

      {/* Part Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {testSessionSelected?.parts?.map((part) => {
          const partQuestions = questionsByPart[part.part] || [];
          const firstQuestionPos = partQuestions.length > 0 ? partQuestions[0].position : null;
          const currentQuestionData = questionsByPosition[currentQuestion];
          const isActive = currentQuestionData?.part === part.part;

          if (!firstQuestionPos) return null;

          return (
            <button
              key={part.part}
              onClick={() => jumpToQuestion(firstQuestionPos)}
              className={`px-3 py-1 text-sm rounded ${
                isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Part {part.part}
            </button>
          );
        })}
      </div>

      {/* Question Grid */}
      <div className="space-y-4 h-[50vh] overflow-scroll">{renderQuestionGrid()}</div>
      <PopupConfirmSubmit
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
}
