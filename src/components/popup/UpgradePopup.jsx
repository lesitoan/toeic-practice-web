import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function UpgradePopup() {
  const router = useRouter();
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
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Nâng Cấp Trải Nghiệm Học Tập! 🚀
          </h2>

          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            Khám phá các gói Premium với nhiều tính năng độc quyền để tối ưu hóa việc luyện thi
            TOEIC của bạn
          </p>

          <div className="space-y-3 mb-8">
            {[
              'Truy cập không giới hạn tất cả bài test',
              'Phân tích chi tiết kết quả học tập',
              'Lộ trình học cá nhân hóa',
              'Hỗ trợ ưu tiên 24/7',
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Button
              color="primary"
              className="text-lg w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-7 rounded-xl font-semibold
                       hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                       shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
              onPress={() => router.push('/pricing')}
            >
              <span>Xem Gói Pricing</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>

            <button
              className="w-full text-gray-500 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
              onClick={() => router.back()}
            >
              Quay lại
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-80" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-pink-400 rounded-full opacity-60" />
      </div>
    </div>
  );
}
