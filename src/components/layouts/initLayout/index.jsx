'use client';
import { usePathname } from 'next/navigation';
import { LAYOUT_CONFIG } from './configLayout';
import MainLayout from '../mainLayout';
import { useCallback } from 'react';

export default function InitLayout({ children }) {
  const pathname = usePathname();

  const renderLayout = useCallback(() => {
    const Layout = LAYOUT_CONFIG.find((item) => {
      return item.pathname?.includes(pathname);
    });

    if (Layout) {
      return <Layout.Layout>{children}</Layout.Layout>;
    }

    return <MainLayout>{children}</MainLayout>;
  }, [children, pathname]);

  return <div>{renderLayout()}</div>;
}
