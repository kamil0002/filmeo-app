import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Spinner from 'components/Spinner/Spinner';
import Typography from 'components/Typography/Typography';
import RentedMovie from 'components/RentedMovieCard/RentedMovieCard';
import responsive from 'theme/responsive';
import axios from 'axios';
import { FormControlLabel, Switch } from '@mui/material';
import { TextField } from '@mui/material';

const UserMovies = () => {
  const [rentedMovies, setRentedMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [showExpired, setShowExpired] = useState(true);
  const [searchText, setSearchText] = useState('');
  const user = useSelector((state) => state.auth.user);

  const handleMoviesDisplay = () => {
    setShowExpired(!showExpired);

    const movies = rentedMovies.filter(
      (movie) => movie.active || movie.active === showExpired
    );

    setFilteredMovies(movies);
  };

  const handleMoviesSearch = (text) => {
    if (!text) {
      setFilteredMovies(rentedMovies);
      setShowExpired(true);
    } else
      setFilteredMovies((prevState) =>
        prevState.filter((movie) =>
          movie.title.toLowerCase().includes(text.toLowerCase())
        )
      );
  };

  useEffect(async () => {
    try {
      setSpinnerVisible(true);
      const {
        data: { data: movies },
      } = await axios.get('/api/v1/rentals/myRentals');
      setSpinnerVisible(false);
      if (!movies) return;
      setRentedMovies(movies[0]);
      setFilteredMovies(movies[0]);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <Wrapper>
      <Typography fontSize={24} fontWeight={700}>
        Wypożyczone Filmy
      </Typography>
      <NavWrapper>
        <FormControlLabel
          control={
            <Switch
              checked={showExpired}
              onChange={handleMoviesDisplay}
              name="expired rentals"
            />
          }
          label="Pokaż wygaśnięte"
        />
        {user && user?.role !== 'administrator' && (
          <Form>
            <TextField
              variant="standard"
              sx={{ width: '150px' }}
              id="name"
              label="Nazwa"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                handleMoviesSearch(e.target.value);
              }}
            />
          </Form>
        )}
      </NavWrapper>
      {spinnerVisible && <Spinner />}
      {filteredMovies && (
        <GridContainer container columnSpacing={3} rowSpacing={3}>
          {filteredMovies.length === 0 && (
            <Typography marginLeft={3}>
              Nic jeszcze nie wypożyczyłeś!
            </Typography>
          )}
          {filteredMovies.map(
            ({
              id,
              title,
              slug,
              poster,
              rental_id,
              rating_average,
              expire_date,
            }) => (
              <GridItem
                key={rental_id}
                item
                xs={10}
                sm={6}
                md={4}
                lg={3.5}
                xl={2.75}
              >
                <RentedMovie
                  title={title}
                  slug={slug}
                  expireDate={expire_date}
                  poster={poster}
                  rentalId={rental_id}
                  movieId={id}
                  rating={rating_average}
                  active={new Date(expire_date) > Date.now() ? true : false}
                />
              </GridItem>
            )
          )}
        </GridContainer>
      )}
    </Wrapper>
  );
};

export default UserMovies;

const Wrapper = styled.div`
  height: 900px;
  overflow-y: scroll;
  padding: 0.7rem 0;

  &::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
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

const GridItem = styled(Grid)`
  && {
    max-width: 250px;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;

  @media ${responsive.tablet} {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }
`;

const Form = styled.form`
  margin-bottom: 1.6rem;
  margin-top: 0.6rem;

  @media ${responsive.tablet} {
    margin-left: 3rem;
    margin-top: 0;
  }
`;
