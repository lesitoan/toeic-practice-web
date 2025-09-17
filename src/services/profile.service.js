import { PREFIX_SERVICES } from '@/constants/services';
import requestHelpers from '@/utils/requestHelper';

const profileServices = {
  getMe: async () => requestHelpers.get(PREFIX_SERVICES.profile_service_v1, '/me'),
  updateMe: async (data) => requestHelpers.put(PREFIX_SERVICES.profile_service_v1, '/me', data),
};

export default profileServices;
