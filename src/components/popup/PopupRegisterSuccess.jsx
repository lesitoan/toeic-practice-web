import { useState, useEffect } from 'react';
import { Check, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

export default function PopupRegisterSuccess({ isOpen, onClose, email }) {
  const [isVisible, setIsVisible] = useState(false);

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

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
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
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full opacity-20 animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Đăng Ký Thành Công! 🎉
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Chào mừng bạn đến với TOEIC Practice
          </p>

          {/* Email Verification Section */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">Xác Thực Email</h3>
                {email && (
                  <p className="text-sm text-gray-600 mb-3">
                    Chúng tôi đã gửi liên kết xác thực đến: {email}
                  </p>
                )}
                <p className="text-sm font-semibold text-blue-600 break-all mb-3">{email || ''}</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Vui lòng kiểm tra hộp thư của bạn (bao gồm thư mục Spam) và nhấp vào liên kết để
                  kích hoạt tài khoản.
                </p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-amber-800">
              <span className="font-semibold">💡 Mẹo:</span> Nếu bạn không nhận được email, hãy kiểm
              tra thư mục Spam hoặc thử đăng ký lại.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button color="primary" className="w-full rounded-lg h-12 shadow-md  cursor-pointer">
              <Link href="/">Quay Lại Trang Chủ</Link>
            </Button>

            <Button
              color="default"
              className="w-full rounded-lg h-12 shadow-md  cursor-pointer"
              onClick={handleClose}
            >
              Đóng
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full opacity-80" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-blue-400 rounded-full opacity-60" />
      </div>
    </div>
  );
}
