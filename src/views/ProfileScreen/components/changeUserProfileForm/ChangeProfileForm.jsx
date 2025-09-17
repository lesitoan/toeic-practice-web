import { Save, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import profileServices from '@/services/profile.service';
import { useDispatch } from 'react-redux';
import { mineProfile } from '@/stores/mineSlice';
import CradleLoader from '@/components/common/Loading/CradleLoader';

export default function ChangeProfileForm() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.mine);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: userProfile?.name || '',
      phone: userProfile?.phone || '',
      birthDate: userProfile?.birthDate || '',
      address: userProfile?.address || '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name || '',
        phone: userProfile.phone || '',
        birthDate: userProfile.birthDate || '',
        address: userProfile.address || '',
      });
    }
  }, [userProfile, reset]);

  const handleUpdateProfile = async (data) => {
    setLoading(true);
    try {
      const response = await profileServices.updateMe(data);
      if (!response) {
        throw new Error('Cập nhật thông tin cá nhân thất bại');
      }
      await dispatch(mineProfile());
      toast.success('Cập nhật thông tin cá nhân thành công');
    } catch (error) {
      toast.error('Cập nhật thông tin cá nhân thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h3>
      </div>

      <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* name */}
          <div>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Tên là bắt buộc' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập tên"
                  type="text"
                  color="primary"
                  classNames={{
                    base: 'h-12',
                    input: `text-sm ${errors.name ? '!text-red-500 !placeholder-red-500' : ''}`,
                    inputWrapper: `!h-[300px] !rounded-lg ${errors.name && '!border-2 !border-solid !border-red-500 bg-red-100'}`,
                  }}
                />
              )}
            />
            <p className="text-red-500 text-sm mt-2">{errors.name?.message}</p>
          </div>
          {/* email */}
          <div>
            <Input
              disabled={true}
              color="primary"
              value={userProfile?.email || ''}
              classNames={{
                base: 'h-12 ',
                input: `text-sm ${errors.email && '!text-red-500 !placeholder-red-500'}`,
                inputWrapper: `!h-[300px] !rounded-lg !cursor-not-allowed`,
              }}
            />
            <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
          </div>
          {/* phone */}
          <div>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Số điện thoại là bắt buộc',
                validate: (value) => {
                  const phoneRegex =
                    /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/;
                  return phoneRegex.test(value) || 'Số điện thoại không hợp lệ';
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập số điện thoại"
                  type="tel"
                  color="primary"
                  classNames={{
                    base: 'h-12',
                    input: `text-sm ${errors.phone ? '!text-red-500 !placeholder-red-500' : ''}`,
                    inputWrapper: `!h-[300px] !rounded-lg ${
                      errors.phone && '!border-2 !border-solid !border-red-500 bg-red-100'
                    }`,
                  }}
                />
              )}
            />
            <p className="text-red-500 text-sm mt-2">{errors.phone?.message}</p>
          </div>

          {/* birthDate */}
          <div>
            <Controller
              name="birthDate"
              control={control}
              rules={{
                required: 'Ngày sinh là bắt buộc',
                validate: (value) => {
                  const today = new Date();
                  const birthDate = new Date(value);
                  return birthDate < today || 'Bạn chưa đủ tuổi';
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="date"
                  placeholder="Nhập ngày sinh"
                  color="primary"
                  classNames={{
                    base: 'h-12',
                    input: `text-sm ${
                      errors.birthDate ? '!text-red-500 !placeholder-red-500' : ''
                    }`,
                    inputWrapper: `!h-[300px] !rounded-lg ${
                      errors.birthDate && '!border-2 !border-solid !border-red-500 bg-red-100'
                    }`,
                  }}
                />
              )}
            />
            <p className="text-red-500 text-sm mt-2">{errors.birthDate?.message}</p>
          </div>

          {/* address */}
          <div className="col-span-2">
            <Controller
              name="address"
              control={control}
              rules={{
                required: 'Địa chỉ là bắt buộc',
                maxLength: { value: 100, message: 'Địa chỉ quá dài' },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập địa chỉ"
                  type="text"
                  color="primary"
                  classNames={{
                    base: 'h-12',
                    input: `text-sm ${errors.address ? '!text-red-500 !placeholder-red-500' : ''}`,
                    inputWrapper: `!h-[300px] !rounded-lg ${
                      errors.address && '!border-2 !border-solid !border-red-500 bg-red-100'
                    }`,
                  }}
                />
              )}
            />
            <p className="text-red-500 text-sm mt-2">{errors.address?.message}</p>
          </div>
        </div>

        <Button
          color="primary"
          className={`w-full rounded-lg h-12 shadow-md ${loading ? 'opacity-70 !cursor-not-allowed' : ''} cursor-pointer`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CradleLoader size={'md'} color="#ffffff" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              Lưu thay đổi
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
