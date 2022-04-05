/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Paper, Rating } from '@mui/material';
import styled from 'styled-components';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';

const RentedMovieCard = ({
  title,
  expireDate,
  poster,
  rating,
  slug,
  active,
  rentalId,
}) => {
  const [redirectToMovie, setRedirectToMovie] = useState(false);

  return (
    <StyledPaper elevation={4}>
      {!active && <Overlay></Overlay>}
      <MovieImg src={`http://127.0.0.1:8000/images/movies/${poster}`} />
      <StyledRating
        name="read-only"
        value={rating}
        precision={0.1}
        defaultValue={0.0}
        size={'small'}
        readOnly
      ></StyledRating>
      <Typography fontWeight={600} align={'center'} marginTop={0.5}>
        {title}
      </Typography>
      {active ? (
        <>
          <Typography
            fontSize={12}
            align={'center'}
            color={'rgba(0 0 0 / 60%)'}
          >
            Wygasa
          </Typography>
          <Typography
            fontSize={12}
            align={'center'}
            color={'rgba(0 0 0 / 60%)'}
          >
            {expireDate}
          </Typography>
        </>
      ) : (
        <Typography fontSize={12} align={'center'} color={'rgba(0 0 0 / 60%)'}>
          Film wygasł
        </Typography>
      )}
      {active ? (
        <StyledButton
          variant="outlined"
          size={'small'}
          onClick={() => setRedirectToMovie(true)}
          LinkComponent={Link}
          to={`/film/${rentalId}/${slug}/ogladaj`}
        >
          Oglądaj
        </StyledButton>
      ) : (
        <StyledButton variant="outlined" size={'small'}>
          Odnów
        </StyledButton>
      )}
    </StyledPaper>
  );
};

export default RentedMovieCard;

const MovieImg = styled.img`
  max-height: 100px;
  width: 100%;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
  filter: brightness(0.75);
`;

const StyledPaper = styled(Paper)`
  && {
    background-color: ${({ theme }) => theme.primaryLight};

    position: relative;
    padding-bottom: 3.3rem;
    height: 100%;
  }
`;

const Overlay = styled.span`
  position: absolute;
  inset: 0;
  z-index: 5;
  border-radius: 4px;
  overflow: hidden;

  &::after {
    content: 'Expired';
    transform: rotate(45deg);
    position: absolute;
    background: red;

    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.darkGray};
    font-weight: ${({ theme }) => theme.fontBold};
    padding: 1px 40px;
    right: -35px;
    top: 15px;
    width: min-content;
    text-align: center;
    background: ${({ theme }) => theme.primaryLight};
    z-index: 30;
  }
`;

const StyledRating = styled(Rating)`
  && {
    z-index: 6;
    position: absolute;
    left: 4%;
    top: 4%;
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.secondaryLight};
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translateX(-50%);
    font-family: inherit;
    text-transform: capitalize;
    display: block;
    z-index: 10;
  }
`;

RentedMovieCard.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  expireDate: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  rentalId: PropTypes.number.isRequired,
};
