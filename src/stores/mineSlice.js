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
  dispatch(setLoading(true));
  try {
    // const data = await profileServices.getMe();
    // Mock data
    const data = {
      id: 1,
      role_id: 2,
      username: 'john_doe',
      email: 'john_doe@example.com',
    };
    return data;
  } catch (error) {
    showErrorMessage(error.message);
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
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(mineProfile.fulfilled, (state, action) => {
      // match role
      if (action.payload?.role_id === 3) {
        action.payload.role = ROLE.USER_FREE;
      } else if (action.payload?.role_id === 2) {
        action.payload.role = ROLE.USER_PRO;
      }
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
