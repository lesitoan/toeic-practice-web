import { PREFIX_SERVICES } from '@/constants/services';
import requestHelpers from '@/utils/requestHelper';

const authServices = {
  login: async (data) => requestHelpers.post(PREFIX_SERVICES.auth_service_v1, '/login', data),
  logout: async () => requestHelpers.post(PREFIX_SERVICES.auth_service_v1, '/logout'),
  register: async (data) =>
    requestHelpers.post(PREFIX_SERVICES.register_service_v1, '/student', data),
  verifyAccount: async (params) =>
    requestHelpers.get(
      PREFIX_SERVICES.register_service_v1,
      `/verify/${params.userId}/${params.token}`
    ),
};

export default authServices;
