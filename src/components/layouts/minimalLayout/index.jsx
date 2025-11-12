'use client';
import { USER_ACCESS_TOKEN } from '@/constants/common';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import requestHelpers from '@/utils/requestHelper';
import { mineProfile } from '@/stores/mineSlice';

export default function MinimalLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile } = useSelector((state) => state.mine);
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  const [cookies] = useCookies([USER_ACCESS_TOKEN]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = cookies[USER_ACCESS_TOKEN];

        if (!token) {
          alert('Bạn cần đăng nhập để làm bài thi. Vui lòng đăng nhập và thử lại.');
          if (window.opener && !window.opener.closed) {
            window.close();
          } else {
            router.push('/');
          }
          return;
        }

        requestHelpers.setAuthorizationToken(token);

        let profile = userProfile;

        if (!profile) {
          const result = await dispatch(mineProfile());
          profile = result.payload;
        }

        if (!profile) {
          alert('Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
          if (window.opener && !window.opener.closed) {
            window.close();
          } else {
            router.push('/login');
          }
          return;
        }

        setIsChecking(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        alert('Có lỗi xảy ra khi kiểm tra đăng nhập. Vui lòng thử lại.');
        if (window.opener && !window.opener.closed) {
          window.close();
        } else {
          router.push('/login');
        }
      }
    };

    checkAuth();
  }, [cookies, dispatch, router, userProfile]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen">{children}</div>;
}
