'use client';
import LoginForm from './components/LoginForm';
import AuthWrapper from './components/AuthWrapper';

export default function LoginScreen() {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}
