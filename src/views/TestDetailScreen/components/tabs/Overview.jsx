import { Star } from 'lucide-react';
import { PARTS } from '../../constants';

export default function Overview({ testData }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Thông tin đề thi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Mức độ</p>
              <p className="font-semibold">{testData.difficulty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ngày tạo</p>
              <p className="font-semibold">{testData.createdDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Đánh giá</p>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(Math.floor(testData.rating))}</div>
                <span className="font-semibold">{testData.rating}/5</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Lượt thi</p>
              <p className="font-semibold">{testData.completions} lượt</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Cấu trúc đề thi</h2>
          <div className="space-y-4">
            {PARTS.map((part) => (
              <div
                key={part.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                      part.type === 'Listening' ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                  >
                    {part.id}
                  </div>
                  <div>
                    <p className="font-semibold">{part.name}</p>
                    <p className="text-sm text-gray-600">{part.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{part.questions} câu</p>
                  <p className="text-sm text-gray-600">{part.duration} phút</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <UserGuide />
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips làm bài</h3>
          <p className="text-sm text-blue-700">
            Hãy làm đầy đủ bài thi để có trải nghiệm chính xác nhất. Bạn có thể chọn làm từng phần
            riêng lẻ để luyện tập kỹ năng cụ thể.
          </p>
        </div>
      </div>
    </div>
  );
}

function UserGuide() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold mb-4">Hướng dẫn làm bài</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
          <p>Đọc kỹ hướng dẫn trước khi làm bài</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
          <p>Quản lý thời gian hợp lý cho từng phần</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
          <p>Có thể tạm dừng và tiếp tục sau</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
          <p>Xem đáp án và giải thích sau khi hoàn thành</p>
        </div>
      </div>
    </div>
  );
}
