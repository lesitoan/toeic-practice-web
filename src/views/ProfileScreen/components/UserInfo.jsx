import { Mail, Calendar, Crown, Edit2, Settings } from 'lucide-react';
import { useSelector } from 'react-redux';
import { USER_DATA } from '../constants';
import { getAvartarUrl } from '@/utils/common';
import { ROLE } from '@/constants/common';
import Link from 'next/link';

export default function UserInfo() {
  const isPro = false;
  const userData = USER_DATA;
  const { userProfile } = useSelector((state) => state.mine);

  return (
    <div className="bg-bgSecondary shadow-lg rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={getAvartarUrl(userProfile?.avatar)}
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
              <h1 className="text-2xl font-bold text-gray-900">{userProfile?.name}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {userProfile?.email}
              </p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Tham gia: {userProfile?.joinDate || '01/01/2024'}
                </span>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                    userProfile?.role === ROLE.USER_PRO
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-800 shadow-sm hover:shadow-md hover:border-blue-400'
                      : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300 text-gray-700 shadow-sm hover:shadow-md hover:border-gray-400'
                  }`}
                >
                  {userProfile?.role === ROLE.USER_PRO && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  )}
                  {userProfile?.role === ROLE.USER_PRO ? 'Pro Member' : 'Free trial'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button> */}
            <Link
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              href="/profile?tab=settings"
            >
              <Edit2 className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
