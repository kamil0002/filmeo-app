/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Button, Grid, Rating } from '@mui/material';
import moviesData from 'movies-data.json';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';
import ReviewCard from 'components/ReviewCard/ReviewCard';
import { Navigate } from 'react-router-dom';
import axios from 'utils/axios';
import { loadStripe } from '@stripe/stripe-js';
import YouTube from 'react-youtube';

const movie = moviesData.movies[0];

const MovieDetails = () => {
  const [redirectToReviews, setRedirectToReviews] = useState(false);
  const [redirectToOrder, setRedirectToOrder] = useState(false);

  const params = useParams();

  const handleRedirectToReviews = () => {
    setRedirectToReviews(true);
  };

  const handleRedirectToOrder = () => {
    setRedirectToOrder(true);
  };

  const orderMovie = async (e) => {
    e.preventDefault();
    const stripe = await loadStripe(
      'pk_test_51Kf8hsKYZjL0RBuc6T5sIluifzljkgB78Q4ZVuciIorxA5IbJhZD26wE9LpqDCuslwPyYcIPhlReykc0SmYZFe4V00TqKNhMsE'
    );
    console.log(movie.id);
    const session = await axios.get(`/getSession/${movie.id}`);
    console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });
  };

  if (redirectToReviews)
    return <Navigate to={`/film/${params.slug}/dodaj-opinie`} />;

  if (redirectToOrder) return <Navigate to={`/film/${params.slug}/zamow`} />;

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header>
          <MovieTitle>Uncharted</MovieTitle>
          <MovieHeaderInfo>
            <Time>
              <MovieTime></MovieTime>
              <Typography fontWeight={700} color={'#fff'} fontSize={24}>
                186m
              </Typography>
            </Time>
            <ReleaseDate>
              <MovieReleaseDate></MovieReleaseDate>
              <Typography fontWeight={700} color={'#fff'} fontSize={24}>
                2022
              </Typography>
            </ReleaseDate>
          </MovieHeaderInfo>
          <MovieCost>
            <MovieCostIcon></MovieCostIcon>
            <Typography fontWeight={700} color={'#fff'} fontSize={24}>
              10zł/7 dni
            </Typography>
          </MovieCost>
          <HeaderAction>
            <HeaderButton onClick={orderMovie} variant="contained">
              Zamów teraz!
            </HeaderButton>
          </HeaderAction>
          <HeaderImage src={movie.poster} />
          <ImageOverlay></ImageOverlay>
        </Header>
      </HeaderWrapper>
      <MovieData>
        <MovieInformationWrapper>
          <Typography
            fontWeight={700}
            align={'center'}
            marginBottom={7}
            fontSize={24}
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
          <Typography marginBottom={3.5} fontWeight="bold">
            Opis
          </Typography>
          <Typography>{movie.description}</Typography>
        </MovieDescription>
      </MovieData>
      <MovieTrailer>
        <MovieTrailerHeader>Zobacz zwiastun</MovieTrailerHeader>
        <YouTube videoId="u34gHaRiBIU" />
      </MovieTrailer>
      <Reviews>
        <ReviewsHeader marginBottom={3.5} fontWeight="bold">
          Opinie
        </ReviewsHeader>
        <Button
          sx={{ backgroundColor: '#fff', marginBottom: 4, marginLeft: 6 }}
          variant="outlined"
          onClick={handleRedirectToReviews}
        >
          Dodaj Opinię
        </Button>
        <GridContainer container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard profile={false} />
          </Grid>
        </GridContainer>
      </Reviews>
      <RentMovie>
        <StyledTypography fontWeight={700}>
          Nie czekaj. Oglądaj już teraz!
        </StyledTypography>
        <StyledButton
          onClick={handleRedirectToOrder}
          size="large"
          variant="contained"
        >
          Wypożycz
        </StyledButton>
      </RentMovie>
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

const HeaderWrapper = styled.div`
  width: 100%;
  height: 75vh;
  position: relative;
`;

const Header = styled.div`
  position: absolute;
  inset: 0;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 25%;
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
  z-index: -1;
`;

