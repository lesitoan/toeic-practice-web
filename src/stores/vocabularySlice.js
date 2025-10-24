import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vocabularyServices from '@/services/vocabulary.service';
import { showErrorMessage } from '@/utils/common';
import { MOCK_VOCABULARIES } from '@/data/vocabulary';

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
      const data = await vocabularyServices.getVocabularies(params);
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
