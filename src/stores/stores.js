import { configureStore } from '@reduxjs/toolkit';
import MineSlice from './mineSlice';
import vocabularySlice from './vocabularySlice';
import collectionSlice from './collectionSlice';
import testSlice from './testSlice';

const rootReducer = {
  mine: MineSlice.reducer,
  vocabulary: vocabularySlice.reducer,
  collection: collectionSlice.reducer,
  test: testSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
