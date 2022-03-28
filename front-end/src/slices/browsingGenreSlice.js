import { createSlice } from '@reduxjs/toolkit';

export const browsingGenreSlice = createSlice({
  name: 'browsingGenre',
  initialState: {
    genreName: 'Akcja',
  },
  reducers: {
    changeGenre: (state, action) => {
      state.genreName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeGenre } = browsingGenreSlice.actions;

export default browsingGenreSlice.reducer;
