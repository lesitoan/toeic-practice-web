'use client';
import { useCookies } from 'react-cookie';
import AuthWrapper from '../LoginScreen/components/AuthWrapper';
import SignupForm from './components/SignupForm';
import { USER_ACCESS_TOKEN } from '@/constants/common';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupScreen() {
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
      <SignupForm />
    </AuthWrapper>
  );
}
