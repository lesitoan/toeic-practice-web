import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import collectionServices from '@/services/collection.service';
import { showErrorMessage } from '@/utils/common';

const initialState = {
  collections: [],
  selectedCollection: null,
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

export const fetchCollectionById = createAsyncThunk(
  'collection/fetchCollectionById',
  async (id, { dispatch }) => {
    try {
      const data = await collectionServices.getCollectionById(id);
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
    setSelectedCollection: (state, action) => {
      state.selectedCollection = action.payload;
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

    builder
      .addCase(fetchCollectionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCollectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCollection = action.payload || null;
      })
      .addCase(fetchCollectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Lỗi tải dữ liệu';
      });
  },
});

export const { setLoading, setError, setFilter, setSelectedCollection } = collectionSlice.actions;
export default collectionSlice;
