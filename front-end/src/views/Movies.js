import GenresNavigation from 'components/GenresNavigation/GenresNavigation';
import React from 'react';
import styled from 'styled-components';
import moviesData from 'movies-data.json';
import MovieCardGrid from 'components/MovieCard/MovieCardGrid';

const Movies = () => {
  return (
    <Wrapper>
      <GenresNavigation />
      <MovieCardGrid movies={moviesData.movies} allMovies={true} />
    </Wrapper>
  );
};

export default Movies;

const Wrapper = styled.div`
  min-height: calc(100vh - 76px - 70px);
`;
