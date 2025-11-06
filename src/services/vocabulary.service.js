import { PREFIX_SERVICES } from '@/constants/services';
import { fakeVocabularyService } from '@/data/vocabulary';
import requestHelpers from '@/utils/requestHelper';

const vocabularyService = {
  getVocabulariesByCollectionId: async (id) => {
    return requestHelpers.get(`${PREFIX_SERVICES.collection_service_v1}/${id}`, '');
    //mock data
    // return fakeVocabularyService.getVocabularies(params);
  },

  saveVocabularyCollection: async (data) => {
    const { english, vietnamese, collectionId, ...rest } = data || {};
    if (!english || !vietnamese || !collectionId) return;

    let existData = await requestHelpers.get(PREFIX_SERVICES.vocabulary_service_v1, '', {
      search: english,
    });

    if (!existData || existData?.items?.length === 0) {
      existData = await requestHelpers.post(PREFIX_SERVICES.vocabulary_service_v1, '', {
        list: [
          {
            word: english,
            definition: vietnamese,
            example: '',
            image_url: '',
            audio_url: '',
            part_of_speech: 0,
            level: 0,
            category_name: '',
          },
        ],
      });
    }

    if (!existData || existData?.items?.length === 0) {
      throw new Error('Lưu từ thất bại, vui lòng thử lại!');
    }

    const vocabularyId = existData?.items[0].id;

    return requestHelpers.patch(
      PREFIX_SERVICES.collection_service_v1,
      `/${collectionId}/vocabularies/student`,
      {
        title: '',
        description: '',
        vocabulary_id: [vocabularyId],
      }
    );

    //mock data
    // return fakeVocabularyService.saveVocabularyCollection(data);
  },

  deleteVocabularyFromCollection: async (data) => {
    const { collectionId, vocabularyId } = data || {};
    if (!collectionId || !vocabularyId) return;
    return requestHelpers.delete(
      PREFIX_SERVICES.collection_service_v1,
      `/${collectionId}/vocabularies/${vocabularyId}`
    );
    //mock data
    // return fakeVocabularyService.deleteVocabularyFromCollection(id);
  },
};

export default vocabularyService;
