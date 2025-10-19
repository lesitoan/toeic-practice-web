'use client';
import { useState, useEffect } from 'react';
import { Check, X, ArrowLeft, Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import authServices from '@/services/auth.service';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export default function ActiveAccountScreen() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    const token = searchParams.get('s');
    const userId = searchParams.get('id');

    if (!token || !userId) {
      setStatus(STATUS.ERROR);
      return;
    }

    const verify = async () => {
      try {
        const response = await authServices.verifyAccount({ userId, token });
        if (!response || response.errors) {
          setStatus(STATUS.ERROR);
        } else {
          setStatus(STATUS.SUCCESS);
        }
      } catch (error) {
        setStatus(STATUS.ERROR);
      }
    };
    verify();
  }, [searchParams]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-spin">
              <Loader className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">Đang Xác Thực...</h2>
            <p className="text-gray-600 text-center">
              Vui lòng chờ trong khi chúng tôi kích hoạt tài khoản của bạn
            </p>
          </div>
        )}

        {status === STATUS.SUCCESS && (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full opacity-20 animate-pulse" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác Thực Thành Công! 🎉</h2>
              <p className="text-gray-600">Tài khoản của bạn đã được kích hoạt thành công!</p>
            </div>

            <div className="w-full pt-4 space-y-3">
              <Button color="primary" className="w-full rounded-lg h-12 shadow-md  cursor-pointer">
                <Link href="/login" className="flex gap-2 items-center justify-center">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span>Đăng Nhập Ngay</span>
                </Link>
              </Button>
            </div>

            <div className="absolute top-0 left-1/4 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full opacity-80" />
          </div>
        )}

        {/* Error State */}
        {status === STATUS.ERROR && (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <X className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full opacity-20 animate-pulse" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác Thực Thất Bại ❌</h2>
              <p className="text-gray-600">
                Có lỗi xảy ra trong quá trình xác thực tài khoản của bạn.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 w-full">
              <p className="text-xs text-amber-800">
                <span className="font-semibold">💡 Gợi ý:</span> Vui lòng yêu cầu gửi lại email xác
                thực hoặc thử đăng ký lại.
              </p>
            </div>

            <div className="w-full pt-4 space-y-3">
              <Button color="primary" className="w-full rounded-lg h-12 shadow-md  cursor-pointer">
                <Link href="/sign-up" className="flex gap-2 items-center justify-center">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span>Đăng kí tài khoản</span>
                </Link>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-20 h-1 bg-gradient-to-r from-red-500 to-pink-600 rounded-full" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full opacity-80" />
          </div>
        )}
      </div>
    </div>
  );
}
