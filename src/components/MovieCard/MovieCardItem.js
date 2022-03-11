/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const MovieCardItem = ({
  title,
  genre,
  poster,
  ratingAverage,
  ratingQuantity,
  description,
}) => {
  return (
    <Card sx={{ maxWidth: 250 }} elevation={8}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={poster} alt={title} />
        <CardContent>
          <Typography
            fontFamily="Poppins"
            gutterBottom
            color="#040714"
            variant="h5"
            component="div"
            fontWeight={700}
          >
            {title}
          </Typography>
          <Typography
            fontFamily="Poppins"
            fontSize={13}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button sx={{ fontFamily: 'inherit' }} size="small" color="primary">
          Więcej
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCardItem;

MovieCardItem.protoTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ratingAverage: PropTypes.number.isRequired,
  ratingQuantity: PropTypes.number.isRequired,
};
