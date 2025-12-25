'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Check, ArrowLeft, CreditCard, Smartphone, Building2, Clock } from 'lucide-react';
import { Button } from '@nextui-org/react';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const planName = searchParams.get('plan') || 'Pro';
  const price = parseInt(searchParams.get('price') || '0');
  const billing = searchParams.get('billing') || 'monthly';

  // Countdown timer (2 minutes = 120 seconds)
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/'); // Redirect to homepage after countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate QR code data (fake payment URL)
  const paymentData = useMemo(() => {
    const timestamp = Date.now();
    const orderNumber = `TP${timestamp.toString().slice(-8)}`;
    return JSON.stringify({
      merchant: 'TOEIC Practice',
      amount: price,
      orderId: orderNumber,
      description: `Gói ${planName} - ${billing === 'monthly' ? 'Tháng' : 'Năm'}`,
    });
  }, [price, planName, billing]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const planFeatures = {
    Pro: [
      'Không giới hạn bài test',
      'Đề thi mô phỏng thực tế',
      'Phân tích chi tiết kết quả',
      'Từ điển nâng cao + phát âm',
      'Lộ trình học cá nhân hóa',
      'Bộ từ vựng 3000+ từ',
      'Video giải thích từ giảng viên',
      'Hỗ trợ 24/7',
    ],
    Premium: [
      'Tất cả tính năng Pro',
      'Mentor 1-on-1 (4 buổi/tháng)',
      'Lớp học nhóm nhỏ',
      'Đề thi độc quyền từ ETS',
      'Chấm speaking tự động AI',
      'Chấm writing chi tiết',
      'Cam kết tăng 100+ điểm',
      'Chứng chỉ hoàn thành',
      'Bảo hành điểm số',
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="light"
            startContent={<ArrowLeft className="w-4 h-4" />}
            onPress={() => router.back()}
            className="mb-4"
          >
            Quay lại
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Thanh toán</h1>
              <p className="text-gray-600 mt-2">Hoàn tất đơn hàng của bạn</p>
            </div>
            {/* Countdown Timer */}
            <div className="bg-red-50 border-2 border-red-500 rounded-lg px-6 py-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-red-600" />
                <div className="text-center">
                  <div className="text-sm text-red-600 font-medium">Thời gian còn lại</div>
                  <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
            {/* Package Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gói {planName}</h2>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-blue-600">{formatPrice(price)}₫</span>
                <span className="text-gray-600 ml-2">/{billing === 'monthly' ? 'tháng' : 'năm'}</span>
              </div>

              {/* Features */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Bao gồm:</h3>
                {(planFeatures[planName] || planFeatures.Pro).map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <span>Ví điện tử (Momo, ZaloPay, VNPay)</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>Thẻ ATM nội địa</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span>Chuyển khoản ngân hàng</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - QR Code Payment */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Quét mã QR để thanh toán
              </h2>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="bg-white p-6 rounded-xl border-4 border-blue-500 shadow-xl">
                  <QRCodeSVG
                    value={paymentData}
                    size={256}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: '/logo.png',
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4 text-center">
                <p className="text-gray-700 font-medium">Hướng dẫn thanh toán:</p>
                <ol className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">1.</span>
                    <span>Mở ứng dụng ngân hàng hoặc ví điện tử trên điện thoại</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">2.</span>
                    <span>Chọn tính năng quét mã QR</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">3.</span>
                    <span>Quét mã QR trên màn hình</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">4.</span>
                    <span>Xác nhận thông tin và hoàn tất thanh toán</span>
                  </li>
                </ol>
              </div>

              {/* Bank Transfer Info */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-green-600" />
                  Thông tin chuyển khoản
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngân hàng:</span>
                    <span className="font-semibold text-gray-900">MB Bank (Quân đội)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số tài khoản:</span>
                    <span className="font-mono font-semibold text-gray-900">9704 2296 8888</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chủ tài khoản:</span>
                    <span className="font-semibold text-gray-900">TOEIC PRACTICE</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-600">Số tiền:</span>
                    <span className="text-lg font-bold text-green-600">{formatPrice(price)}₫</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <span className="text-gray-600">Nội dung CK:</span>
                    <div className="font-mono font-semibold text-gray-900 bg-gray-100 p-2 rounded mt-1">
                      {planName} {billing === 'monthly' ? 'THANG' : 'NAM'} [SoDienThoai]
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Amount Highlight */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Tổng thanh toán:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(price)}₫</span>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Lưu ý:</strong> Sau khi thanh toán thành công, tài khoản của bạn sẽ được
                  nâng cấp tự động trong vòng 5-10 phút.
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">Cần hỗ trợ?</h3>
              <p className="text-sm opacity-90 mb-4">
                Liên hệ với chúng tôi qua hotline hoặc email nếu bạn gặp bất kỳ vấn đề nào
              </p>
              <div className="space-y-2 text-sm">
                <div>📞 Hotline: 1900-xxxx</div>
                <div>📧 Email: support@toeicpractice.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
