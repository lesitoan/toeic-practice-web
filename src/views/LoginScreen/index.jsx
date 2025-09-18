'use client';
import LoginForm from './components/LoginForm';
import AuthWrapper from './components/AuthWrapper';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function LoginScreen() {
  const router = useRouter();
  const { userProfile } = useSelector((state) => state.mine);
  useEffect(() => {
    if (userProfile) {
      router.push('/');
    }
  }, [userProfile, router]);

  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}
