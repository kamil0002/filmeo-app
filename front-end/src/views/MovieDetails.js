/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Grid, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';
import ReviewCard from 'components/ReviewCard/ReviewCard';
import { Navigate } from 'react-router-dom';
import axios from 'utils/axios';
import { loadStripe } from '@stripe/stripe-js';
import moviesData from 'movies-data.json';
import Header from 'components/MovieDetailsHeader/MovieDetailsHeader';
import MovieTrailer from 'components/MovieTrailer/MovieTrailer';

const movie = moviesData.movies[0];

const MovieDetails = () => {
  const [redirectToReviews, setRedirectToReviews] = useState(false);
  const [redirectToOrder, setRedirectToOrder] = useState(false);

  const params = useParams();
  const { search } = useLocation();

  useEffect(async () => {
    if (search.length !== 0) {
      const searchParams = new URLSearchParams(search);

      const userId = searchParams.get('user');
      const movieId = searchParams.get('movie');
      await axios.get(`/rentMovie/${movieId}/${userId}`);
    }
  }, []);

  const handleRedirectToReviews = () => {
    setRedirectToReviews(true);
  };

  const handleRedirectToOrder = () => {
    setRedirectToOrder(true);
  };

  const rentMovie = async (e) => {
    e.preventDefault();
    const stripe = await loadStripe(
      'pk_test_51Kf8hsKYZjL0RBuc6T5sIluifzljkgB78Q4ZVuciIorxA5IbJhZD26wE9LpqDCuslwPyYcIPhlReykc0SmYZFe4V00TqKNhMsE'
    );
    const session = await axios.get(`/getSession/${movie.id}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });
  };

  if (redirectToReviews)
    return <Navigate to={`/film/${params.slug}/dodaj-opinie`} />;

  if (redirectToOrder) return <Navigate to={`/film/${params.slug}/zamow`} />;

  return (
    <Wrapper>
      <Header rentMovieFn={rentMovie} movie={movie} />
      <MovieData>
        <MovieInformationWrapper>
          <Typography
            fontWeight={700}
            align={'center'}
            paddingX={2}
            marginTop={2}
            marginBottom={7}
            fontSize={22}
            color="#1465C0"
            textTransform="uppercase"
          >
            Podstawowe informacje
          </Typography>
          <MovieInformation>
            <img src="/images/movie-genre.png" alt="movie-genre" />
            <MovieInformationText>{movie.genre}</MovieInformationText>
          </MovieInformation>
          <MovieInformation>
            <img src="/images/movie-director.png" alt="movie-director" />
            <MovieInformationText>{movie.director}</MovieInformationText>
          </MovieInformation>
          <MovieInformation>
            <img src="/images/age-limit.png" alt="movie-age-limit" />
            <MovieInformationText>{movie.ageLimit}</MovieInformationText>
          </MovieInformation>
          <MovieInformation>
            <img src="/images/movie-rating.png" alt="movie-rating" />
            <MovieInformationText>{movie.ratingAverage}/5</MovieInformationText>
          </MovieInformation>
          <MovieInfoButton variant="outlined" href={movie.link} target="_blank">
            Więcej informacji
          </MovieInfoButton>
        </MovieInformationWrapper>
        <MovieDescription>
          <Typography
            fontWeight={700}
            align={'center'}
            paddingX={2}
            marginTop={2}
            marginBottom={7}
            fontSize={22}
            color="#1465C0"
            textTransform="uppercase"
          >
            Opis fabuły
          </Typography>
          <Typography>{movie.description}</Typography>
        </MovieDescription>
      </MovieData>
      <MovieTrailer />
      <Reviews>
        <ReviewsHeader
          marginBottom={3.5}
          fontWeight={700}
          paddingX={2}
          marginTop={2}
          fontSize={22}
          color="#1465C0"
          textTransform="uppercase"
        >
          Opinie
        </ReviewsHeader>
        <AddReviewButton variant="outlined" onClick={handleRedirectToReviews}>
          Dodaj Opinię
        </AddReviewButton>
        <GridContainer gridRow={2} container columnSpacing={3} rowSpacing={3}>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <DeleteReviewIcon />
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
          <GridItem item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </GridItem>
        </GridContainer>
      </Reviews>
      <RentMovieWrapper>
        <RentMovie elevation={14}>
          <img
            src="https://images.savoysystems.co.uk/KGH/9395940.jpg"
            alt="movie-poster"
          />
          <StyledButton onClick={handleRedirectToOrder} variant="contained">
            Wypożycz
          </StyledButton>
        </RentMovie>
      </RentMovieWrapper>
    </Wrapper>
  );
};

export default MovieDetails;

const MovieInformation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 230px;
  height: 70px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  img {
    display: block;
    width: 48px;
  }
`;

const MovieInformationText = styled(Typography)`
  && {
    margin-left: 1rem;
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: ${({ theme }) => theme.fontBold};
    color: ${({ theme }) => theme.primaryBlue};
  }
`;

const Wrapper = styled.div`
  @media ${responsive.desktop} {
    width: 95vw;
    margin: auto;
  }
`;

const MovieData = styled.div`
  display: flex;
  margin-top: -9vw;
  flex-direction: column;
  clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);
  -webkit-clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);

  @media ${responsive.tablet} {
    flex-direction: row;
    align-items: stretch;
    justify-content: space-around;
  }
`;
const MovieInformationWrapper = styled.div`
  position: relative;

  background: rgb(230, 230, 230);
  z-index: -1;
  flex-basis: 50%;
  padding-top: 100px;
  padding-bottom: 90px;

  @media ${responsive.tablet} {
    margin-bottom: 0;
    padding-top: 200px;
  }

  @media ${responsive.laptop} {
    padding-bottom: 120px;
  }

  @media ${responsive.desktop} {
    padding-top: 240px;
  }
`;

const MovieInfoButton = styled(Button)`
  && {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 3rem;
    background-color: #fff;
    font-weight: ${({ theme }) => theme.fontBold};

    @media ${responsive.tablet} {
      width: 285px;
      height: 50px;
      font-weight: ${({ theme }) => theme.fontBold};
      font-size: ${({ theme }) => theme.fontSize.m};
    }
  }
`;

const MovieDescription = styled.div`
  padding: 0 0.5rem;
  text-align: center;
  flex-basis: 50%;
  background: #fff;
  padding: 100px 20px 90px;

  @media ${responsive.tablet} {
    width: 50%;
    padding-top: 200px;
  }

  @media ${responsive.desktop} {
    padding-top: 240px;
    padding-bottom: 120px;
    padding-left: 70px;
    padding-right: 70px;
  }
`;

const GridContainer = styled(Grid)`
  && {
    padding: 0;
    justify-content: center;

    @media only screen and (min-width: 600px) {
      padding: 0 0.6rem;
      justify-content: flex-start;
      padding: 0 3rem;
    }
  }
`;

const GridItem = styled(Grid)`
  && {
    position: relative;
    max-width: 275px;
  }
`;

const Reviews = styled.div`
  margin-top: -9vw;
  clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);
  -webkit-clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);
  padding: 10rem 0;
  background: ${({ theme }) => theme.lightBlue};

  @media ${responsive.laptop} {
    padding: 14rem 0;
  }

  @media ${responsive.desktop} {
    padding-top: 15rem;
    padding-bottom: 20rem;
  }
`;

const DeleteReviewIcon = styled(DeleteIcon)`
  && {
    position: absolute;
    right: 2.5%;
    top: 17%;
    cursor: pointer;
    color: #c02020;
  }
`;

const AddReviewButton = styled(Button)`
  && {
    margin-bottom: 2rem;
    margin-left: 3rem;
    background: #fff;
  }
`;

const ReviewsHeader = styled(Typography)`
  && {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-left: 3rem;
    @media ${responsive.tablet} {
      font-size: ${({ theme }) => theme.fontSize.m};
    }
  }
`;

const RentMovieWrapper = styled.div`
  margin-top: -9vw;
  padding-top: 150px;
  padding-bottom: 100px;
  clip-path: polygon(0 9vw, 100% 0, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 9vw, 100% 0, 100% 100%, 0 100%);
  background: ${({ theme }) => theme.secondaryLight};
  display: flex;
  justify-content: center;

  @media ${responsive.tablet} {
    padding-top: 250px;
    padding-bottom: 150px;
  }

  @media ${responsive.desktop} {
    padding-top: 330px;
  }
`;

const RentMovie = styled(Paper)`
  && {
    width: 90vw;
    display: flex;
    position: relative;
    height: 100px;

    img {
      display: block;
      width: 50%;
      height: 100%;
      object-fit: cover;
      display: block;
      position: absolute;
      left: 0;
      border-radius: 4px 0 0 4px;
    }

    @media ${responsive.tablet} {
      height: 200px;
      width: 80vw;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    font-weight: ${({ theme }) => theme.fontBold};

    @media ${responsive.tablet} {
      width: 200px;
      height: 50px;
      font-size: ${({ theme }) => theme.fontSize.m};
    }

    @media ${responsive.laptop} {
      width: 300px;
      height: 70px;
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  }
`;
