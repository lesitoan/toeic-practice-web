import { PREFIX_SERVICES } from '@/constants/services';
import requestHelpers from '@/utils/requestHelper';

const vocabularyService = {
  getVocabularies: async (params) =>
    requestHelpers.get(PREFIX_SERVICES.vocabulary_service_v1, '', { params }), // chưa có

  saveVocabularyCollection: async (data) =>
    requestHelpers.post(PREFIX_SERVICES.vocabulary_service_v1, '', data), // chưa có

  deleteVocabularyFromCollection: async (id) =>
    requestHelpers.delete(`${PREFIX_SERVICES.vocabulary_service_v1}/${id}`), // chưa có
};

export default vocabularyService;
