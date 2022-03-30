import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserPhoto: (state, action) => {
      state.user.avatar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUserPhoto } = userSlice.actions;

export default userSlice.reducer;
