import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAVIGATE_ITEM, WEB_TITLE } from '../constants/constants';
import { Image, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { USER_ACCESS_TOKEN } from '@/constants/common';

// Header Component
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { userProfile } = useSelector((state) => state.mine);
  const [cookies] = useCookies([USER_ACCESS_TOKEN]);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (userProfile && cookies[USER_ACCESS_TOKEN]) {
      const avatar = userProfile.avatar;
      const regex = /^(https?:\/\/[^\s]+|\/[^\s]+)/i;
      setAvatarUrl(avatar && regex.test(avatar) ? avatar : '/images/default-avatar.jpg');
    } else {
      setAvatarUrl('');
    }
  }, [userProfile, cookies]);

  return (
    <header className="sticky top-0 z-50 bg-bgPrimary shadow-sm border-b border-gray-200">
      <div className=" w-full xl:max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo/default-logo.png" alt="Logo" width={40} height={40} />
              <span className="text-2xl font-bold text-textBlackColor">{WEB_TITLE}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATE_ITEM.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-textBlackColor hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Sign Up Button */}

          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Avatar"
              width={45}
              height={45}
              className="rounded-full cursor-pointer"
              onClick={() => {
                router.push('/profile');
              }}
            />
          ) : (
            <Button color="primary" onPress={() => router.push('/login')}>
              Đăng nhập
            </Button>
          )}

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-buttonPrimary hover:bg-blue-600 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {NAVIGATE_ITEM.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className=" hover:bg-blue-600 font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  width={45}
                  height={45}
                  className="rounded-full cursor-pointer"
                  onClick={() => {
                    router.push('/profile');
                  }}
                />
              ) : (
                <Link
                  href="/login"
                  className="bg-buttonPrimary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-center transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
