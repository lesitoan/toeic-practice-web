import { Clock, FileText, Star, Users } from 'lucide-react';

export default function TestOverview({ testData }) {
  return (
    <div className="bg-bgSecondary rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h1">{testData.title}</h1>
            <p className="text-gray-600 mt-2">{testData.description || ''}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Thời gian</span>
            </div>
            <p className="text-xl font-semibold text-blue-600">{testData.duration} phút</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Số câu hỏi</span>
            </div>
            <p className="text-xl font-semibold text-green-600">{testData.totalQuestions}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Đã hoàn thành</span>
            </div>
            <p className="text-xl font-semibold text-purple-600">{testData.completions}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Điểm TB</span>
            </div>
            <p className="text-xl font-semibold text-yellow-600">{testData.averageScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
