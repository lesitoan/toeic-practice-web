import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import { parts, sampleQuestions } from '../../constants';

export default function MainContent({
  currentQuestion,
  answers,
  handleAnswer,
  setCurrentQuestion,
}) {
  const getCurrentPart = (questionNum) => {
    return parts.find((part) => questionNum >= parts.startQ && questionNum <= part.endQ);
  };

  const nextQuestion = () => {
    if (currentQuestion < 200) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderCurrentQuestion = () => {
    const question = sampleQuestions[currentQuestion];
    const currentPart = getCurrentPart(currentQuestion);

    if (!question) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-600 mb-4">Câu hỏi số {currentQuestion}</p>
          <p className="text-sm text-gray-500">
            {currentPart?.name} - {currentPart?.type}
          </p>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentQuestion}.</h3>

          {question.type === 'image' && (
            <div className="mb-6">
              <img
                src={question.image}
                alt="TOEIC Question"
                className="max-w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {question.type === 'audio' && (
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-4">
                <Volume2 className="w-6 h-6 text-gray-600" />
                <p className="text-gray-700">Audio will be played automatically</p>
              </div>
            </div>
          )}

          {question.question && (
            <div className="mb-6">
              <p className="text-lg text-gray-900">{question.question}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionKey = String.fromCharCode(65 + index);
            const isSelected = answers[currentQuestion] === optionKey;

            return (
              <label
                key={index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  isSelected ? 'bg-blue-50 border-blue-300' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={optionKey}
                  checked={isSelected}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-4 h-4 text-blue-600 mr-3"
                />
                <span className="text-gray-900">
                  {typeof option === 'string' && option.includes('.')
                    ? option
                    : `${optionKey}. ${option}`}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-bgSecondary rounded-lg shadow-lg p-6">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 1}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-gray-900">Câu {currentQuestion} / 200</span>
            <button
              onClick={nextQuestion}
              disabled={currentQuestion === 200}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-sm text-gray-600">
            {getCurrentPart(currentQuestion)?.name} - {getCurrentPart(currentQuestion)?.type}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 overflow-y-auto">{renderCurrentQuestion()}</div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 1}
            className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Câu trước
          </button>

          <div className="text-sm text-gray-600">
            Đã trả lời: {Object.keys(answers).length} / 200
          </div>

          <button
            onClick={nextQuestion}
            disabled={currentQuestion === 200}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Câu tiếp theo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
