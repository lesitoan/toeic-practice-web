'use client';
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from '@/constants/common';
import { Button } from '@nextui-org/react';
import { User, BookOpen, Settings, LogOut, Trophy, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import requestHelpers from '@/utils/requestHelper';
import { useDispatch } from 'react-redux';
import { logout } from '@/stores/mineSlice';

export default function ProfilePopup({ isOpen, setIsOpen, userProfile }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [_, __, removeCookie] = useCookies([USER_ACCESS_TOKEN, USER_REFRESH_TOKEN]);

  const handleLogout = useCallback(() => {
    removeCookie(USER_ACCESS_TOKEN, { path: '/' });
    removeCookie(USER_REFRESH_TOKEN, { path: '/' });
    requestHelpers.setAuthorizationToken(undefined);
    dispatch(logout());
    router.refresh();
  }, [router, removeCookie]);

  if (!userProfile) return null;

  let avatar = userProfile.avatar;
  if (!userProfile.avatar || /^(https?:\/\/[^\s]+|\/[^\s]+)/i.test(userProfile.avatar) === false) {
    avatar = '/images/default-avatar.jpg';
  }

  return (
    <div className="relative">
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-bgPrimary rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="relative p-6 bg-gradient-to-br from-blue-400 to-blue-600">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-3 border-white shadow-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg">{userProfile.name}</h3>
                  <p className="text-blue-100 text-sm">UID: {userProfile.id || 1234567}</p>
                </div>
              </div>

              <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-200 shadow-lg">
                Nâng cấp tài khoản
              </Button>
            </div>

            <div className="px-6 py-4 border-b border-gray-300 text-textBlackColor">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex justify-center mb-1">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="text-xl font-bold text-yellow-500">{600}</div>
                  <div className="text-xs">Điểm TOEIC</div>
                </div>
                <div>
                  <div className="flex justify-center mb-1">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-xl font-bold text-blue-500">{15}</div>
                  <div className="text-xs">Đề đã làm</div>
                </div>
                <div>
                  <div className="flex justify-center mb-1">
                    <Clock className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-xl font-bold text-green-500">{56}h</div>
                  <div className="text-xs">Thời gian học</div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <MenuItem
                icon={<User className="w-5 h-5" />}
                text="Hồ sơ cá nhân"
                onClick={() => {
                  router.push('/profile');
                  setIsOpen(false);
                }}
              />
              <MenuItem
                icon={<BookOpen className="w-5 h-5" />}
                text="Từ vựng đã lưu"
                onClick={() => {
                  router.push('/vocabulary');
                  setIsOpen(false);
                }}
              />
              <MenuItem
                icon={<Settings className="w-5 h-5" />}
                text="Cài đặt"
                onClick={() => {
                  router.push('/profile');
                  setIsOpen(false);
                }}
              />
            </div>

            <div className="border-t border-gray-300 p-2">
              <MenuItem
                icon={<LogOut className="w-5 h-5" />}
                text="Đăng xuất"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="!text-red-700 hover:bg-red-200 rounded-md"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const MenuItem = ({ icon, text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-150 ${className}`}
    >
      <span className="">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
      <div className="ml-auto">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};
