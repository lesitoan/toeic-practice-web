'use client';
import { useCallback } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import store from '@/stores/stores';
import { LAYOUT_CONFIG } from './configLayout';
import MainLayout from '../mainLayout';

export default function InitLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const renderLayout = useCallback(() => {

    const sortedConfigs = [...LAYOUT_CONFIG].sort((a, b) => {
      const aHasRegex = a.pathname?.some((p) => p instanceof RegExp);
      const bHasRegex = b.pathname?.some((p) => p instanceof RegExp);
      if (aHasRegex && !bHasRegex) return -1;
      if (!aHasRegex && bHasRegex) return 1;
      return 0;
    });

    const Layout = sortedConfigs.find((item) => {
      if (!item.pathname) return false;
      

      return item.pathname.some((pattern) => {

        if (pattern instanceof RegExp) {
          return pattern.test(pathname);
        }
        if (typeof pattern === 'string') {
          return pathname === pattern;
        }
        return false;
      });
    });

    if (Layout) {
      return <Layout.Layout>{children}</Layout.Layout>;
    }

    return <MainLayout>{children}</MainLayout>;
  }, [children, pathname]);

  return (
    <NextUIProvider navigate={router.push}>
      <Provider store={store}>
        <CookiesProvider>
          <ToastContainer />
          <NextThemesProvider attribute="class" defaultTheme="light">
            <div>{renderLayout()}</div>
          </NextThemesProvider>
        </CookiesProvider>
      </Provider>
    </NextUIProvider>
  );
}
