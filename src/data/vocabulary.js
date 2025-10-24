export const MOCK_VOCABULARIES = [
  {
    word: 'Hello',
    definition: 'A greeting used when meeting someone',
    example: 'Hello! How are you?',
    image_url: 'default_image.png',
    audio_url: 'default_audio.mp3',
    part_of_speech: 'Noun',
    level: 0,
    collectionId: '1',
  },
  {
    word: 'Run',
    definition: 'To move swiftly on foot',
    example: 'I like to run in the morning.',
    image_url: 'default_image.png',
    audio_url: 'default_audio.mp3',
    part_of_speech: 'Verb',
    level: 0,
    collectionId: '2',
  },
  {
    word: 'Jump',
    definition: 'To push oneself off the ground and into the air',
    example: 'The cat likes to jump on the table.',
    image_url: 'default_image.png',
    audio_url: 'default_audio.mp3',
    part_of_speech: 'Verb',
    level: 0,
    collectionId: '3',
  },
  {
    word: 'Study',
    definition:
      'To apply oneself to the acquisition of knowledge, as by reading, investigation, or practice',
    example: 'I study for my exams every night.',
    image_url: 'default_image.png',
    audio_url: 'default_audio.mp3',
    part_of_speech: 'Verb',
    level: 0,
    collectionId: '3',
  },
  {
    word: 'Study',
    definition:
      'To apply oneself to the acquisition of knowledge, as by reading, investigation, or practice',
    example: 'I study for my exams every night.',
    image_url: 'default_image.png',
    audio_url: 'default_audio.mp3',
    part_of_speech: 'Verb',
    level: 0,
    collectionId: '4',
  },
  {
    word: 'Study',
    definition:
      'To apply oneself to the acquisition of knowledge, as by reading, investigation, or practice',
    example: 'I study for my exams every night.',
    image_url: 'default_image.png',
    audio_url: 'default_audio.mp3',
    part_of_speech: 'Verb',
    level: 0,
    collectionId: '4',
  },
];

class FakeVocabularyService {
  async getVocabularies(params) {
    const { collectionId } = params || {};
    let data = MOCK_VOCABULARIES;
    if (collectionId) {
      data = data.filter((item) => item.collectionId === collectionId);
    }
    await new Promise((r) => setTimeout(r, 1500));
    return data;
  }

  async saveVocabularyCollection(data) {
    let newVocabulary = { id: Date.now(), ...data };
    MOCK_VOCABULARIES.push(newVocabulary);
    await new Promise((r) => setTimeout(r, 1500));
    return newVocabulary;
  }

  async deleteVocabularyFromCollection(id) {
    const index = MOCK_VOCABULARIES.findIndex((item) => item.id === id);
    if (index !== -1) {
      MOCK_VOCABULARIES.splice(index, 1);
      await new Promise((r) => setTimeout(r, 1500));
      return true;
    }
    await new Promise((r) => setTimeout(r, 1500));
    return false;
  }
}

export const fakeVocabularyService = new FakeVocabularyService();
