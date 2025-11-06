import { PREFIX_SERVICES } from '@/constants/services';
import requestHelpers from '@/utils/requestHelper';
import axios from 'axios';

const profileServices = {
  getMe: async () => requestHelpers.get(PREFIX_SERVICES.profile_service_v1, '/me'),
  updateMe: async (data) => requestHelpers.put(PREFIX_SERVICES.profile_service_v1, '/me', data),
  updatePassword: async (data) =>
    requestHelpers.patch(PREFIX_SERVICES.auth_service_v1, '/password/me', data),
  updateAvatar: async (file) => {
    const cloudinaryRes = await requestHelpers.get(
      PREFIX_SERVICES.auth_service_v1,
      '/signature-cloudinary'
    );
    const { api_key, timestamp, signature, folder, allowed_formats, upload_url } =
      cloudinaryRes || {};
    if (!api_key || !timestamp || !signature || !upload_url) {
      throw new Error('Có lỗi xảy ra, vui lòng thử lại sau.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', api_key);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);
    formData.append('allowed_formats', allowed_formats);

    const uploadRes = await axios.post(upload_url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!uploadRes?.data?.secure_url) {
      throw new Error('Tải ảnh lên thất bại, vui lòng thử lại sau.');
    }

    return requestHelpers.patch(
      PREFIX_SERVICES.auth_service_v1,
      '/avatar/me',
      {},
      {
        params: {
          url_avatar: uploadRes?.data?.secure_url,
        },
      }
    );
  },
};

export default profileServices;
