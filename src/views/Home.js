import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import responsive from 'theme/responsive';
import MovieCardGrid from 'components/MovieCard/MovieCardGrid';
import moviesData from 'movies-data.json';

const Home = () => {
  return (
    <Wrapper>
      <Header>
        <Heading
          paddingTop={15}
          paddingX={4}
          color="#ECEFF1"
          variant="h1"
          align="center"
          fontWeight={700}
          letterSpacing={3}
          fontFamily="Poppins"
        >
          Znajdź Coś Dla Siebie w Naszej Bazie Filmów
        </Heading>
        <Actions>
          <StyledButton
            sx={{ fontFamily: 'inherit' }}
            variant="contained"
            endIcon={<MovieFilterOutlinedIcon />}
          >
            Wszystkie Filmy
          </StyledButton>
          <StyledButton
            sx={{ fontFamily: 'inherit' }}
            variant="contained"
            endIcon={<LoginIcon />}
          >
            Dołącz Do Nas!
          </StyledButton>
        </Actions>
      </Header>
      <MovieCardGrid
        movies={moviesData.movies.slice(-4)}
        title="Ostatnio dodane"
        backgroundColor="#f7f7f7"
      />
      <MovieCardGrid
        movies={moviesData.movies.slice(-4)}
        title="Najlepiej oceniane"
        backgroundColor="#C3D1DE"
      />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  min-height: calc(100vh - 67px);
`;

const Header = styled.div`
  background: linear-gradient(
      90deg,
      rgba(52, 74, 89, 0.6) 0%,
      rgba(41, 52, 57, 0.6) 35%,
      rgba(40, 58, 65, 0.6) 69%,
      rgba(68, 82, 85, 0.6) 100%
    ),
    url('/images/movies.jpg');
  height: calc(100vh - 67px);
  width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Heading = styled(Typography)`
  && {
    font-size: ${({ theme }) => theme.fontSize.m};

    @media ${responsive.tablet} {
      font-size: ${({ theme }) => theme.fontSize.xl};
    }

    @media ${responsive.laptop} {
      font-size: ${({ theme }) => theme.fontSize['2xl']};
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    margin: 1rem 2rem;

    @media ${responsive.mobile} {
      margin: 0 1.5rem;
      font-size: ${({ theme }) => theme.fontSize.xs};
      padding: 0.4rem 1rem;
    }

    @media ${responsive.tablet} {
      padding: 0.8rem 2rem;
      font-size: ${({ theme }) => theme.fontSize.s};
      margin: 0 3.5rem;
    }
  }
`;

const Actions = styled.div`
  flex-direction: column;

  @media ${responsive.mobile} {
    flex-direction: row;
  }
  display: flex;
  justify-content: center;
  margin-top: 20vh;
`;
