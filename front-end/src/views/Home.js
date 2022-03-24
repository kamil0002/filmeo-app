import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Typography from 'components/Typography/Typography';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Zoom, Fade, Slide } from 'react-reveal';
import responsive from 'theme/responsive';
import MovieCardGrid from 'components/MovieCard/MovieCardGrid';
import Chat from 'components/Chat/Chat';
import moviesData from 'movies-data.json';

const Home = () => {
  const scrollToChat = () => {
    const chatNode = document.getElementById('chat');
    chatNode.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper>
      <StartChatting onClick={scrollToChat}>
        <ChatBubbleIcon sx={{ color: '#FFF', fontSize: 28 }} />
      </StartChatting>
      <Header>
        <Zoom>
          <Heading
            paddingTop={15}
            paddingX={4}
            color="#ECEFF1"
            variant="h1"
            align="center"
            fontWeight={700}
            letterSpacing={3}
          >
            Znajdź Coś Dla Siebie w Naszej Bazie Filmów
          </Heading>
        </Zoom>
        <Actions>
          <Slide left>
            <StyledButton
              sx={{ fontFamily: 'inherit' }}
              variant="contained"
              endIcon={<MovieFilterOutlinedIcon />}
              LinkComponent={Link}
              to="/filmy"
            >
              Wszystkie Filmy
            </StyledButton>
          </Slide>
          <Slide right>
            <StyledButton
              sx={{ fontFamily: 'inherit' }}
              variant="contained"
              endIcon={<LoginIcon />}
              LinkComponent={Link}
              to="/rejestracja"
            >
              Dołącz Do Nas!
            </StyledButton>
          </Slide>
        </Actions>
      </Header>
      <Fade left>
        <MovieCardGrid
          movies={moviesData.movies.slice(-4)}
          heading="Ostatnio dodane"
          backgroundColor="#f7f7f7"
        />
      </Fade>
      <Fade right>
        <MovieCardGrid
          movies={moviesData.movies.slice(-4)}
          heading="Najlepiej oceniane"
          backgroundColor="#C3D1DE"
        />
      </Fade>
      <Fade left>
        <MovieCardGrid
          movies={moviesData.movies.slice(-4)}
          heading="Najchętniej oglądane"
          backgroundColor="#e0e0e0"
        />
      </Fade>
      <Chat id="chat" />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  min-height: calc(100vh - 67px);
`;

const StartChatting = styled.div`
  cursor: pointer;
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: #2fcc90;
  z-index: 111;
  bottom: 2%;
  right: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 200ms ease-out;
  -webkit-box-shadow: 8px 1px 48px -3px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 8px 1px 48px -3px rgba(0, 0, 0, 0.43);
  box-shadow: 8px 1px 48px -3px rgba(0, 0, 0, 0.43);

  :hover {
    transform: scale(1.06);

    svg {
      transform: scale(1);
    }
  }
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
  height: calc(100vh - 76px);
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
    margin: 1rem 0.5rem;

    @media ${responsive.mobile} {
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
  display: flex;
  margin-top: 20vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${responsive.mobileM} {
    flex-direction: row;
  }
`;
