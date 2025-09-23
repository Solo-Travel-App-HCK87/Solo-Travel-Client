import { configureStore } from '@reduxjs/toolkit';
import { packageReducer } from './packageSlice';

export default configureStore({
  reducer: {
    package: packageReducer,
  },
});
