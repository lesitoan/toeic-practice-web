import { Eye, EyeOff, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import profileServices from '@/services/profile.service';
import { useDispatch } from 'react-redux';
import { mineProfile } from '@/stores/mineSlice';
import CradleLoader from '@/components/common/Loading/CradleLoader';

export default function ChangePasswordForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordCConfirm: '',
    },
  });

  const newPassword = watch('newPassword');

  const handleUpdatePassword = async (data) => {
    setLoading(true);
    try {
      const response = await profileServices.updatePassword(data);
      if (!response) {
        throw new Error('Đổi mật khẩu thất bại');
      }
      await dispatch(mineProfile());
      toast.success('Đổi mật khẩu thành công');
    } catch (error) {
      toast.error('Đổi mật khẩu thất bại');
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = (field) => {
    setShowPasswordFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <Lock className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-semibold text-gray-900">Đổi mật khẩu</h3>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Yêu cầu mật khẩu:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Ít nhất 6 ký tự</li>
          <li>• Nên chứa ít nhất một chữ hoa, chữ thường và số</li>
          <li>• Không sử dụng thông tin cá nhân dễ đoán</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-6">
        {/* Old Password Input */}
        <div>
          <div className="relative">
            <Input
              name="oldPassword"
              placeholder="Nhập mật khẩu cũ"
              type={showPasswordFields.old ? 'text' : 'password'}
              color="primary"
              classNames={{
                base: 'h-12',
                input: `text-sm ${errors.oldPassword && '!text-red-500 !placeholder-red-500'}`,
                inputWrapper: `!h-[300px] !rounded-lg ${errors.oldPassword && '!border-2 !border-solid !border-red-500 bg-red-100'}`,
              }}
              {...register('oldPassword', {
                required: 'Mật khẩu cũ là bắt buộc',
              })}
            />
            <button
              type="button"
              onClick={() => togglePassword('old')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover transition-colors duration-200"
            >
              {showPasswordFields.old ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <p className="text-red-500 text-sm mt-2">{errors.oldPassword?.message}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Password Input */}
          <div>
            <div className="relative">
              <Input
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                type={showPasswordFields.new ? 'text' : 'password'}
                color="primary"
                classNames={{
                  base: 'h-12',
                  input: `text-sm ${errors.newPassword && '!text-red-500 !placeholder-red-500'}`,
                  inputWrapper: `!h-[300px] !rounded-lg ${errors.newPassword && '!border-2 !border-solid !border-red-500 bg-red-100'}`,
                }}
                {...register('newPassword', {
                  required: 'Mật khẩu là bắt buộc',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự',
                  },
                  validate: (value) => {
                    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
                    return (
                      regex.test(value) ||
                      'Mật khẩu phải chứa ít nhất một chữ hoa, chữ thường và số'
                    );
                  },
                })}
              />
              <button
                type="button"
                onClick={() => togglePassword('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover transition-colors duration-200"
              >
                {showPasswordFields.new ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <p className="text-red-500 text-sm mt-2">{errors.newPassword?.message}</p>
          </div>

          {/* Confirm Password Input */}
          <div>
            <div className="relative">
              <Input
                name="newPasswordCConfirm"
                placeholder="Xác nhận mật khẩu"
                type={showPasswordFields.confirm ? 'text' : 'password'}
                color="primary"
                classNames={{
                  base: 'h-12',
                  input: `text-sm ${errors.newPasswordCConfirm && '!text-red-500 !placeholder-red-500'}`,
                  inputWrapper: `!h-[300px] !rounded-lg ${errors.newPasswordCConfirm && '!border-2 !border-solid !border-red-500 bg-red-100'}`,
                }}
                {...register('newPasswordCConfirm', {
                  required: 'Xác nhận mật khẩu là bắt buộc',
                  validate: (value) => value === newPassword || 'Mật khẩu không khớp',
                })}
              />
              <button
                type="button"
                onClick={() => togglePassword('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover transition-colors duration-200"
              >
                {showPasswordFields.confirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <p className="text-red-500 text-sm mt-2">{errors.newPasswordCConfirm?.message}</p>
          </div>
        </div>

        <Button
          color="primary"
          className={`w-full rounded-lg h-12 shadow-md bg-red-700 hover:bg-red-600  ${loading ? 'opacity-70 !cursor-not-allowed' : ''} cursor-pointer`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CradleLoader size={'md'} color="#ffffff" />
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Đổi mật khẩu
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
