import { Star } from 'lucide-react';
import { COMMENTS } from '../../constants';

export default function Comments({ testData }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Bình luận và đánh giá</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(Math.floor(testData.rating))}</div>
              <span className="font-semibold">{testData.rating}/5</span>
              <span className="text-gray-500">({COMMENTS.length} đánh giá)</span>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-4">Chia sẻ trải nghiệm của bạn</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Đánh giá</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer"
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bình luận</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Chia sẻ cảm nghĩ của bạn về đề thi này..."
              />
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Gửi bình luận
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {COMMENTS.map((comment) => (
            <div key={comment.id} className="p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{comment.user}</span>
                    <div className="flex">{renderStars(comment.rating)}</div>
                    <span className="text-gray-500 text-sm">{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
