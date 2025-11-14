import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import testServices from '@/services/test.service';
import { showErrorMessage } from '@/utils/common';
import firebaseService from '@/services/firebase.service';

const initialState = {
  listTest: [],
  listTestForHomePage: [],
  selectedTest: null,
  testSessionSelected: null,
  startTime: null, // lưu trữ thời gian bắt đầu phiên làm bài thi
  expireTime: null, // lưu trữ thời gian kết thúc phiên làm bài thi
  idTokenSession: null, // lưu trữ idToken của phiên làm bài thi để gửi qua firebase
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

export const fetchTestSession = createAsyncThunk('test/fetchTestSession', async (testId) => {
  try {
    // bắt đầu một phiên làm bài thi
    const startSessionResponse = await testServices.startSession({ test_run_id: testId });
    const {
      session_id: sessionId,
      firebase,
      planned_start,
      planned_expire,
    } = startSessionResponse || {};
    if (!sessionId || !firebase) throw new Error('Không thể bắt đầu phiên làm bài thi');
    const { custom_token: customToken } = firebase || {};
    if (!customToken) throw new Error('Không thể lấy custom token từ firebase');

    const idToken = await firebaseService.getIdToken(customToken);
    if (!idToken) throw new Error('Không thể lấy id token từ firebase');

    // tính toán thời gian bắt đầu và kết thúc phiên làm bài thi
    const currentTime = Date.now();
    const startTime = currentTime;
    const expireTime = planned_expire ? new Date(planned_expire).getTime() : currentTime;

    // lấy ra đề thi chi tiết theo session
    const selectedTest = await testServices.getTestDetailBySession(sessionId);
    return { idToken, selectedTest, startTime, expireTime };
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
    builder
      .addCase(fetchTestSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestSession.fulfilled, (state, action) => {
        state.loading = false;
        state.testSessionSelected = action.payload?.selectedTest || null;
        state.idTokenSession = action.payload?.idToken || null;
        state.startTime = action.payload?.startTime || null;
        state.expireTime = action.payload?.expireTime || null;
      })
      .addCase(fetchTestSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Lỗi tải dữ liệu';
      });
  },
});

export const { setLoading, setError, setFilter, setSelectedTest } = testSlice.actions;
export default testSlice;
