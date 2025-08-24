'use client';
import { useState, useEffect } from 'react';
import { RefreshCw, HelpCircle } from 'lucide-react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFoundScreen() {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFloating((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="relative mb-12">
            <div
              className={`text-9xl sm:text-[12rem] font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-transform duration-2000 ${
                isFloating ? 'transform translate-y-2' : 'transform -translate-y-2'
              }`}
            >
              404
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-400 rounded-full animate-bounce opacity-70"></div>
            <div className="absolute -top-4 -right-12 w-12 h-12 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-green-400 rounded-full animate-bounce delay-150 opacity-50"></div>
            <div className="absolute -bottom-8 -right-8 w-14 h-14 bg-blue-400 rounded-full animate-pulse delay-300 opacity-40"></div>

            {/* Question marks floating */}
            <div className="absolute top-1/4 left-1/4">
              <HelpCircle className="w-8 h-8 text-gray-300 animate-bounce delay-500" />
            </div>
            <div className="absolute top-1/3 right-1/4">
              <HelpCircle className="w-6 h-6 text-gray-300 animate-bounce delay-700" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
              Oops! Trang không tồn tại
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Có vẻ như bạn đã đi lạc rồi! Ấn quay về trang chủ để tiếp tục nhé!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button className="bg-primary-gradient text-white !px-12 !py-7 rounded-3xl text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2">
              <Link href="/">Quay về trang chủ</Link>
            </Button>
            <Button className="!border-2 border-gray-300 text-gray-700 !px-12 !py-7 rounded-3xl text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Tải lại trang
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
