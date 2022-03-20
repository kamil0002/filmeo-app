/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Button, Grid, Paper, Rating } from '@mui/material';
import moviesData from 'movies-data.json';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';
import ReviewCard from 'components/ReviewCard/ReviewCard';
import { Navigate } from 'react-router-dom';
import axios from 'utils/axios';
import { loadStripe } from '@stripe/stripe-js';
import ReactPlayer from 'react-player';

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
      <MovieTrailer>
        <ReactPlayer
          config={{ youtube: {} }}
          loop={true}
          playing={true}
          playIcon={true}
          volume={0.05}
          width="100%"
          height="100%"
          url="https://www.youtube.com/watch?v=mqqft2x_Aa4"
          controls={false}
        />
      </MovieTrailer>
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
      <RentMovie elevation={14}>
        <img
          src="https://images.savoysystems.co.uk/KGH/9395940.jpg"
          alt="movie-poster"
        />
        <StyledButton onClick={handleRedirectToOrder} variant="contained">
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
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 9vw), 0 100%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% calc(100% - 9vw), 0 100%);
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
`;

const MovieDescription = styled.div`
  padding: 0 0.5rem;
  text-align: center;
  flex-basis: 50%;
  background: #fff;
  padding: 60px 20px 120px;

  @media ${responsive.tablet} {
    width: 50%;
    padding-top: 100px;
    padding-bottom: 80px;
  }

  @media ${responsive.desktop} {
    padding-top: 150px;
  }
`;

const MovieTrailer = styled.div`
  margin-top: calc(0px - 9vw);
  width: 100%;
  height: 85vmin;
  clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);
  -webkit-clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);

  iframe {
    height: 85vmin;
  }

  @media ${responsive.desktop} {
    width: 95vw;
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

const RentMovie = styled(Paper)`
  && {
    width: 80vw;
    margin: 7rem auto;
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
      margin: 10rem auto;
      height: 200px;
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
