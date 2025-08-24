'use client';
import FeedbackSection from './components/FeedbackSection';
import HeroSection from './components/HeroSection';
import WhyChooseSection from './components/WhyChooseSection';

export default function AboutScreen() {
  return (
    <div className="mb-10 min-h-screen space-y-10">
      <HeroSection />

      <WhyChooseSection />

      <FeedbackSection />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-lg shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Sẵn sàng chinh phục TOEIC?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Tham gia cùng hàng nghìn học viên đã đạt điểm cao với TOEIC Practice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
              Bắt đầu miễn phí
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
