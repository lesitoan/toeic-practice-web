import { useState, useEffect } from 'react';
import { Trophy, RotateCcw, ArrowLeft, Star, Zap } from 'lucide-react';

export default function PopupFinishLearnCard({
  onRestart,
  onGoBack,
  collectionName = null,
  totalCards = 0,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const isOpen = true;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Popup */}
      <div
        className={`
          relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 
          transform transition-all duration-300 ease-out z-10
          ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}
        `}
      >
        <div className="p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full opacity-20 animate-pulse" />

              {/* Floating stars */}
              <Star
                className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce"
                style={{ animationDelay: '0s' }}
              />
              <Star
                className="absolute -top-4 left-2 w-4 h-4 text-yellow-300 animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
              <Star
                className="absolute -bottom-2 -left-2 w-5 h-5 text-orange-400 animate-bounce"
                style={{ animationDelay: '0.4s' }}
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Chúc Mừng! 🎉</h2>

          <p className="text-lg text-center text-gray-600 mb-6">Bạn đã hoàn thành</p>

          {/* Collection Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-purple-600" />
              {collectionName && <h3 className="font-semibold text-gray-800">{collectionName}</h3>}
            </div>
            {totalCards > 0 && (
              <p className="text-center text-sm text-gray-600">{totalCards} thẻ từ vựng</p>
            )}
          </div>

          {/* Motivational Message */}
          <p className="text-center text-gray-600 mb-8 leading-relaxed">
            Tuyệt vời! Bạn đang tiến bộ từng ngày. Hãy tiếp tục luyện tập để ghi nhớ tốt hơn nhé! 💪
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold
                       hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                       shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
              onClick={onRestart}
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Học Lại</span>
            </button>

            <button
              className="w-full text-gray-700 bg-gray-100 py-4 px-6 rounded-xl font-medium 
                       hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
              onClick={onGoBack}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay Lại</span>
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-24 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-80 animate-pulse" />
        <div className="absolute top-8 -right-3 w-4 h-4 bg-orange-400 rounded-full opacity-60" />
        <div
          className="absolute -bottom-3 -left-3 w-8 h-8 bg-pink-400 rounded-full opacity-60 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        <div className="absolute bottom-8 -left-2 w-5 h-5 bg-purple-400 rounded-full opacity-50" />
      </div>
    </div>
  );
}
