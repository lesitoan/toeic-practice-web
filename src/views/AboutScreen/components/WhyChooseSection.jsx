import { BookOpen, Clock, Target, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, iconGradient, bgGradient }) => {
  return (
    <div
      className={`group ${bgGradient} p-8 rounded-2xl hover:shadow-xl transition-all transform hover:scale-105`}
    >
      <div
        className={`w-16 h-16 ${iconGradient} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const features = [
  {
    title: 'Đề thi thực tế',
    description: 'Hơn 50 đề thi mô phỏng hoàn toàn giống với đề thi TOEIC thực tế',
    icon: Target,
    bgGradient: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    iconGradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
  },
  {
    title: 'Từ điển tích hợp',
    description: 'Tra cứu từ vựng ngay trong quá trình làm bài, không cần chuyển tab',
    icon: BookOpen,
    bgGradient: 'bg-gradient-to-br from-green-50 to-emerald-50',
    iconGradient: 'bg-gradient-to-r from-green-500 to-green-600',
  },
  {
    title: 'Chấm điểm tức thì',
    description: 'Hệ thống AI chấm điểm và phân tích kết quả chi tiết ngay lập tức',
    icon: Zap,
    bgGradient: 'bg-gradient-to-br from-purple-50 to-violet-50',
    iconGradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
  },
  {
    title: 'Luyện tập 24/7',
    description: 'Truy cập không giới hạn mọi lúc, mọi nơi trên mọi thiết bị',
    icon: Clock,
    bgGradient: 'bg-gradient-to-br from-orange-50 to-red-50',
    iconGradient: 'bg-gradient-to-r from-orange-500 to-red-500',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-bgSecondary shadow-lg rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-h1 text-gray-800 mb-4">
            Tại sao chọn{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TOEIC Practice
            </span>
            ?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp các công cụ và tính năng tiên tiến nhất để giúp bạn đạt điểm TOEIC
            cao nhất
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
