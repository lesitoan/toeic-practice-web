'use client';
import AuthWrapper from '../LoginScreen/components/AuthWrapper';
import SignupForm from './components/SignupForm';

export default function SignupScreen() {
  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  );
}
