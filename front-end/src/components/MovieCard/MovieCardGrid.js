import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import Typography from 'components/Typography/Typography';
import MovieCard from './MovieCardItem';
import responsive from 'theme/responsive';

const MovieCardGrid = ({ movies, heading, backgroundColor, allMovies }) => {
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Typography
        component="h2"
        variant="h4"
        fontWeight={700}
        align="center"
        letterSpacing={0.5}
      >
        {heading}
      </Typography>
      <GridContainer
        allmovies={allMovies ? 1 : 0}
        container
        spacing={4}
        marginTop={4}
        paddingX={allMovies ? 6 : 2}
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
      </GridContainer>
    </Wrapper>
  );
};

export default MovieCardGrid;

const Wrapper = styled.section`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 3rem 0;
`;

const GridContainer = styled(Grid)`
  && {
    justify-content: center;

    @media ${responsive.tablet} {
      justify-content: ${({ allmovies }) =>
        allmovies ? 'flex-start' : 'center'};
    }

    margin-bottom: ${({ allmovies }) => (allmovies ? '3rem' : 0)};
  }
`;

MovieCardGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  heading: PropTypes.string,
  backgroundColor: PropTypes.string,
  allMovies: PropTypes.bool,
};

MovieCardGrid.defaultProps = {
  allMovies: false,
};
