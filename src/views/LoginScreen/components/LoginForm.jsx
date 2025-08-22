import React, { useState } from 'react';
import { Eye, EyeOff, Facebook, LucideYoutube } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Input } from '@nextui-org/react';

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
        <div className="space-y-6">
          {/* Email Input */}
          <Input
            name="email"
            placeholder="Nhập email"
            type="email"
            color="primary"
            onChange={handleInputChange}
            classNames={{
              base: 'h-12',
              input: 'text-sm',
              inputWrapper: '!h-[300px] !rounded-lg',
            }}
            required
          />

          {/* Password Input */}
          <div className="relative">
            <Input
              name="password"
              placeholder="Nhập mật khẩu"
              type={showPassword ? 'text' : 'password'}
              color="primary"
              onChange={handleInputChange}
              classNames={{
                base: 'h-12',
                input: 'text-sm',
                inputWrapper: '!h-[300px] !rounded-lg',
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <Button
            color="primary"
            className={`w-full rounded-lg h-12 shadow-md cursor-pointer`}
            type="submit"
            disabled={!formData.agreeToTerms}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
