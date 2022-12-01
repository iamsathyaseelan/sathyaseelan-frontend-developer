import {configureStore} from '@reduxjs/toolkit';
import capsuleReducer from '../store/capsuleSlice';

export const store = configureStore({
  reducer: {
    capsule: capsuleReducer,
  },
});
