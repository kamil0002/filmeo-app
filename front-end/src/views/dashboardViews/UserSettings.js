import React from 'react';
import styled from 'styled-components';
import Typography from 'components/Typography/Typography';
import { Button, FormControl, TextField } from '@mui/material';
import responsive from 'theme/responsive';

const UserSettings = () => {
  return (
    <>
      <Typography fontWeight={700}>Ustawienia</Typography>
      <Form>
        <Typography marginTop={3}>Dane użytkownika</Typography>
        <FormControl margin="normal">
          <StyledTextField
            id="name"
            label="Imię"
            type="text"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl margin="normal">
          <StyledTextField
            id="surname"
            label="Nazwisko"
            type="text"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl margin="normal">
          <StyledTextField
            id="addres"
            label="Adres zamieszkania"
            type="text"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl margin="normal">
          <StyledTextField
            id="email"
            label="Adres E-mail"
            type="email"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl margin="normal">
          <StyledTextField
            id="surname"
            label="Nazwisko"
            type="text"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl margin="normal">
          <StyledTextField
            id="birth-date"
            label="Data urodzenia"
            InputLabelProps={{
              shrink: true,
            }}
            type="date"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <StyledButton
          sx={{ alignSelf: 'baseline', marginTop: 3, fontFamily: 'Poppins' }}
          variant="outlined"
        >
          Zapisz ustawienia
        </StyledButton>
      </Form>
      <Form>
        <Typography marginTop={3}>Zmiana hasła</Typography>
        <FormControl margin="normal">
          <StyledTextField
            id="current_password"
            label="Aktualne hasło"
            type="password"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl margin="normal">
          <StyledTextField
            id="new_password"
            label="Nowe hasło"
            type="password"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl margin="normal">
          <StyledTextField
            id="confirm_password"
            label="Potwierdź hasło"
            type="password"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <StyledButton
          sx={{ alignSelf: 'baseline', marginTop: 3, fontFamily: 'Poppins' }}
          variant="outlined"
        >
          Zmień hasło
        </StyledButton>
      </Form>
    </>
  );
};

export default UserSettings;

const StyledButton = styled(Button)`
  && {
    font-size: ${({ theme }) => theme.fontSize.xs};

    @media ${responsive.mobile} {
      font-size: ${({ theme }) => theme.fontSize.s};
    }
  }
`;

const Form = styled.form`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;

  &:nth-of-type(2) {
    margin-top: 1.5rem;
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
