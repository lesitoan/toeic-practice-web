import { configureStore } from '@reduxjs/toolkit';
import MineSlice from './mineSlice';

const rootReducer = {
  mine: MineSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
