import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'utils/axios';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from 'components/Table/Table';

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
  const [users, setUsers] = useState(null);
  const [currentView, setCurrentView] = useState('users');

  useEffect(async () => {
    const movies = await axios.get('/api/v1/movies');
    setMovies(movies.data.data[0]);
    const users = await axios.get('/api/v1/users');
    setUsers(users.data.data[0]);
    console.log(movies, users);
  }, []);

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
      {users?.length > 0 &&
        movies?.length > 0 &&
        (currentView === 'users' ? (
          <Table dataType="users" rows={users} headings={usersHeadings} />
        ) : (
          <Table dataType="movies" rows={movies} headings={moviesHeadings} />
        ))}
    </Wrapper>
  );
};

const Wrapper = styled(Paper)`
  position: fixed;
  margin-top: 38px;
  min-width: 90vw;
  min-height: 90vh;
  top: 50%;
  right: 2%;
  left: 2%;
  transform: translateY(-50%);
  z-index: 1000;
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
    margin: 3rem auto;
  }
`;

export default DbData;

DbData.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
