/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Button, CardActionArea, CardActions } from '@mui/material';

const MovieCardItem = ({
  title,
  genre,
  poster,
  ratingAverage,
  ratingQuantity,
  description,
  releaseDate,
  time,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 270,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}
      elevation={8}
    >
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
            marginBottom={0}
          >
            {`${title} (${releaseDate})`}
          </Typography>
          <Typography
            color="text.secondary"
            marginBottom={3}
          >{`${genre}, ${time}m`}</Typography>
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
      <CardActions
        sx={{
          justifyContent: 'space-between',
          alignSelf: 'flex-end',
          width: '100%',
        }}
      >
        <RatingWrapper>
          <Rating
            sx={{ zIndex: 100 }}
            readOnly
            value={ratingAverage}
            precision={0.1}
            defaultValue={0.0}
            size="small"
          />
          <Typography
            fontWeight={500}
            color="#3A3D42"
            fontSize={12}
            sx={{ zIndex: 100 }}
            fontFamily="Poppins"
            marginLeft={1}
          >
            {`(${ratingQuantity})`}
          </Typography>
        </RatingWrapper>
        <Button sx={{ fontFamily: 'inherit' }} size="small" color="primary">
          Więcej
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCardItem;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

MovieCardItem.protoTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ratingAverage: PropTypes.number.isRequired,
  ratingQuantity: PropTypes.number.isRequired,
  releaseDate: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};
