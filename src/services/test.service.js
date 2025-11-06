import { PREFIX_SERVICES } from '@/constants/services';
import requestHelpers from '@/utils/requestHelper';

const testServices = {
  getListTest: async (params) => {
    return requestHelpers.get(PREFIX_SERVICES.test_service_v1, '/test-public', params);
  },
};

export default testServices;
