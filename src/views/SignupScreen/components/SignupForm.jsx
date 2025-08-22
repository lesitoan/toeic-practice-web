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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <h2 className="text-h2">Tạo tài khoản</h2>
          <p className="text-gray-400 text-sm">
            Đã có tài khoản?
            <button
              className="text-blue-400 hover:text-blue-300 ml-1 transition-colors duration-200"
              onClick={() => router.push('/login')}
            >
              Đăng nhập
            </button>
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name Input */}
          <Input
            name="name"
            placeholder="Nhập tên"
            type="text"
            color="primary"
            onChange={handleInputChange}
            classNames={{
              base: 'h-12',
              input: 'text-sm',
              inputWrapper: '!h-[300px] !rounded-lg',
            }}
            required
          />

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

          {/* Confirm Password Input */}
          <div className="relative">
            <Input
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              type={showConfirmPassword ? 'text' : 'password'}
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
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover transition-colors duration-200"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              name="agreeToTerms"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className=""
            />
            <label htmlFor="terms" className="text-gray-500 text-sm leading-relaxed">
              Đòng ý với tất cả các điều khoản
            </label>
          </div>

          {/* Submit Button */}
          <Button
            color="primary"
            className={`w-full rounded-lg h-12 shadow-md ${formData.agreeToTerms ? '' : 'opacity-70 !cursor-not-allowed'} cursor-pointer`}
            type="submit"
            disabled={!formData.agreeToTerms}
          >
            Tạo tài khoản
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"></div>
            <div className="relative flex justify-center text-sm items-center">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="px-2">Đăng nhập bằng</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              color="default"
              className="w-full rounded-lg h-12 shadow-md cursor-pointer bg-orange-400"
              type="submit"
              disabled={!formData.agreeToTerms}
            >
              Google
            </Button>

            <Button
              color="primary"
              className="w-full rounded-lg h-12 shadow-md cursor-pointer"
              type="submit"
              disabled={!formData.agreeToTerms}
            >
              <Facebook size={20} />
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
