import { PREFIX_SERVICES } from '@/constants/services';
import requestHelpers from '@/utils/requestHelper';

const authServices = {
  login: (data) => requestHelpers.post(PREFIX_SERVICES.AUTH, 'login', data),
  logout: () => requestHelpers.post(PREFIX_SERVICES.AUTH, 'logout'),
  register: (data) => requestHelpers.post(PREFIX_SERVICES.AUTH, 'register', data),
};

export default authServices;
