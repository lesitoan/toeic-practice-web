'use client';
import React, { useState } from 'react';
import { Check, Star, Zap, BookOpen, Users, Trophy, Clock, HeadphonesIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PricingScreen() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      price: { monthly: 0, yearly: 0 },
      description: 'Hoàn hảo cho người mới bắt đầu',
      features: [
        '8 bài test cơ bản',
        'Từ điển Việt-Anh',
        'Giải thích đáp án cơ bản',
        'Lưu kết quả thi',
        'Hỗ trợ email',
      ],
      popular: false,
      buttonText: 'Đang sử dụng',
      buttonStyle: 'bg-gray-100 text-gray-600 cursor-not-allowed',
    },
    {
      name: 'Pro',
      price: { monthly: 199000, yearly: 1990000 },
      description: 'Lựa chọn phổ biến nhất',
      features: [
        'Không giới hạn bài test',
        'Đề thi mô phỏng thực tế',
        'Phân tích chi tiết kết quả',
        'Từ điển nâng cao + phát âm',
        'Lộ trình học cá nhân hóa',
        'Bộ từ vựng 3000+ từ',
        'Video giải thích từ giảng viên',
        'Hỗ trợ 24/7',
      ],
      popular: true,
      buttonText: 'Bắt đầu ngay',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      name: 'Premium',
      price: { monthly: 399000, yearly: 3990000 },
      description: 'Cho những người muốn đạt điểm cao',
      features: [
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
      popular: false,
      buttonText: 'Liên hệ tư vấn',
      buttonStyle:
        'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white',
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getDiscountPercent = (monthly, yearly) => {
    if (monthly === 0) return 0;
    return Math.round((1 - yearly / (monthly * 12)) * 100);
  };

  const handleSelectPlan = (plan) => {
    // Navigate to checkout with plan details
    const params = new URLSearchParams({
      plan: plan.name,
      price: plan.price[billingCycle].toString(),
      billing: billingCycle,
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TOEIC Practice</h1>
            </div>
            <button className="text-gray-600 hover:text-gray-900">← Quay lại trang chủ</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Nâng cao điểm số
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              TOEIC của bạn
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Chọn gói phù hợp để trải nghiệm hệ thống luyện thi TOEIC hiệu quả nhất. Hơn 50,000 học
            viên đã đạt điểm mục tiêu với chúng tôi.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Hàng tháng
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors relative ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Hàng năm
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  -17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Phổ biến nhất</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    {plan.price[billingCycle] === 0 ? (
                      <div className="text-4xl font-bold text-gray-900">Miễn phí</div>
                    ) : (
                      <div>
                        <div className="text-4xl font-bold text-gray-900">
                          {formatPrice(plan.price[billingCycle])}₫
                        </div>
                        <div className="text-gray-600">
                          /{billingCycle === 'monthly' ? 'tháng' : 'năm'}
                        </div>
                        {billingCycle === 'yearly' && plan.price.monthly > 0 && (
                          <div className="text-sm text-green-600 font-medium">
                            Tiết kiệm {getDiscountPercent(plan.price.monthly, plan.price.yearly)}%
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={plan.name === 'Basic'}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            So sánh chi tiết các gói
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Tính năng</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Basic</th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-600">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-purple-600">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ['Số lượng bài test', '8 bài', 'Không giới hạn', 'Không giới hạn'],
                  ['Đề thi mô phỏng ETS', '❌', '✅', '✅'],
                  ['Phân tích chi tiết', '❌', '✅', '✅'],
                  ['Video giải thích', '❌', '✅', '✅'],
                  ['Mentor 1-on-1', '❌', '❌', '4 buổi/tháng'],
                  ['Chấm speaking AI', '❌', '❌', '✅'],
                  ['Chấm writing', '❌', '❌', '✅'],
                  ['Bảo hành điểm số', '❌', '❌', '✅'],
                ].map(([feature, basic, pro, premium], index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{feature}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{basic}</td>
                    <td className="py-4 px-4 text-center text-blue-600">{pro}</td>
                    <td className="py-4 px-4 text-center text-purple-600">{premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Users, number: '50,000+', label: 'Học viên tin tưởng' },
            { icon: Trophy, number: '95%', label: 'Tỷ lệ đạt mục tiêu' },
            { icon: Clock, number: '24/7', label: 'Hỗ trợ liên tục' },
            { icon: Zap, number: '100+', label: 'Điểm tăng trung bình' },
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Câu hỏi thường gặp</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: 'Tôi có thể hủy gói Pro bất cứ lúc nào không?',
                a: 'Có, bạn có thể hủy gói Pro bất cứ lúc nào. Chúng tôi sẽ không tính phí cho chu kỳ tiếp theo.',
              },
              {
                q: 'Gói Premium có đảm bảo tăng điểm không?',
                a: 'Có, chúng tôi cam kết tăng ít nhất 100 điểm sau 3 tháng học. Nếu không đạt, chúng tôi sẽ hoàn tiền 100%.',
              },
              {
                q: 'Tôi có thể chuyển đổi giữa các gói không?',
                a: 'Có, bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào. Phí chênh lệch sẽ được tính theo tỷ lệ.',
              },
              {
                q: 'Có hỗ trợ thanh toán trả góp không?',
                a: 'Có, chúng tôi hỗ trợ thanh toán trả góp qua các ngân hàng và ví điện tử lớn.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Sẵn sàng chinh phục TOEIC?</h2>
          <p className="text-xl mb-8 opacity-90">
            Tham gia cùng hàng nghìn học viên đã đạt điểm mục tiêu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Dùng thử miễn phí
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Tư vấn 1-on-1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
