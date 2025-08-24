import { Mail, Calendar, Crown, Edit2, Settings } from 'lucide-react';
import { USER_DATA } from '../constants';

export default function UserInfo() {
  const isPro = false;
  const userData = USER_DATA;

  return (
    <div className="bg-bgSecondary shadow-lg rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={userData.avatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              {isPro && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {userData.email}
              </p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Tham gia: {userData.joinDate}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isPro
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {userData.subscription}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
