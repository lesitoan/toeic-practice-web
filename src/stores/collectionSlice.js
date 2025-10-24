import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import collectionServices from '@/services/collection.service';
import { showErrorMessage } from '@/utils/common';
import { MOCK_COLLECTIONS } from '@/data/collections';

const initialState = {
  collections: [],
  selectedCollectionId: null,
  filter: {
    page: 1,
    pageSize: 10,
  },
  loading: false,
  error: null,
};

export const fetchCollections = createAsyncThunk(
  'collection/fetchCollections',
  async (params, { dispatch }) => {
    try {
      const data = await collectionServices.getCollections(params);
      return data;
    } catch (error) {
      showErrorMessage(error.message);
    }
  }
);

const collectionSlice = createSlice({
  name: 'collection',
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
    setSelectedCollectionId: (state, action) => {
      state.selectedCollectionId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload || [];
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Lỗi tải dữ liệu';
      });
  },
});

export const { setLoading, setError, setFilter, setSelectedCollectionId } = collectionSlice.actions;
export default collectionSlice;
