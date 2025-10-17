import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import collectionServices from '@/services/collection.service';
import { showErrorMessage } from '@/utils/common';

const initialState = {
  defaultCollections: [],
  myCollections: [],
  selectedCollectionId: null,
  filter: {
    page: 1,
    pageSize: 10,
  },
  loading: false,
  error: null,
};

export const fetchDefaultCollections = createAsyncThunk(
  'collection/fetchDefaultCollections',
  async (params, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      // const data = await collectionServices.getDefaultCollections(params);

      // mock data
      const data = [
        {
          id: 1,
          name: 'Bộ từ vựng 1',
          level: 'Cơ bản',
          wordCount: 100,
          description: 'Mô tả bộ từ vựng 1',
        },
        {
          id: 2,
          name: 'Bộ từ vựng 2',
          level: 'Cơ bản',
          wordCount: 120,
          description: 'Mô tả bộ từ vựng 2',
        },
        {
          id: 3,
          name: 'Bộ từ vựng 3',
          level: 'Cơ bản',
          wordCount: 80,
          description: 'Mô tả bộ từ vựng 3',
        },
        {
          id: 4,
          name: 'Bộ từ vựng 4',
          level: 'Cơ bản',
          wordCount: 150,
          description: 'Mô tả bộ từ vựng 4',
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

export const fetchMyCollections = createAsyncThunk(
  'vocabulary/fetchMyCollections',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      //   const data = await vocabularyServices.getMyCollections();
      // mock data
      const data = [
        { id: 11, name: 'Bộ từ vựng cá nhân 11', description: 'Mô tả bộ từ vựng cá nhân 11' },
        { id: 12, name: 'Bộ từ vựng cá nhân 22', description: 'Mô tả bộ từ vựng cá nhân 22' },
        { id: 33, name: 'Bộ từ vựng cá nhân 33', description: 'Mô tả bộ từ vựng cá nhân 33' },
        { id: 44, name: 'Bộ từ vựng cá nhân 44', description: 'Mô tả bộ từ vựng cá nhân 44' },
        { id: 55, name: 'Bộ từ vựng cá nhân 55', description: 'Mô tả bộ từ vựng cá nhân 55' },
      ];
      return data;
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      dispatch(setLoading(false));
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
    builder.addCase(fetchMyCollections.fulfilled, (state, action) => {
      if (action.payload) {
        state.myCollections = action.payload;
      }
    });
    builder.addCase(fetchDefaultCollections.fulfilled, (state, action) => {
      if (action.payload) {
        state.defaultCollections = action.payload;
      }
    });
  },
});

export const { setLoading, setError, setFilter, setSelectedCollectionId } = collectionSlice.actions;
export default collectionSlice;
