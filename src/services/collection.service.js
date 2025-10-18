import { PREFIX_SERVICES } from '@/constants/services';
import requestHelpers from '@/utils/requestHelper';

const collectionServices = {
  createCollection: async (data) =>
    requestHelpers.post(PREFIX_SERVICES.collection_service_v1, '', data), // chưa có
  updateCollectionName: async (id, data) =>
    requestHelpers.put(`${PREFIX_SERVICES.collection_service_v1}/${id}`, data), // chưa có
  deleteCollection: async (id) =>
    requestHelpers.delete(`${PREFIX_SERVICES.collection_service_v1}/${id}`), // chưa có
  getCollections: async (params) =>
    requestHelpers.get(PREFIX_SERVICES.collection_service_v1, '', { params }), // chưa có
};

export default collectionServices;
