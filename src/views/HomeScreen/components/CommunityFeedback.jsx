import React, { useState } from 'react';
import { Send, Star, Quote, User, MessageSquare } from 'lucide-react';

const CommunityFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      user: {
        name: 'Văn An',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=60&h=60&fit=crop&crop=face&auto=format',
        role: 'Sinh viên',
      },
      content:
        'Nền tảng này thực sự hữu ích cho việc luyện thi TOEIC. Giao diện thân thiện, đề thi chất lượng cao và hệ thống chấm điểm chính xác giúp tôi cải thiện điểm số rất nhiều.',
      rating: 5,
    },
    {
      id: 2,
      user: {
        name: 'Quốc Bảo',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format',
        role: 'Lập trình viên',
      },
      content:
        'Tôi đã tăng được 200 điểm TOEIC chỉ sau 2 tháng luyện tập. Đặc biệt từ điển tích hợp rất tiện lợi, không cần chuyển tab khi gặp từ mới.',
      rating: 5,
    },
    {
      id: 3,
      user: {
        name: 'Minh Thư',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face&auto=format',
        role: 'Nhân viên văn phòng',
      },
      content:
        'Bộ đề thi mô phỏng rất sát với đề thật. Tôi đã tự tin hơn rất nhiều khi bước vào phòng thi nhờ luyện tập đều đặn trên TOEIC Practice.',
      rating: 5,
    },
    {
      id: 4,
      user: {
        name: 'Hoàng Nam',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format',
        role: 'Học viên',
      },
      content:
        'Khóa học rất chi tiết và dễ hiểu. Phần Listening được hỗ trợ tốt với âm thanh chuẩn. Phần Reading có giải thích từ vựng rất kỹ càng.',
      rating: 5,
    },
    {
      id: 5,
      user: {
        name: 'Thanh Mai',
        avatar:
          'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&crop=face&auto=format',
        role: 'Marketing',
      },
      content:
        'Flashcard từ vựng giúp tôi ghi nhớ từ mới hiệu quả. Hệ thống ôn tập theo chu kỳ rất khoa học, phù hợp với người đi làm như tôi.',
      rating: 4,
    },
    {
      id: 6,
      user: {
        name: 'Thu Hương',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face&auto=format',
        role: 'Giáo viên',
      },
      content:
        'Một nền tảng học tập tuyệt vời! Tôi thường giới thiệu cho học sinh của mình. Các em rất thích học trên đây và tiến bộ nhanh chóng.',
      rating: 5,
    },
  ]);

  const [newFeedback, setNewFeedback] = useState({
    content: '',
    rating: 5,
  });

  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!newFeedback.content.trim()) return;

    setIsSubmitting(true);

    // Simulate API call with 5 second loading
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const feedback = {
      id: Date.now(),
      user: {
        name: 'Bạn',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face&auto=format',
        role: 'User',
      },
      content: newFeedback.content,
      rating: newFeedback.rating,
    };

    setFeedbacks([feedback, ...feedbacks]);
    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setNewFeedback({ content: '', rating: 5 });
      setShowSuccess(false);
    }, 2000);
  };

  const displayedFeedbacks = feedbacks.slice(currentFeedbackIndex, currentFeedbackIndex + 6);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const FeedbackCard = ({ feedback }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={feedback.user.avatar}
          alt={feedback.user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{feedback.user.name}</h4>
          <p className="text-xs text-blue-600 font-medium">{feedback.user.role}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-3">{renderStars(feedback.rating)}</div>

      {/* Content */}
      <div className="relative">
        <Quote className="absolute -top-1 -left-1 w-6 h-6 text-blue-200" />
        <p className="text-gray-700 text-sm leading-relaxed pl-4">{feedback.content}</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto p-4 md:p-6 bg-gray-50 shadow-lg rounded-lg">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Feedback Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex -space-x-2">
                {feedbacks.slice(0, 6).map((feedback, index) => (
                  <img
                    key={feedback.id}
                    src={feedback.user.avatar}
                    alt={feedback.user.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover"
                    style={{ zIndex: 6 - index }}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <Quote className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                <Quote className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Phản hồi từ cộng đồng
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Hàng nghìn học viên đã chia sẻ trải nghiệm tuyệt vời của họ
            </p>
          </div>

          {/* Feedback Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-6 lg:mb-8">
            {displayedFeedbacks.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2">
            {[...Array(Math.ceil(feedbacks.length / 6))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeedbackIndex(index * 6)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  Math.floor(currentFeedbackIndex / 6) === index
                    ? 'bg-blue-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Feedback Form */}
        <div className="w-full lg:w-80 xl:w-96">
          <div className="lg:sticky lg:top-6">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
              <div className="text-center mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  Chia sẻ trải nghiệm
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  Feedback của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn
                </p>
              </div>

              {/* Rating Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá của bạn
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 md:w-6 md:h-6 ${
                          star <= newFeedback.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 hover:text-yellow-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs md:text-sm text-gray-600">
                    ({newFeedback.rating}/5)
                  </span>
                </div>
              </div>

              {/* User Info Display */}
              <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&auto=format"
                  alt="Your avatar"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Bạn</p>
                  <p className="text-xs text-blue-600">Học viên</p>
                </div>
              </div>

              {/* Content Input */}
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung feedback
                </label>
                <textarea
                  value={newFeedback.content}
                  onChange={(e) => setNewFeedback({ ...newFeedback, content: e.target.value })}
                  placeholder="Chia sẻ trải nghiệm của bạn về khóa học, giảng viên, nội dung..."
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  rows="4"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">Tối thiểu 10 ký tự</span>
                  <span className="text-xs text-gray-400">{newFeedback.content.length}/500</span>
                </div>
              </div>

              {/* Submit Button */}
              {showSuccess ? (
                <div className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white py-2 md:py-3 rounded-lg font-medium text-sm md:text-base">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Đã gửi thành công!</span>
                </div>
              ) : (
                <button
                  onClick={handleSubmitFeedback}
                  disabled={!newFeedback.content.trim() || newFeedback.content.length < 10 || isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 md:py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Gửi feedback</span>
                    </>
                  )}
                </button>
              )}

              {/* Tips */}
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  💡 Gợi ý viết feedback hay:
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Chia sẻ những gì bạn học được</li>
                  <li>• Đánh giá chất lượng nội dung</li>
                  <li>• Góp ý để cải thiện trải nghiệm</li>
                  <li>• Kể về sự thay đổi tích cực</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedback;
