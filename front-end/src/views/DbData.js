/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'utils/axios';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from 'components/Table/Table';
import responsive from 'theme/responsive';

const moviesHeadings = [
  'ID',
  'Tytuł',
  'Limit wieku',
  'Krótki opis',
  'Opis',
  'Reżyser',
  'Data wydania',
  'Czas trwania',
  'URL Filmu',
  'URL zwiastuna',
  'URL szczegółów',
  'Liczba wypożyczeń',
  'Ilość ocen',
  'Koszt',
];

const usersHeadings = [
  'ID',
  'Imię',
  'Nazwisko',
  'Rola',
  'Zbanowany',
  'Zmutowany',
  'Adres',
  'Data urodzenia',
  'Email',
];

const DbData = ({ handleClose }) => {
  const [movies, setMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [currentView, setCurrentView] = useState('users');
  const [searchedUser, setSearchedUser] = useState('');
  const [searchedMovie, setSearchedMovie] = useState('');

  useEffect(async () => {
    const movies = await axios.get('/api/v1/movies');
    setMovies(movies.data.data[0]);
    setFilteredMovies(movies.data.data[0]);
    const users = await axios.get('/api/v1/users');
    setUsers(users.data.data[0]);
    setFilteredUsers(users.data.data[0]);
  }, []);

  const handleUserSearch = (text) => {
    if (!text) {
      setFilteredUsers(users);
    } else
      setFilteredUsers(
        users.filter((user) =>
          user.surname.toLowerCase().includes(text.toLowerCase())
        )
      );
  };

  const handleMovieSearch = (text) => {
    if (!text) {
      setFilteredMovies(movies);
    } else
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(text.toLowerCase())
        )
      );
  };

  return (
    <Wrapper>
      <FormWrapper>
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ textAlign: 'center' }}
          >
            Dane do wyświetlania
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setCurrentView(e.target.value)}
          >
            <FormControlLabel
              value="users"
              control={<Radio checked={currentView === 'users'} />}
              label="Użytkownicy"
            />
            <FormControlLabel
              value="movies"
              control={<Radio checked={currentView === 'movies'} />}
              label="Filmy"
            />
          </RadioGroup>
        </FormControl>
      </FormWrapper>
      <Close onClick={handleClose} />
      <ContentWrapper>
        {currentView === 'users' && (
          <Form>
            <TextField
              variant="standard"
              sx={{ width: '200px', marginLeft: 4 }}
              id="name"
              label="Nazwisko użytkownika"
              value={searchedUser}
              onChange={(e) => {
                setSearchedUser(e.target.value);
                handleUserSearch(e.target.value);
              }}
            />
          </Form>
        )}
        {currentView === 'movies' && (
          <Form>
            <TextField
              variant="standard"
              sx={{ width: '200px', marginLeft: 4 }}
              id="name"
              label="Nazwa filmu"
              value={searchedMovie}
              onChange={(e) => {
                setSearchedMovie(e.target.value);
                handleMovieSearch(e.target.value);
              }}
            />
          </Form>
        )}
        {filteredUsers?.length > 0 &&
          filteredMovies?.length > 0 &&
          (currentView === 'users' ? (
            <Table
              dataType="users"
              rows={filteredUsers}
              headings={usersHeadings}
            />
          ) : (
            <Table
              dataType="movies"
              rows={filteredMovies}
              headings={moviesHeadings}
            />
          ))}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: calc(100vh - 76px);
  position: relative;
  z-index: 1000;
`;

const ContentWrapper = styled.div``;

const Form = styled.form`
  width: 90vw;
  margin: 0.6rem auto 1.6rem auto;

  @media ${responsive.tablet} {
    margin-top: 0;
  }
`;

const Close = styled(CloseIcon)`
  position: absolute;
  right: 2%;
  top: 2%;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  && {
    display: flex;
    justify-content: center;
    padding-top: 3.5rem;
  }
`;

export default DbData;

DbData.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
