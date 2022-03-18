import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, FormControl, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from 'components/Typography/Typography';
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
              id="surname-register"
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
              id="email"
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
            sx={{ alignSelf: 'baseline', marginTop: 3, fontFamily: 'inherit' }}
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
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;

  @media ${responsive.tablet} {
    min-height: calc(100vh - 76px - 70px);
  }
`;

const StyledPaper = styled(Paper)`
  padding: 1rem 2rem;
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
