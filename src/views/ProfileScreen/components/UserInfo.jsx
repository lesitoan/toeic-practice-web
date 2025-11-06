import { Mail, Calendar, Crown, Edit2, Settings, Camera, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_DATA } from '../constants';
import { getAvatarUrl } from '@/utils/common';
import { ROLE } from '@/constants/common';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import profileServices from '@/services/profile.service';
import { mineProfile } from '@/stores/mineSlice';

export default function UserInfo() {
  const isPro = false;
  const userData = USER_DATA;
  const { userProfile } = useSelector((state) => state.mine);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files?.[0];
      if (!file) throw new Error('No file selected');
      if (!file.type.startsWith('image/')) {
        toast.warning('Vui lòng chọn một tệp hình ảnh hợp lệ!');
        return;
      }

      //tối đa 5MB
      if (file.size > 5 * 1024 * 1024) {
        toast.warning('Kích thước ảnh không được vượt quá 5MB!');
        return;
      }

      setIsUploading(true);
      await profileServices.updateAvatar(file);

      toast.success('Cập nhật ảnh đại diện thành công!');
      dispatch(mineProfile());
    } catch (error) {
      toast.error('Cập nhật ảnh đại diện thất bại. Vui lòng thử lại sau.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="bg-bgSecondary shadow-lg rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                className={`relative group ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={handleAvatarClick}
                onMouseEnter={() => !isUploading && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={getAvatarUrl(userProfile?.avatar)}
                  alt="Avatar"
                  className={`w-16 h-16 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                    isUploading ? 'brightness-50' : 'group-hover:brightness-75'
                  }`}
                />

                {/* Overlay khi hover hoặc đang upload */}
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 transition-opacity duration-300 ${
                    isHovered || isUploading ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <Camera className="w-6 h-6 text-white" />
                  )}
                </div>

                {isPro && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 z-10">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />

              {/* Text trạng thái đang cập nhật */}
              {isUploading && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs text-blue-600 font-medium">Đang cập nhật...</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userProfile?.name}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {userProfile?.email}
              </p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Tham gia: {userProfile?.joinDate || '01/01/2024'}
                </span>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                    userProfile?.role === ROLE.USER_PRO
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-800 shadow-sm hover:shadow-md hover:border-blue-400'
                      : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300 text-gray-700 shadow-sm hover:shadow-md hover:border-gray-400'
                  }`}
                >
                  {userProfile?.role === ROLE.USER_PRO && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  )}
                  {userProfile?.role === ROLE.USER_PRO ? 'Pro Member' : 'Free trial'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button> */}
            <Link
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              href="/profile?tab=settings"
            >
              <Edit2 className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
