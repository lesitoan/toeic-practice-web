import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { SAMPLE_ANSWERS } from '../../constants';
import { useState } from 'react';

export default function Answers() {
  const [expandedAnswers, setExpandedAnswers] = useState({});

  const toggleAnswerExpansion = (questionId) => {
    setExpandedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Đáp án và giải thích chi tiết</h2>
        <div className="space-y-4">
          {SAMPLE_ANSWERS.map((item) => (
            <div key={item.question} className="border rounded-lg overflow-hidden">
              <div
                onClick={() => toggleAnswerExpansion(item.question)}
                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                    {item.question}
                  </div>
                  <span className="font-medium">Câu hỏi {item.question}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Đáp án: {item.answer}
                  </span>
                </div>
                {expandedAnswers[item.question] ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {expandedAnswers[item.question] && (
                <div className="p-4 border-t">
                  <h4 className="font-semibold mb-2">Giải thích:</h4>
                  <p className="text-gray-700">{item.explanation}</p>
                </div>
              )}
            </div>
          ))}

          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-lg">
              <FileText className="w-5 h-5" />
              <span>Hoàn thành bài thi để xem tất cả đáp án</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
