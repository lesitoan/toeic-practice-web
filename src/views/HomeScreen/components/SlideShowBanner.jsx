import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlideShowBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'LUYỆN ĐỀ ONLINE',
      subtitle: 'KHÔNG GIỚI HẠN',
      features: [
        'Kho đề TOEIC phong phú',
        'Giao diện giống thi thật, thân thiện với người dùng',
        'Tự chọn part và thời gian làm theo nhu cầu',
        'Report điểm tự động + đánh giá chi tiết bài làm',
      ],
      stats: {
        tests: '3000',
        users: '1M+',
      },
      image: '/api/placeholder/400/300',
    },
    {
      id: 2,
      title: 'HỌC TỪ VỰNG ONLINE',
      subtitle: 'HIỆU QUẢ CAO',
      features: [
        'Cung cấp từ vựng sát với đề thi TOEIC',
        'Học từ vựng theo chủ đề',
        'Học linh hoạt theo thời gian của bạn',
        'Có chức năng flashcard giúp ghi nhớ từ vựng',
        'Học mọi lúc mọi nơi',
      ],
      stats: {
        courses: '500+',
        users: '1M+',
      },
      image: '/api/placeholder/400/300',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden rounded-lg shadow-lg">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-blue-600" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6 text-blue-600" />
      </button>

      {/* Main Content */}
      <div className="flex h-full">
        {/* Left Content */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 text-white px-3 py-2 rounded-md font-bold text-lg mr-3">
              TOEIC PRACTICE
            </div>
            <div className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-blue-800 leading-tight">
              {currentSlideData.title}
            </h1>
            <h2 className="text-4xl font-bold text-blue-800 leading-tight">
              {currentSlideData.subtitle}
            </h2>
          </div>

          {/* Features List */}
          <div className="space-y-2">
            {currentSlideData.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 relative flex items-center justify-center p-8">
          {/* Stats Badges */}
          <div className="absolute top-4 left-4 bg-pink-400 text-white px-4 py-2 rounded-full font-bold shadow-lg z-10">
            {Object.values(currentSlideData.stats)[0]}
            <div className="text-xs opacity-90">đề thi</div>
          </div>

          <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-lg z-10">
            {Object.values(currentSlideData.stats)[1]}
            <div className="text-xs opacity-90">users</div>
          </div>

          {/* Main Image Container */}
          <div className="relative w-80 h-64 bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-2">
            {/* Simulated laptop/device */}
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="w-64 h-40 bg-white rounded-lg shadow-inner flex items-center justify-center">
                {/* Simulated person studying */}
                <div className="w-24 h-24 bg-yellow-300 rounded-full relative">
                  <div className="absolute top-2 left-2 w-4 h-4 bg-black rounded-full"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 bg-black rounded-full"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-pink-400 rounded-full"></div>
                </div>
              </div>

              {/* Headphones effect */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-black rounded-full opacity-20"></div>
            </div>

            {/* Laptop screen effect */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300"></div>
          </div>

          {/* Decorative stickers */}
          <div className="absolute top-16 right-8 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
          <div className="absolute bottom-16 left-8 w-6 h-6 bg-green-400 rounded-full opacity-80"></div>
          <div className="absolute top-32 left-16 w-4 h-4 bg-red-400 rounded-full opacity-80"></div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
