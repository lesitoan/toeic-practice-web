import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authServices from '@/services/auth.service';

const initialState = {
  accessToken: '',
  refreshToken: '',
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.isAuthenticated = false;
    },
  },
});

export const { logout } = authSlice.actions;
