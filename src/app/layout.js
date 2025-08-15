import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import InitLayout from '@/components/layouts/initLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Toeic Practice',
  description: 'A platform for practicing TOEIC exams',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <InitLayout>{children}</InitLayout>
      </body>
    </html>
  );
}
