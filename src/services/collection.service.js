import { PREFIX_SERVICES } from '@/constants/services';
import { mockCollectionService } from '@/data/collections';
import requestHelpers from '@/utils/requestHelper';

const collectionServices = {
  createCollection: async (data) => {
    return requestHelpers.post(PREFIX_SERVICES.collection_service_v1, '/student', data);
    //mock data
    // return mockCollectionService.createCollection(data);
  },
  updateCollectionName: async (id, data) => {
    // return requestHelpers.put(`${PREFIX_SERVICES.collection_service_v1}/${id}`, data),
    //mock data
    return mockCollectionService.updateCollection(id, data);
  },

  deleteCollection: async (id) => {
    return requestHelpers.delete(`${PREFIX_SERVICES.collection_service_v1}/${id}`, '');
    //mock data
    // return mockCollectionService.deleteCollection(id);
  },

  getCollections: async (params) => {
    return requestHelpers.get(PREFIX_SERVICES.collection_service_v1, '', params);
    //mock data
    // return mockCollectionService.getCollections(params);
  },

  getCollectionById: async (id) => {
    return requestHelpers.get(`${PREFIX_SERVICES.collection_service_v1}/${id}`, '');
    //mock data
    // return mockCollectionService.getCollectionById(id);
  },
};

export default collectionServices;
