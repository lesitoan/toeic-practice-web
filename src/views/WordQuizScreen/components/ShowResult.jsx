import { Award, RotateCw } from 'lucide-react';

export default function ShowResult({ score, total, onRestart }) {
  const percentage = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center ${
                percentage >= 80
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                  : percentage >= 60
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-500'
                    : 'bg-gradient-to-r from-gray-400 to-gray-500'
              }`}
            >
              <Award className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse" />
          </div>
        </div>

        {/* Result Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {percentage >= 80
            ? 'Xuất sắc! 🎉'
            : percentage >= 60
              ? 'Tốt lắm! 👏'
              : 'Cố gắng hơn nhé! 💪'}
        </h2>

        {/* Score */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {score}/{total}
          </div>
          <p className="text-gray-600 text-lg">Điểm số: {percentage}%</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-sm text-gray-600">Đúng</div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{total - score}</div>
            <div className="text-sm text-gray-600">Sai</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{total}</div>
            <div className="text-sm text-gray-600">Tổng</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold
                       hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                       shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <RotateCw className="w-5 h-5" />
            <span>Làm lại</span>
          </button>

          <button
            onClick={() => {}}
            className="w-full text-gray-700 bg-gray-100 py-4 px-6 rounded-xl font-medium 
                       hover:bg-gray-200 transition-all duration-200"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