const ImageOverlay = styled.div`
  background: rgb(67, 65, 88);
  background: linear-gradient(
    90deg,
    rgba(67, 65, 88, 0.6674019949776786) 0%,
    rgba(63, 63, 133, 0.6786064767703957) 35%,
    rgba(47, 133, 150, 0.6505952722886029) 100%
  );
  position: absolute;
  inset: 0;
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
  height: 100%;
`;

const MovieTitle = styled(Typography)`
  && {
    color: ${({ theme }) => theme.secondaryLight};
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 10%;
    text-decoration: underline;
    transform: translateX(-50%);
    font-size: ${({ theme }) => theme.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.fontBold};
  }
`;

const MovieHeaderInfo = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  z-index: 2;
  display: flex;
  justify-content: space-around;

  @media ${responsive.tablet} {
    width: 500px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Time = styled.div`
  display: flex;
  align-items: center;
`;

const MovieTime = styled(AccessTimeOutlinedIcon)`
  && {
    color: #85b6ff;
    font-size: 2.5rem;
    margin-right: 0.4rem;
  }
`;

const ReleaseDate = styled.div`
  display: flex;
  align-items: center;
`;

const MovieReleaseDate = styled(CalendarMonthIcon)`
  && {
    color: #85b6ff;
    font-size: 2.5rem;
    margin-right: 0.4rem;
  }
`;

const MovieCost = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 45%;
  transform: translateX(-50);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MovieCostIcon = styled(AttachMoneyIcon)`
  && {
    color: #85b6ff;
    font-size: 2.5rem;
    margin-right: 0.4rem;
  }
`;

const HeaderAction = styled.div`
  position: absolute;
  top: 60%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 2;
`;

const HeaderButton = styled(Button)`
  && {
    font-family: 'Poppins';

    @media ${responsive.tablet} {
      font-size: ${({ theme }) => theme.fontSize.m};
    }
  }
`;

const MovieData = styled.div`
  display: flex;
  margin-top: -400px;
  flex-direction: column;

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
  padding-top: 420px;
  padding-bottom: 50px;

  @media ${responsive.tablet} {
    margin-bottom: 0;
    padding-top: 500px;
  }
`;

const MovieDescription = styled.div`
  padding: 0 0.5rem;
  text-align: center;
  flex-basis: 50%;
  background: #fff;
  padding: 60px 20px;

  @media ${responsive.tablet} {
    width: 50%;
    padding-top: 500px;
  }
`;

const MovieTrailer = styled.div`
  margin: 4rem auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80vw;

  iframe {
    height: 350px;
    width: 80vw;
    -webkit-box-shadow: 8px 8px 35px 1px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 8px 8px 35px 1px rgba(0, 0, 0, 0.6);
    box-shadow: 8px 8px 35px 1px rgba(0, 0, 0, 0.6);

    @media ${responsive.laptop} {
      height: 600px;
    }

    @media ${responsive.desktop} {
      height: 750px;
    }
  }
`;

const Reviews = styled.div`
  margin-top: 5rem;
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

const MovieTrailerHeader = styled(ReviewsHeader)`
  && {
    margin-bottom: 1.5rem;
    font-weight: ${({ theme }) => theme.fontBold};

    @media ${responsive.laptop} {
      font-size: ${({ theme }) => theme.fontSize['2xl']};
      margin: 5rem 0;
    }
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

const MovieInfoButton = styled(Button)`
  && {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 3rem;
    background-color: '#FFF';
    font-weight: ${({ theme }) => theme.fontBold};

    @media ${responsive.tablet} {
      width: 285px;
      height: 50px;
      font-weight: ${({ theme }) => theme.fontBold};
      font-size: ${({ theme }) => theme.fontSize.m};
    }
  }
`;

const RentMovie = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0;
  justify-content: space-between;
  align-items: center;
  height: 100px;

  @media ${responsive.tablet} {
    margin-bottom: 8rem;
  }
`;

const StyledTypography = styled(Typography)`
  && {
    font-weight: ${({ theme }) => theme.fontBold};

    @media ${responsive.tablet} {
      font-size: ${({ theme }) => theme.fontSize.xl};
      margin-bottom: 2rem;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    font-weight: ${({ theme }) => theme.fontBold};

    @media ${responsive.tablet} {
      font-size: ${({ theme }) => theme.fontSize.xl};
      width: 320px;
      height: 70px;
    }
  }
`;
