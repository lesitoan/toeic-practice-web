import { useState, useEffect } from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

export default function PopupConfirmSubmit({ isOpen, onClose, onSubmit }) {
  const [isVisible, setIsVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await onSubmit();
    setIsVisible(false);
    setSubmitting(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
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
          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-20 animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Xác Nhận Nộp Bài</h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Bạn có chắc chắn muốn nộp bài thi không?
          </p>

          {/* Stats Section */}
          <div className="space-y-3 mb-6"></div>

          {/* Info Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-700">
              <span className="font-semibold">📌 Lưu ý:</span> Sau khi nộp bài, bạn sẽ không thể
              thay đổi câu trả lời. Hãy chắc chắn rằng bạn đã kiểm tra kỹ trước khi nộp.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              disabled={submitting}
              onClick={handleSubmit}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg h-12 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Đang nộp...' : 'Xác Nhận Nộp Bài'}
            </button>

            <button
              disabled={submitting}
              onClick={handleClose}
              className={`w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg h-12 transition-all duration-200 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Kiểm Tra Lại
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full opacity-80" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-red-400 rounded-full opacity-60" />
      </div>
    </div>
  );
}
