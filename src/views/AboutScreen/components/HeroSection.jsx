import { Button } from '@nextui-org/react';
import { Play } from 'lucide-react';
export default function HeroSection() {
  return (
    <section className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 bg-bgSecondary shadow-lg rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  LUYỆN ĐỀ ONLINE
                </span>
                <br />
                <span className="text-gray-800">KHÔNG GIỚI HẠN</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Nền tảng luyện thi TOEIC trực tuyến hàng đầu với hàng nghìn câu hỏi thực tế, từ điển
                tích hợp và hệ thống chấm điểm thông minh.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary-gradient text-white !px-8 !py-6 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Bắt đầu luyện thi
              </Button>
              <Button className="border-2 border-gray-300 text-gray-700 !px-8 !py-6 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
                Xem demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1K+</div>
                <div className="text-gray-600">Học viên</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-gray-600">Đề thi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.9★</div>
                <div className="text-gray-600">Đánh giá</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform rotate-2">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-4">TOEIC Practice Test</div>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                      Listening Section
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="text-sm text-green-600 font-semibold mb-2">Reading Section</div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl text-center">
                  <div className="text-lg font-semibold">Điểm dự kiến: 850+</div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform -rotate-2"></div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
