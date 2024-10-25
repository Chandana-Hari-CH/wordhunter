import { configureStore } from '@reduxjs/toolkit';
import wordReducer from './WordSlice';

export default configureStore({
  reducer: {
    word: wordReducer,
  },
});
