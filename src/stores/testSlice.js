import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import testServices from '@/services/test.service';
import { showErrorMessage } from '@/utils/common';

const initialState = {
  listTest: [],
  listTestForHomePage: [],
  selectedTest: null,
  filter: {
    page: 1,
    pageSize: 10,
  },
  loading: false,
  total: 0,
  error: null,
};

export const fetchListTest = createAsyncThunk('test/fetchListTest', async (params) => {
  try {
    const data = await testServices.getListTest(params);
    return data;
  } catch (error) {
    showErrorMessage(error.message);
  }
});

export const fetchListTestForHomePage = createAsyncThunk(
  'test/fetchListTestForHomePage',
  async () => {
    try {
      const data = await testServices.getListTest({
        page: 1,
        limit: 8,
      });
      return data;
    } catch (error) {
      showErrorMessage(error.message);
    }
  }
);

const testSlice = createSlice({
  name: 'test',
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
    setSelectedTest: (state, action) => {
      state.selectedTest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListTest.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.items) {
          state.listTest = action.payload?.items;
        }
        state.total = action.payload?.total;
        state.filter.page = action.payload?.page;
        state.filter.pageSize = action.payload?.limit;
      })
      .addCase(fetchListTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Lỗi tải dữ liệu';
      });

    builder
      .addCase(fetchListTestForHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListTestForHomePage.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.items) {
          state.listTestForHomePage = action.payload?.items;
        }
      })
      .addCase(fetchListTestForHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Lỗi tải dữ liệu';
      });
  },
});

export const { setLoading, setError, setFilter, setSelectedTest } = testSlice.actions;
export default testSlice;
