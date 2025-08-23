import { Crown } from 'lucide-react';

export default function BannerPro() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Crown className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">
              Nâng cấp lên Pro để mở khóa toàn bộ tính năng!
            </h3>
            <p className="text-purple-100">Unlimited tests, advanced analytics, và nhiều hơn nữa</p>
          </div>
        </div>
        <button
          onClick={() => setIsPro(true)}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Nâng cấp ngay
        </button>
      </div>
    </div>
  );
}
