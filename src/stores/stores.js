import { configureStore } from '@reduxjs/toolkit';
import MineSlice from './mineSlice';
import vocabularySlice from './vocabularySlice';
import collectionSlice from './collectionSlice';

const rootReducer = {
  mine: MineSlice.reducer,
  vocabulary: vocabularySlice.reducer,
  collection: collectionSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
