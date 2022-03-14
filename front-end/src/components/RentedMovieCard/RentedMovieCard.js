import React from 'react';
import { Button, Paper, Rating } from '@mui/material';
import styled from 'styled-components';
import Typography from 'components/Typography/Typography';

const RendtedMovie = () => {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: '#ECEFF1',
        paddingBottom: 0.3,
      }}
      elevation={4}
    >
      <MovieImg src="https://galaxydrivein.com.au/wp-content/uploads/2022/02/ABFCEA5B-4318-4FBB-BC60-E828F210E52C-800x600.jpeg" />
      <Rating
        name="read-only"
        value={4.3}
        precision={0.1}
        defaultValue={0.0}
        size={'small'}
        readOnly
        sx={{ position: 'absolute', top: 5, left: 5 }}
      ></Rating>
      <Typography fontWeight={600} align={'center'} marginTop={0.5}>
        Uncharted
      </Typography>
      <Typography fontSize={12} align={'center'} color={'rgba(0 0 0 / 60%)'}>
        Expires at 22-04-2022
      </Typography>
      <Button
        sx={{
          backgroundColor: '#FFFFFF',
          fontFamily: 'inherit',
          textTransform: 'capitalize',
          marginY: 2,
          display: 'block',
          marginX: 'auto',
        }}
        variant="outlined"
        size={'small'}
      >
        Oglądaj
      </Button>
    </Paper>
  );
};

export default RendtedMovie;

const MovieImg = styled.img`
  max-height: 100px;
  width: 100%;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
  filter: brightness(0.75);
`;
