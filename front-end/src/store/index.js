import { configureStore } from '@reduxjs/toolkit';
import browsingGenreReducer from 'slices/browsingGenreSlice';
import moviesReducer from 'slices/moviesSlice';

export default configureStore({
  reducer: {
    browsingGenre: browsingGenreReducer,
    movies: moviesReducer,
  },
});
