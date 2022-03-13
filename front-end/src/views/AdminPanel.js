import React, { useState } from 'react';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';

const AdminPanel = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedReview, setSelectedReview] = useState('');

  return (
    <>
      <Typography fontWeight={700}>Panel Admina</Typography>
      <Form>
        <Typography marginTop={3}>Usuwanie Filmów</Typography>
        <FormControl sx={{ marginY: 2 }}>
          <InputLabel id="movie">Film</InputLabel>
          <Select
            sx={{ width: 200 }}
            labelId="movie"
            id="movie-select"
            value={selectedMovie}
            label="Film"
            onChange={(e) => setSelectedMovie(e.target.value)}
          >
            <MenuItem value={'Uncharted'}>Uncharted</MenuItem>
            <MenuItem value={'The Batman'}>The Batman</MenuItem>
            <MenuItem value={'Sing 2'}>Sing 2</MenuItem>
          </Select>
        </FormControl>
        <StyledButton
          sx={{ alignSelf: 'baseline', fontFamily: 'Poppins' }}
          variant="outlined"
        >
          Usuń film
        </StyledButton>
        <Typography
          color="#C02020"
          sx={{ marginTop: 2, fontWeight: 600, fontSize: 11 }}
        >
          Uwaga! Film zostanie usunięty łącznie z wszystkimi wypożyczeniami oraz
          recenzjami!
        </Typography>
      </Form>
      <Form>
        <Typography marginTop={3}>Usuń opinię</Typography>
        <FormControl margin="none">
          <StyledTextField
            id="email"
            label="E-Mail Użytkownika"
            type="email"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <StyledButton
          sx={{ alignSelf: 'baseline', marginTop: 3, fontFamily: 'Poppins' }}
          variant="outlined"
        >
          Szukaj
        </StyledButton>
        <FormControl sx={{ marginY: 3 }}>
          <InputLabel id="review">Opinie</InputLabel>
          <Select
            sx={{ width: 200 }}
            labelId="review"
            id="user-reviews"
            value={selectedReview}
            label="Opinie"
            onChange={(e) => setSelectedReview(e.target.value)}
            disabled
          >
            <MenuItem value={'Uncharted'}>Recenzja 1...</MenuItem>
            <MenuItem value={'The Batman'}>Recenzja 2...</MenuItem>
            <MenuItem value={'Sing 2'}>Recenzja 3...</MenuItem>
          </Select>
        </FormControl>
        <StyledButton
          sx={{ alignSelf: 'baseline', fontFamily: 'Poppins' }}
          variant="outlined"
          disabled
        >
          Usuń
        </StyledButton>
      </Form>
      <Form>
        <Typography marginTop={5}>Zablokuj użytkownika</Typography>
        <FormControl sx={{ marginY: 1 }}>
          <StyledTextField
            id="email"
            label="E-Mail Użytkownika"
            type="email"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <StyledButton
          sx={{ alignSelf: 'baseline', fontFamily: 'Poppins', marginTop: 2 }}
          variant="outlined"
        >
          Zablokuj
        </StyledButton>
      </Form>
    </>
  );
};

export default AdminPanel;

const Form = styled.form`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;

  &:not(:nth-of-type(0)) {
    margin-top: 2rem;
  }
`;

const StyledButton = styled(Button)`
  && {
    font-size: ${({ theme }) => theme.fontSize.xs};

    @media ${responsive.mobile} {
      font-size: ${({ theme }) => theme.fontSize.s};
    }
  }
`;

const StyledTextField = styled(TextField)`
  @media ${responsive.tablet} {
    width: 350px;
  }

  @media ${responsive.laptop} {
    width: 425px;
  }
  @media ${responsive.desktop} {
    width: 550px;
  }
`;
