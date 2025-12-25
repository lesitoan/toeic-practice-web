import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Facebook, FacebookIcon, LucideYoutube } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CradleLoader from '@/components/common/Loading/CradleLoader';
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from '@/constants/common';
import requestHelpers from '@/utils/requestHelper';
import MineSlice from '@/stores/mineSlice';
import authServices from '@/services/auth.service';

const SignupForm = () => {
  const router = useRouter();
  const [_, setCookies] = useCookies([USER_ACCESS_TOKEN]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  // Listen for Google OAuth callback
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
        const { accessToken, refreshToken } = event.data;
        
        if (accessToken && refreshToken) {
          // Save tokens
          dispatch(MineSlice.actions.setAccessToken(accessToken));
          dispatch(MineSlice.actions.setRefreshToken(refreshToken));
          requestHelpers.setAuthorizationToken(accessToken);
          
          setCookies(USER_ACCESS_TOKEN, accessToken, {
            path: '/',
            maxAge: 30 * 60 * 1000,
          });
          setCookies(USER_REFRESH_TOKEN, refreshToken, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
          });

          // Fetch user info
          authServices.getMe().then(() => {
            toast.success('Đăng nhập Google thành công!');
            router.push('/');
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch, setCookies, router]);

  const handleGoogleLogin = () => {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      `${process.env.NEXT_PUBLIC_API}/api/v1/authentication/login/google`,
      'Google Login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const res = await authServices.login({
        email: data.email,
        password: data.password,
      });
      if (!res || !res.access_token || !res.refresh_token) {
        throw new Error('Đăng nhập thất bại. Vui lòng thử lại.');
      }
      toast.success('Đăng nhập thành công!');
      dispatch(MineSlice.actions.setAccessToken(res.access_token));
      dispatch(MineSlice.actions.setRefreshToken(res.refresh_token));
      requestHelpers.setAuthorizationToken(res.access_token);
      setCookies(USER_ACCESS_TOKEN, res.access_token, {
        path: '/',
        maxAge: 30 * 60 * 1000, // 30 phút
      });
      setCookies(USER_REFRESH_TOKEN, res.access_token, {
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 ngày
      });
      router.back();
    } catch (error) {
      console.log(error);
      toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bgSecondary p-4 lg:p-6 flex flex-col justify-center min-w-[400px]">
      <div className="w-full max-w-md mx-auto">
        {/* Form Header */}
        <div className="mb-8">
          <h2 className="text-h2">Đăng nhập</h2>
          <p className="text-gray-400 text-sm">
            Chưa có tài khoản?
            <button
              className="text-blue-400 hover:text-blue-300 ml-1 transition-colors duration-200"
              onClick={() => router.push('/sign-up')}
            >
              Đăng kí
            </button>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          {/* Email Input */}
          <div>
            <Input
              name="email"
              placeholder="Nhập email"
              type="email"
              color="primary"
              classNames={{
                base: 'h-12',
                input: `text-sm ${errors.email && '!text-red-500 !placeholder-red-500'}`,
                inputWrapper: `!h-[300px] !rounded-lg ${errors.email && '!border-2 !border-solid !border-red-500 bg-red-100'}`,
              }}
              {...register('email', {
                required: 'Email là bắt buộc',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email không hợp lệ',
                },
              })}
            />
            <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <Input
                name="password"
                placeholder="Nhập mật khẩu"
                type={showPassword ? 'text' : 'password'}
                color="primary"
                classNames={{
                  base: 'h-12',
                  input: `text-sm ${errors.password && '!text-red-500 !placeholder-red-500'}`,
                  inputWrapper: `!h-[300px] !rounded-lg ${errors.password && '!border-2 !border-solid !border-red-500 bg-red-100'}`,
                }}
                {...register('password', {
                  required: 'Mật khẩu là bắt buộc',
                  // minLength: {
                  //   value: 6,
                  //   message: 'Mật khẩu phải có ít nhất 6 ký tự',
                  // },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover transition-colors duration-200"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>
          </div>

          {/* Submit Button */}
          <Button
            color="primary"
            className="w-full rounded-lg h-12 shadow-md cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {!loading ? 'Đăng nhập' : <CradleLoader size={'md'} color="#ffffff" />}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"></div>
          <div className="relative flex justify-center text-sm items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-2">Đăng nhập bằng</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            color="default"
            className="w-full rounded-lg h-12 shadow-md cursor-pointer bg-orange-400"
            onPress={handleGoogleLogin}
          >
            Google
          </Button>

          <Button
            color="primary"
            className="w-full rounded-lg h-12 shadow-md cursor-pointer"
            type="submit"
          >
            <FacebookIcon size={20} />
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
