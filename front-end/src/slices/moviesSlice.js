import { createSlice } from '@reduxjs/toolkit';

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    all: [],
    addMovieViewVisible: false,
  },

  reducers: {
    setMovies: (state, action) => {
      state.all = action.payload;
    },

    setAddMovieViewVisible: (state, action) => {
      state.addMovieViewVisible = action.payload;
    },
  },
});

export const { setMovies, setAddMovieViewVisible } = moviesSlice.actions;

export default moviesSlice.reducer;
