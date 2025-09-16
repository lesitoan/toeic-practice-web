import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import Footer from './components/Footer';
import Header from './components/Header';
import { PROTECTED_ROUTES, USER_ACCESS_TOKEN } from '@/constants/common';
import { useSelector, useDispatch } from 'react-redux';
import requestHelpers from '@/utils/requestHelper';
import { mineProfile } from '@/stores/mineSlice';
import UpgradePopup from '@/components/common/UpgradePopup';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const { userProfile } = useSelector((state) => state.mine);
  const dispatch = useDispatch();

  const [cookies] = useCookies([USER_ACCESS_TOKEN]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = cookies[USER_ACCESS_TOKEN];
      if (token) {
        requestHelpers.setAuthorizationToken(token);
      }

      let role = userProfile?.role;
      if (!role && token) {
        const result = await dispatch(mineProfile());
        role = result.payload?.role;
      }

      const matched = PROTECTED_ROUTES.find((r) => r.pathRegex.test(pathname));
      if (!matched) {
        setShowUpgradePopup(false);
        return;
      }
      if (!token) {
        router.push('/login');
        return;
      }

      if (!role) {
        router.push('/login');
      } else if (!matched.roles.includes(role)) {
        setShowUpgradePopup(true);
      } else {
        setShowUpgradePopup(false);
      }
    };

    checkAuth();
  }, [pathname, cookies, userProfile, dispatch, router]);

  return (
    <div>
      {showUpgradePopup && <UpgradePopup />}
      <Header />
      <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-10 bg-bgPrimary text-textBlackColor">
        <main className="flex-grow max-w-[1200px] mx-auto w-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
