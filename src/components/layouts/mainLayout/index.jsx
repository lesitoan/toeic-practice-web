import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import Footer from './components/Footer';
import Header from './components/Header';
import { PROTECTED_ROUTES, USER_ACCESS_TOKEN } from '@/constants/common';
import { useSelector, useDispatch } from 'react-redux';
import requestHelpers from '@/utils/requestHelper';
import { mineProfile } from '@/stores/mineSlice';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile } = useSelector((state) => state.mine);
  const dispatch = useDispatch();

  const [cookies] = useCookies([USER_ACCESS_TOKEN]);

  useEffect(() => {
    const checkAuth = async () => {
      const matched = PROTECTED_ROUTES.find((r) => r.pathRegex.test(pathname));
      if (!matched) return;

      const token = cookies[USER_ACCESS_TOKEN];
      if (!token) {
        router.push('/login');
        return;
      }

      requestHelpers.setAuthorizationToken(token);
      const result = await dispatch(mineProfile());

      const role = result.payload?.role || userProfile?.role;
      if (!role) {
        router.push('/login');
      } else if (!matched.roles.includes(role)) {
        router.push('/');
      }
    };

    checkAuth();
  }, [pathname, cookies]);

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-10 bg-bgPrimary text-textBlackColor">
        <main className="flex-grow max-w-[1200px] mx-auto w-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
