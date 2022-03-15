import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Paper, Rating } from '@mui/material';
import Typography from 'components/Typography/Typography';

const ReviewCard = ({ profile }) => {
  return (
    <Paper
      sx={{
        paddingTop: 2,
      }}
      elevation={4}
    >
      <ReviewContent>
        <Typography fontWeight={700} align={'center'}>
          Best Movie Ever
        </Typography>
        <Typography fontSize={14} marginTop={1} align={'center'}>
          This is the best movie I’ve ever watched! Highly recommend.
        </Typography>
      </ReviewContent>
      <ReviewDetails>
        <Rating
          name="read-only"
          value={4.3}
          precision={0.1}
          defaultValue={0.0}
          size={'small'}
          readOnly
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        />
        {profile && <Button variant="text">Usuń</Button>}
        {!profile && <Typography fontSize={12}>22-04-2022</Typography>}
      </ReviewDetails>
      <ReviewCardFooter>{profile ? 'Uncharted' : 'Adam'}</ReviewCardFooter>
    </Paper>
  );
};

export default ReviewCard;

const ReviewContent = styled.div`
  padding: 0 0.5rem;
`;

const ReviewDetails = styled.div`
  margin: 0.4rem auto;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewCardFooter = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.darkBlue};
  background: ${({ theme }) => theme.primaryLight};
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 4px 4px;
`;

ReviewCard.propTypes = {
  profile: PropTypes.bool,
};

ReviewCard.defaultProps = {
  profile: true,
};
