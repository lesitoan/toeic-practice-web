import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
  userProfile: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

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
});

export const { setAccessToken, setRefreshToken, setUserProfile } = mineSlice.actions;
export default mineSlice.reducer;
