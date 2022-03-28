/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from 'slices/moviesSlice';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import GenresNavigation from 'components/GenresNavigation/GenresNavigation';
import MovieCardGrid from 'components/MovieCard/MovieCardGrid';
import Alert from 'components/Alert/Alert';
import axios from 'utils/axios';

const Movies = () => {
  const genre = useSelector((state) => state.browsingGenre.genreName);
  const movies = useSelector((state) => state.movies.all);
  const dispatch = useDispatch();

  const [errMessage, setErrMessage] = useState(null);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  useEffect(async () => {
    try {
      if (!genre) return;

      setSpinnerVisible(true);
      const data = await axios.get(`/movies?genre=${genre}`);
      setSpinnerVisible(false);
      dispatch(setMovies(data.data.data[0]));
    } catch (err) {
      setErrMessage(err.message);
      setTimeout(() => setErrMessage(null), 5000);
    }
  }, [genre]);

  return (
    <Wrapper>
      {errMessage && <Alert>{errMessage}</Alert>}
      <GenresNavigation />
      {spinnerVisible && <Spinner />}
      {movies && !spinnerVisible && (
        <MovieCardGrid movies={movies} allMovies={true} />
      )}
    </Wrapper>
  );
};

export default Movies;

const Wrapper = styled.div`
  min-height: calc(100vh - 76px - 70px);
`;

const Spinner = styled(CircularProgress)`
  && {
    display: block;
    margin: 150px auto 50px auto;
  }
`;
