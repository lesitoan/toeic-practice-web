import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileServices from '@/services/profile.service';

const initialState = {
  accessToken: '',
  refreshToken: '',
  userProfile: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

export const mineProfile = createAsyncThunk('mine/mineProfile', async (_, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    const response = await profileServices.getMe();
    const { data } = response;
    return data;
  } catch (error) {
    return error;
  } finally {
    dispatch(setLoading(false));
  }
});

const mineSlice = createSlice({
  name: 'mine',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(mineProfile.fulfilled, (state, action) => {
      if (action.payload) state.userProfile = action.payload;
    });
  },
});

export const { setAccessToken, setRefreshToken, setUserProfile, setLoading, logout } =
  mineSlice.actions;
export default mineSlice;
