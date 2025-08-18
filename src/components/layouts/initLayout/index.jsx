'use client';
import { useCallback } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { LAYOUT_CONFIG } from './configLayout';
import MainLayout from '../mainLayout';

export default function InitLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const renderLayout = useCallback(() => {
    const Layout = LAYOUT_CONFIG.find((item) => {
      return item.pathname?.includes(pathname);
    });

    if (Layout) {
      return <Layout.Layout>{children}</Layout.Layout>;
    }

    return <MainLayout>{children}</MainLayout>;
  }, [children, pathname]);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <div>{renderLayout()}</div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
