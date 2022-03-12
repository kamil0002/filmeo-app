import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import MovieCard from './MovieCardItem';

const MovieCardGrid = ({ movies, title, backgroundColor }) => {
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Typography
        component="h2"
        variant="h4"
        fontFamily="Poppins"
        fontWeight={700}
        align="center"
        letterSpacing={0.5}
      >
        {title}
      </Typography>
      <Grid
        container
        spacing={4}
        rowSpacing={2}
        justifyContent="center"
        marginTop={4}
        paddingX={5}
      >
        {movies.map(
          ({
            title,
            genre,
            poster,
            ratingAverage,
            ratingQuantity,
            id,
            description,
            releaseDate,
            time,
          }) => (
            <Grid item key={id}>
              <MovieCard
                title={title}
                genre={genre}
                poster={poster}
                ratingAverage={ratingAverage}
                ratingQuantity={ratingQuantity}
                description={description}
                releaseDate={releaseDate}
                time={time}
              />
            </Grid>
          )
        )}
      </Grid>
    </Wrapper>
  );
};

export default MovieCardGrid;

const Wrapper = styled.section`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 3rem 0;
`;

MovieCardGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
