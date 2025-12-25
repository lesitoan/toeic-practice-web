import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileServices from '@/services/profile.service';
import { showErrorMessage } from '@/utils/common';
import { ROLE } from '@/constants/common';

const initialState = {
  accessToken: '',
  refreshToken: '',
  userProfile: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

export const mineProfile = createAsyncThunk('mine/mineProfile', async (_, { dispatch }) => {
  const data = await profileServices.getMe();
  return data;
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
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mineProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(mineProfile.rejected, (state) => {
        console.log('reject mine profile');
        state.loading = false;
        state.isAuthenticated = false;
        state.userProfile = null;
      })
      .addCase(mineProfile.fulfilled, (state, action) => {
        if (action.payload.role_id !== 3) {
          state.isAuthenticated = false;
          state.userProfile = null;
          return;
        }
        // match role
        // if (action.payload?.role_id === 3) {
        //   action.payload.role = ROLE.USER_FREE;
        // } else if (action.payload?.role_id === 2) {
        //   action.payload.role = ROLE.USER_PRO;
        // }

        // fake role pro
        action.payload.role = ROLE.USER_FREE;

        if (action.payload) {
          state.userProfile = action.payload;
          state.isAuthenticated = true;
        }
      });
  },
});

export const { setAccessToken, setRefreshToken, setUserProfile, setLoading, logout } =
  mineSlice.actions;
export default mineSlice;
