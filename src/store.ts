import { configureStore } from '@reduxjs/toolkit';
import usernameReducer from './FirstScreen/usernameSlice';
import mainScreenReducer from './MainScreen/mainScreenSlice';

export const store = configureStore({
  reducer: {
    username: usernameReducer,
    mainScreen: mainScreenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
