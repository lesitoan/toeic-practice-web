export default function DailyGoal() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Mục tiêu hôm nay</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Học từ mới</span>
            <span>8/20 từ</span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Ôn tập</span>
            <span>15/25 từ</span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
          Tiếp tục học
        </button>
      </div>
    </div>
  );
}
