import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, FormControl, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import responsive from 'theme/responsive';

const Register = () => {
  return (
    <Wrapper>
      <StyledPaper elevation={8}>
        <Heading>Zarejestruj się!</Heading>
        <Form>
          <FormControl required={true} margin="normal">
            <StyledTextField
              id="name"
              label="Imię"
              type="text"
              autoComplete="off"
              variant="standard"
            />
          </FormControl>
          <FormControl required={true} margin="normal">
            <StyledTextField
              id="surname"
              label="Nazwisko"
              type="text"
              autoComplete="off"
              variant="standard"
            />
          </FormControl>
          <FormControl required={true} margin="normal">
            <StyledTextField
              id="address"
              label="Adres zamieszkania"
              type="text"
              autoComplete="off"
              variant="standard"
            />
          </FormControl>
          <FormControl required={true} margin="normal">
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
          <FormControl required={true} margin="normal">
            <StyledTextField
              id="email-address"
              label="Adres E-Mail"
              type="email"
              autoComplete="off"
              variant="standard"
            />
          </FormControl>
          <FormControl required={true} margin="normal">
            <StyledTextField
              id="password"
              label="Hasło"
              type="password"
              autoComplete="off"
              variant="standard"
            />
          </FormControl>
          <Button
            sx={{ alignSelf: 'baseline', marginTop: 3 }}
            variant="contained"
          >
            Załóż konto
          </Button>
        </Form>
        <Typography marginTop={5} fontSize={13}>
          Masz już konto?
          <StyledLink to="/logowanie">Zaloguj się!</StyledLink>
        </Typography>
      </StyledPaper>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  height: calc(100vh - 70px);

  @media ${responsive.tablet} {
    height: calc(100vh - 76px - 70px);
  }
`;

const StyledPaper = styled(Paper)`
  position: fixed;
  padding: 1rem 2rem;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 96vw;

  @media ${responsive.tablet} {
    width: 50vw;
  }

  @media ${responsive.desktop} {
    width: 30vw;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  height: 37px;
  @media ${responsive.tablet} {
    width: 350px;
    height: auto;
  }
`;

const Heading = styled(Typography)`
  && {
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontBold};

    @media ${responsive.tablet} {
      font-size: ${({ theme }) => theme.fontSize.m};
    }

    @media ${responsive.desktop} {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  margin-left: 0.3rem;
  color: ${({ theme }) => theme.darkBlue};
`;
