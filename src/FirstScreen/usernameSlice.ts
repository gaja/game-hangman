import { createSlice } from '@reduxjs/toolkit';

const usernameSlice = createSlice({
  name: 'username',
  initialState: { userName: '' },
  reducers: {
    setUserName: (state, { payload }) => {
      state.userName = payload;
    },
  },
});

export const { setUserName } = usernameSlice.actions;
export default usernameSlice.reducer;
