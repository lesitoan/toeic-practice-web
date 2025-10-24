import { PREFIX_SERVICES } from '@/constants/services';
import { fakeVocabularyService } from '@/data/vocabulary';
import requestHelpers from '@/utils/requestHelper';

const vocabularyService = {
  getVocabularies: async (params) => {
    // return requestHelpers.get(PREFIX_SERVICES.vocabulary_service_v1, '', { params });
    //mock data
    return fakeVocabularyService.getVocabularies(params);
  },

  saveVocabularyCollection: async (data) => {
    // return requestHelpers.post(PREFIX_SERVICES.vocabulary_service_v1, '', data);
    //mock data
    return fakeVocabularyService.saveVocabularyCollection(data);
  },

  deleteVocabularyFromCollection: async (id) => {
    // return requestHelpers.delete(`${PREFIX_SERVICES.vocabulary_service_v1}/${id}`);
    //mock data
    return fakeVocabularyService.deleteVocabularyFromCollection(id);
  },
};

export default vocabularyService;
