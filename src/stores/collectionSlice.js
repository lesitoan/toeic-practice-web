import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import collectionServices from '@/services/collection.service';
import { showErrorMessage } from '@/utils/common';

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
      // const data = await collectionServices.getCollections(params);
      // mock data
      const { type, search } = params || {};
      const fakeData = [
        {
          id: 1,
          name: 'Bộ từ vựng 1',
          level: 'Cơ bản',
          wordCount: 100,
          description: 'Mô tả bộ từ vựng 1',
          type: 'featured',
          isFavorite: true,
        },
        {
          id: 2,
          name: 'Bộ từ vựng 2',
          level: 'Cơ bản',
          wordCount: 120,
          description: 'Mô tả bộ từ vựng 2',
          type: 'featured',
          isFavorite: false,
        },
        {
          id: 3,
          name: 'Bộ từ vựng 3',
          level: 'Cơ bản',
          wordCount: 80,
          description: 'Mô tả bộ từ vựng 3',
          type: 'featured',
          isFavorite: true,
        },
        {
          id: 4,
          name: 'Bộ từ vựng 4',
          level: 'Cơ bản',
          wordCount: 150,
          description: 'Mô tả bộ từ vựng 4',
          type: 'featured',
          isFavorite: false,
        },
        {
          id: 5,
          name: 'bộ từ vựng của tôi',
          level: 'Cơ bản',
          wordCount: 200,
          description: 'Mô tả bộ từ vựng 5',
          type: 'created',
          isFavorite: true,
        },
      ];
      let data = fakeData;
      if (type) {
        data = data.filter((item) => item.type === type);
      }
      if (search) {
        data = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
      }
      await new Promise((r) => setTimeout(r, 1500));

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
