'use client';
import LoginForm from './components/LoginForm';
import AuthWrapper from './components/AuthWrapper';
import { useCookies } from 'react-cookie';
import { USER_ACCESS_TOKEN } from '@/constants/common';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginScreen() {
  const router = useRouter();
  const [cookies] = useCookies([USER_ACCESS_TOKEN]);
  useEffect(() => {
    const token = cookies[USER_ACCESS_TOKEN];
    if (token) {
      router.back();
    }
  }, []);

  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}
