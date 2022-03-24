import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Typography from 'components/Typography/Typography';
import RentedMovie from 'components/RentedMovieCard/RentedMovieCard';
import responsive from 'theme/responsive';

const UserMovies = () => {
  return (
    <Wrapper>
      <Typography fontSize={24} fontWeight={700} marginBottom={4}>
        Wypożyczone Filmy
      </Typography>
      <GridContainer container columnSpacing={3} rowSpacing={3}>
        <GridItem item xs={10} sm={6} md={4} lg={3.5} xl={2.75}>
          <RentedMovie />
        </GridItem>
        <GridItem item xs={10} sm={6} md={4} lg={3.5} xl={2.75}>
          <RentedMovie />
        </GridItem>
        <GridItem item xs={10} sm={6} md={4} lg={3.5} xl={2.75}>
          <RentedMovie />
        </GridItem>
      </GridContainer>
    </Wrapper>
  );
};

export default UserMovies;

const Wrapper = styled.div`
  height: 900px;
  overflow-y: scroll;
  padding: 0.7rem 0;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const GridContainer = styled(Grid)`
  && {
    padding: 0;
    justify-content: center;

    @media ${responsive.mobileM} {
      padding: 0 0.6rem;
      justify-content: flex-start;
    }
  }
`;

const GridItem = styled(Grid)`
  && {
    max-width: 250px;
  }
`;
