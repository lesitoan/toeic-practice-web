import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function ClassTestView({ classData, test, testResult }) {
  const router = useRouter();

  if (!test) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Không có đề thi nào được gán cho lớp này</p>
      </div>
    );
  }

  const isCompleted = !!testResult;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`bg-gradient-to-r ${classData.color} rounded-2xl p-8 text-white`}>
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{classData.icon}</span>
          <div>
            <h2 className="text-3xl font-bold">{classData.name}</h2>
            <p className="text-white text-opacity-90">Đề thi được gán cho lớp</p>
          </div>
        </div>
      </div>

      {/* Test Result Card (if completed) */}
      {isCompleted && (
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-2xl font-bold text-green-900">Đã hoàn thành!</h3>
                <p className="text-green-700">Bạn đã làm xong bài thi này</p>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Điểm số</p>
              <p className="text-3xl font-bold text-green-600">{testResult.score || 0}/990</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Số câu đúng</p>
              <p className="text-3xl font-bold text-blue-600">
                {testResult.correctAnswers || 0}/{testResult.totalQuestions || 200}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Độ chính xác</p>
              <p className="text-3xl font-bold text-purple-600">
                {testResult.totalQuestions
                  ? Math.round(((testResult.correctAnswers || 0) / testResult.totalQuestions) * 100)
                  : 0}
                %
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Thời gian</p>
              <p className="text-3xl font-bold text-orange-600">
                {Math.floor((testResult.timeSpent || 0) / 60)}p
              </p>
            </div>
          </div>

          {/* Completion Date */}
          {testResult.timestamp && (
            <div className="mt-4 text-center text-sm text-green-700">
              Hoàn thành lúc: {new Date(testResult.timestamp).toLocaleString('vi-VN')}
            </div>
          )}
        </div>
      )}

      {/* Test Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">{test.name || test.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Đề thi này được chọn đặc biệt cho lớp {classData.name}
            </p>
            
            {/* Test Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Thời gian</p>
                <p className="text-lg font-bold text-blue-600">{test.duration || 120} phút</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Số câu</p>
                <p className="text-lg font-bold text-purple-600">200</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Phần thi</p>
                <p className="text-lg font-bold text-green-600">7 parts</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Lượt thi</p>
                <p className="text-lg font-bold text-orange-600">{test.participants || 0}</p>
              </div>
            </div>

            {/* Start Test Button */}
            <div className="flex gap-4">
              <Button
                color={isCompleted ? 'default' : 'primary'}
                size="lg"
                className="flex-1"
                disabled={isCompleted}
                onPress={() => {
                  if (!isCompleted) {
                    // Open test in new tab with all parts selected (like PartSelection)
                    window.open(
                      `/tests/${test.id}/start?parts=1,2,3,4,5,6,7`,
                      '_blank',
                      'width=1920,height=1080'
                    );
                  }
                }}
              >
                {isCompleted ? 'Đã hoàn thành' : 'Bắt đầu làm bài'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
