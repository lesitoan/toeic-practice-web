import { useState } from 'react';
import { Trophy, CheckCircle, Clock, Calendar, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@nextui-org/react';

export default function History({ testResults, testId }) {
  const [expandedResultId, setExpandedResultId] = useState(null);

  // Lọc kết quả theo testId nếu có
  const filteredResults = testId
    ? testResults.filter((result) => result.test_id === testId)
    : testResults;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculatePercentage = (result) => {
    if (!result || !result.total_questions) return 0;
    return Math.round((result.correct_count / result.total_questions) * 100);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-blue-50 border-blue-200';
    return 'bg-orange-50 border-orange-200';
  };

  if (filteredResults.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-sm text-center">
        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có lịch sử làm bài</h3>
        <p className="text-gray-500">
          Hoàn thành bài thi để xem kết quả và lịch sử làm bài của bạn tại đây.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results List */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Lịch sử làm bài</h2>
        <div className="space-y-4">
          {filteredResults
            .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
            .map((result, index) => {
              const percentage = calculatePercentage(result);
              const resultId = result.session_id || result.id || index;
              const isExpanded = expandedResultId === resultId;
              
              return (
                <div
                  key={resultId}
                  className={`rounded-lg border-2 transition-all ${
                    isExpanded
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {/* Main Result Card */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreBgColor(
                            percentage
                          )} border-2`}
                        >
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(percentage)}`}>
                              {result.score}
                            </div>
                            <div className="text-xs text-gray-600">điểm</div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">
                              Lần thi #{filteredResults.length - index}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full font-medium ${
                                result.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {result.status === 'completed' ? 'Hoàn thành' : result.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>
                                {result.correct_count}/{result.total_questions} câu đúng
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{percentage}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatDate(result.submitted_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedResultId(isExpanded ? null : resultId);
                        }}
                        className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Ẩn
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Xem chi tiết
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Detail Section */}
                  {isExpanded && (
                    <div className="border-t border-blue-200 bg-white px-4 pb-4 pt-4">
                      <div className="space-y-4">
                        {/* Stats Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                                  Thông tin
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                                  Giá trị
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                                  Điểm số
                                </td>
                                <td className="border border-gray-300 px-4 py-3">
                                  <span className="text-2xl font-bold text-blue-600">
                                    {result.score}
                                  </span>
                                  <span className="text-gray-600 ml-2">điểm</span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                                  Trạng thái
                                </td>
                                <td className="border border-gray-300 px-4 py-3">
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                      result.status === 'completed'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {result.status === 'completed' ? 'Hoàn thành' : result.status}
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-600" />
                                    Câu đúng
                                  </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-3">
                                  <span className="text-xl font-bold text-blue-600">
                                    {result.correct_count}
                                  </span>
                                  <span className="text-gray-600 ml-2">
                                    / {result.total_questions} câu
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                                  <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-purple-600" />
                                    Tỷ lệ đúng
                                  </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-3">
                                  <span className="text-xl font-bold text-purple-600">
                                    {calculatePercentage(result)}%
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-600" />
                                    Thời gian nộp bài
                                  </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-gray-700">
                                  {formatDate(result.submitted_at)}
                                </td>
                              </tr>
                              {result.session_id && (
                                <tr className="hover:bg-gray-50">
                                  <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                                    Mã phiên thi
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3">
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                      {result.session_id}
                                    </code>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end pt-2">
                          <Button
                            onClick={() => setExpandedResultId(null)}
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                          >
                            Ẩn chi tiết
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

    </div>
  );
}

