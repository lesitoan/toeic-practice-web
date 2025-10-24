import { useCallback, useState } from 'react';
import { X, BookOpen, Plus, Sparkles } from 'lucide-react';
import { Button, Input, Textarea } from '@nextui-org/react';
import CradleLoader from '@/components/common/Loading/CradleLoader';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import collectionServices from '@/services/collection.service';
import { fetchCollections } from '@/stores/collectionSlice';

export default function AddCollectionPopup({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const handleCreateCollection = useCallback(
    async (data) => {
      setIsSubmitting(true);
      try {
        console.log('Creating collection with data:', data);
        await collectionServices.createCollection({
          name: data.collectionName,
          description: data.description || '',
        });
        toast.success('Tạo bộ sưu tập thành công!');
        dispatch(fetchCollections({ type: 'created' }));
        handleClose();
      } catch (error) {
        console.log('Error creating collection:', error);
        toast.error('Tạo bộ sưu tập thất bại. Vui lòng thử lại.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch]
  );

  const handleClose = () => {
    if (isSubmitting) return;
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Tạo Bộ Sưu Tập Mới</h2>
              <p className="text-blue-100 text-sm">Thêm bộ từ vựng của riêng bạn</p>
            </div>
          </div>

          {/* Decorative elements */}
          <Sparkles className="absolute top-6 right-16 w-5 h-5 text-yellow-300 opacity-80 animate-pulse" />
          <Sparkles
            className="absolute bottom-4 right-24 w-4 h-4 text-pink-300 opacity-60 animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        {/* Form Content */}
        <form className="p-6 space-y-5" onSubmit={handleSubmit(handleCreateCollection)}>
          {/* Collection Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên bộ sưu tập <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('collectionName', {
                required: 'Tên bộ sưu tập là bắt buộc',
                minLength: { value: 1, message: 'Tên bộ sưu tập phải từ 1 ký tự trở lên' },
                maxLength: { value: 40, message: 'Tên bộ sưu tập không được vượt quá 40 ký tự' },
              })}
              name="collectionName"
              placeholder="VD: Essential TOEIC Vocabulary"
              type="text"
              color="primary"
              classNames={{
                base: 'h-12',
                input: `text-md`,
                inputWrapper: `!h-[300px] !rounded-lg ${errors.collectionName && '!border-2 !border-solid !border-red-500 bg-red-100'}`,
              }}
            />
            <p
              className={`text-xs mt-1 ${errors.collectionName ? 'text-red-500' : 'text-gray-500'}`}
            >
              {errors.collectionName ? errors.collectionName?.message : 'Từ 1 đến 40 ký tự'}
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả (Tùy chọn)</label>
            <Textarea
              {...register('description', {
                maxLength: { value: 500, message: 'Mô tả không được vượt quá 500 ký tự' },
              })}
              name="description"
              placeholder="Mô tả ngắn gọn về bộ từ vựng này..."
              type="text"
              color="primary"
              classNames={{
                base: 'h-20',
                input: `text-md`,
                inputWrapper: `!h-[300px] !rounded-lg`,
              }}
            />
            <p className="text-xs text-gray-500 mt-1">Ít hơn 500 ký tự</p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">Sau khi tạo bộ sưu tập</p>
                <p className="text-xs text-blue-700">
                  Bạn có thể thêm từ vựng vào bộ sưu tập và bắt đầu học ngay!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button
              color="default"
              className="w-full rounded-lg h-12 shadow-md cursor-pointer"
              onPress={handleClose}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              color="primary"
              className="w-full rounded-lg h-12 shadow-md cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {!isSubmitting ? 'Tạo Bộ Sưu Tập' : <CradleLoader size={'md'} color="#ffffff" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
