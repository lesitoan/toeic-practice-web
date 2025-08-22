import React from 'react';
import { FileText, Headphones, Brain } from 'lucide-react';

const Progress = ({ userData }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Chi tiết tiến độ học tập</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Reading</h4>
          <div className="text-2xl font-bold text-blue-600 mb-1">380/495</div>
          <div className="text-sm text-gray-600">Điểm trung bình</div>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <Headphones className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Listening</h4>
          <div className="text-2xl font-bold text-green-600 mb-1">370/495</div>
          <div className="text-sm text-gray-600">Điểm trung bình</div>
        </div>
        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <Brain className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Vocabulary</h4>
          <div className="text-2xl font-bold text-purple-600 mb-1">85%</div>
          <div className="text-sm text-gray-600">Độ chính xác</div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
