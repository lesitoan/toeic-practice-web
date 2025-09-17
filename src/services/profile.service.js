import { PREFIX_SERVICES } from '@/constants/services';
import requestHelpers from '@/utils/requestHelper';

const profileServices = {
  getMe: async () => requestHelpers.get(PREFIX_SERVICES.profile_service_v1, '/me'),
  updateMe: async (data) => requestHelpers.put(PREFIX_SERVICES.profile_service_v1, '/me', data),
  updatePassword: async (data) =>
    requestHelpers.patch(PREFIX_SERVICES.auth_service_v1, '/password/me', data),
};

export default profileServices;
