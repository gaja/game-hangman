import { configureStore } from '@reduxjs/toolkit';
import usernameReducer from './FirstScreen/usernameSlice';

export const store = configureStore({
  reducer: {
    username: usernameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
