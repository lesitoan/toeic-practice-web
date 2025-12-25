import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import PassageContentPreview from '../PassageContentPreview/PassageContentPreview';

export default function MainContent({
  currentQuestion,
  answers,
  handleAnswer,
  setCurrentQuestion,
  questionsByPosition,
  totalQuestions,
  testSessionSelected,
}) {
  const questionData = questionsByPosition[currentQuestion];

  const questionPositions = Object.keys(questionsByPosition)
    .map(Number)
    .sort((a, b) => a - b);

  const getCurrentPart = (position) => {
    if (!questionData) return null;
    const partNumber = questionData.part;
    return {
      id: partNumber,
      name: `Part ${partNumber}`,
      type: partNumber <= 4 ? 'Listening' : 'Reading',
    };
  };

  const getNextQuestionPosition = () => {
    const currentIndex = questionPositions.indexOf(currentQuestion);
    if (currentIndex < questionPositions.length - 1) {
      return questionPositions[currentIndex + 1];
    }
    return currentQuestion;
  };

  const getPrevQuestionPosition = () => {
    const currentIndex = questionPositions.indexOf(currentQuestion);
    if (currentIndex > 0) {
      return questionPositions[currentIndex - 1];
    }
    return currentQuestion;
  };

  const nextQuestion = () => {
    const nextPos = getNextQuestionPosition();
    if (nextPos !== currentQuestion) {
      setCurrentQuestion(nextPos);
    }
  };

  const prevQuestion = () => {
    const prevPos = getPrevQuestionPosition();
    if (prevPos !== currentQuestion) {
      setCurrentQuestion(prevPos);
    }
  };

  const renderCurrentQuestion = () => {
    const currentPart = getCurrentPart(currentQuestion);

    if (!questionData) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-600 mb-4">Đang tải câu hỏi...</p>
        </div>
      );
    }

    const passage = questionData.passage;
    const requiresPassage = questionData.requires_passage;
    const questionAnswers = questionData.answers || [];
    const isListeningPart = questionData.part <= 4;

    return (
      <div className="p-6">
        {/* Render group-level content preview */}
        <PassageContentPreview passage={passage} />

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Câu {questionData.position}.</h3>

          {/* Render passage if required or if it's a listening part with audio */}
          {/* {(requiresPassage || (isListeningPart && passage?.type === 'AUDIO')) && passage && (
            <div className="mb-6">
              {passage.type === 'IMAGE' && (
                <div className="mb-6">
                  {passage.public_id ? (
                    <img
                      src={passage.public_id}
                      alt="TOEIC Question"
                      className="max-w-full h-64 object-contain rounded-lg border"
                    />
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-6 text-center">
                      <p className="text-gray-600">Hình ảnh sẽ được hiển thị tại đây</p>
                    </div>
                  )}
                </div>
              )}

              {passage.type === 'AUDIO' && (
                <div className="bg-gray-100 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <Volume2 className="w-6 h-6 text-gray-600" />
                    <p className="text-gray-700">
                      {passage.public_id
                        ? 'Audio sẽ được phát tự động'
                        : 'Audio sẽ được phát tự động'}
                    </p>
                  </div>
                  {passage.content_preview && (
                    <div className="mt-4 p-4 bg-white rounded text-sm text-gray-600">
                      {passage.content_preview}
                    </div>
                  )}
                </div>
              )}

              {passage.type === 'TEXT' && (
                <div className="mb-6 bg-gray-50 rounded-lg p-6 border">
                  {passage.content ? (
                    <div className="whitespace-pre-wrap text-gray-900">{passage.content}</div>
                  ) : passage.content_preview ? (
                    <div className="whitespace-pre-wrap text-gray-900">
                      {passage.content_preview}
                    </div>
                  ) : (
                    <p className="text-gray-600">Nội dung passage sẽ được hiển thị tại đây</p>
                  )}
                </div>
              )}
            </div>
          )} */}

          {/* Render question content */}
          {questionData.content && (
            <div className="mb-6">
              <p className="text-lg text-gray-900">{questionData.content}</p>
            </div>
          )}
        </div>

        {/* Render answers */}
        <div className="space-y-3">
          {questionAnswers.map((answer, index) => {
            const optionKey = String.fromCharCode(65 + index);
            const isSelected =
              answers[currentQuestion] === answer.id?.toString() ||
              answers[currentQuestion] === optionKey;

            return (
              <label
                key={answer.id || index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  isSelected ? 'bg-blue-50 border-blue-300' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={answer.id?.toString() || optionKey}
                  checked={isSelected}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-4 h-4 text-blue-600 mr-3"
                />
                <span className="text-gray-900">
                  {optionKey}. {answer.text}
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
              disabled={getPrevQuestionPosition() === currentQuestion}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-gray-900">
              Câu {currentQuestion} / {totalQuestions}
            </span>
            <button
              onClick={nextQuestion}
              disabled={getNextQuestionPosition() === currentQuestion}
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
            disabled={getPrevQuestionPosition() === currentQuestion}
            className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Câu trước
          </button>

          <div className="text-sm text-gray-600">
            Đã trả lời: {Object.keys(answers).length} / {totalQuestions}
          </div>

          <button
            onClick={nextQuestion}
            disabled={getNextQuestionPosition() === currentQuestion}
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
