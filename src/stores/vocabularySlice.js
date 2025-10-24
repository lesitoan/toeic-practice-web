import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vocabularyServices from '@/services/vocabulary.service';
import { showErrorMessage } from '@/utils/common';

const initialState = {
  vocabularies: [],
  selectedVocabulary: null,
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
    setSelectedVocabulary: (state, action) => {
      state.selectedVocabulary = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVocabularies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocabularies.fulfilled, (state, action) => {
        if (action.payload) {
          state.vocabularies = action.payload;
        }
      })
      .addCase(fetchVocabularies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading, setError, setFilter, setSelectedVocabulary } = vocabularySlice.actions;
export default vocabularySlice;
