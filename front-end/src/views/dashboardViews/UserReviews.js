import React from 'react';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import Typography from 'components/Typography/Typography';
import ReviewCard from 'components/ReviewCard/ReviewCard';
import responsive from 'theme/responsive';

const UserReviews = () => {
  return (
    <Wrapper>
      <Typography fontSize={24} fontWeight={700} marginBottom={4}>
        Wystawione Opinie
      </Typography>
      <GridContainer container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
        <Grid item xs={11} sm={6} lg={4} xl={3}>
          <ReviewCard />
        </Grid>
      </GridContainer>
    </Wrapper>
  );
};

export default UserReviews;

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
