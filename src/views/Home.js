import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const Home = () => {
  return (
    <Wrapper>
      <Header>
        <Typography
          paddingTop={15}
          color="#ECEFF1"
          align="center"
          variant="h1"
          fontWeight={700}
          letterSpacing={3}
        >
          Check The Complete Movies Database
        </Typography>
      </Header>
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
