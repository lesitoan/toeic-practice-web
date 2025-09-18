'use client';
import AuthWrapper from '../LoginScreen/components/AuthWrapper';
import SignupForm from './components/SignupForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function SignupScreen() {
  const router = useRouter();
  const { userProfile } = useSelector((state) => state.mine);
  useEffect(() => {
    if (userProfile) {
      router.push('/');
    }
  }, [userProfile, router]);

  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  );
}
