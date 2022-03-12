import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, FormControl, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import responsive from 'theme/responsive';

const Login = () => {
  return (
    <Wrapper>
      <StyledPaper elevation={8}>
        <Typography
          fontFamily="Poppins"
          textTransform={'uppercase'}
          fontWeight={700}
        >
          Zaloguj się do swojego konta
        </Typography>
        <form>
          <FormControl required={true} margin="normal">
            <StyledTextField
              id="email"
              label="Adres E-mail"
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
            sx={{ alignSelf: 'baseline', marginTop: 3, fontFamily: 'Poppins' }}
            variant="contained"
          >
            Zaloguj
          </Button>
        </form>
        <Typography fontFamily="Poppins" marginTop={5} fontSize={13}>
          Nie masz jeszcze konta?
          <StyledLink to="/rejestracja">Załóż konto!</StyledLink>
        </Typography>
      </StyledPaper>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  height: calc(100vh - 76px - 70px);
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 1rem 2rem;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 96vw;

  @media ${responsive.tablet} {
    width: 40vw;
  }

  @media ${responsive.desktop} {
    width: 30vw;
  }
`;

const StyledTextField = styled(TextField)`
  @media ${responsive.tablet} {
    width: 350px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  margin-left: 0.3rem;
  color: ${({ theme }) => theme.darkBlue};
`;
