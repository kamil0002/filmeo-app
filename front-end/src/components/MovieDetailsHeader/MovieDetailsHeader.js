import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';

const MovieDetailsHeader = ({ rentMovieFn, movie }) => {
  return (
    <Wrapper>
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
          <HeaderButton onClick={rentMovieFn} variant="contained">
            Zamów teraz!
          </HeaderButton>
        </HeaderAction>
        <HeaderImage src={movie.poster} />
        <ImageOverlay></ImageOverlay>
      </Header>
    </Wrapper>
  );
};

export default MovieDetailsHeader;

const Wrapper = styled.div`
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

MovieDetailsHeader.propTypes = {
  rentMovieFn: PropTypes.func.isRequired,
  movie: PropTypes.object,
};
