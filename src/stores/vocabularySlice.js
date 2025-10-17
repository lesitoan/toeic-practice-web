import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vocabularyServices from '@/services/vocabulary.service';
import { showErrorMessage } from '@/utils/common';

const initialState = {
  vocabularies: [],
  filter: {
    page: 1,
    pageSize: 10,
  },
  loading: false,
  error: null,
};

export const fetchVocabularies = createAsyncThunk(
  'vocabulary/fetchVocabularies',
  async (params, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      // const data = await vocabularyServices.getVocabularies(params);

      // mock data
      const data = [
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
      return data;
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVocabularies.fulfilled, (state, action) => {
      if (action.payload) {
        state.vocabularies = action.payload;
      }
    });
  },
});

export const { setLoading, setError, setFilter } = vocabularySlice.actions;
export default vocabularySlice;
