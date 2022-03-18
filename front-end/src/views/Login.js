/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, FormControl, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from 'components/Typography/Typography';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import responsive from 'theme/responsive';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <Wrapper>
      <StyledPaper elevation={8}>
        <Heading
          fontFamily="Poppins"
          textTransform={'uppercase'}
          fontWeight={700}
        >
          Zaloguj się do swojego konta
        </Heading>
        <Form submitFn={handleSubmit(onSubmit)} buttonText="Zaloguj się">
          <FormInput
            validator={{
              ...register('email', {
                required: true,
                pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
              }),
            }}
            id="email"
            label="Adres E-Mail"
            type="email"
            isValid={errors.email ? true : false}
            helperText="Adres E-mail nie poprawny"
          />
          <FormInput
            validator={{
              ...register('password', {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}/,
              }),
            }}
            id="password"
            label="Hasło"
            type="password"
            isValid={errors.password ? true : false}
            helperText="Hasło musi zawierać dużą oraz małą literę, cyfrę i mieć długość co najmniej 6 znaków"
          />
        </Form>
        {/* <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl required={true} margin="normal">
            <StyledTextField
              error={errors.email ? true : false}
              {...register('email', {
                required: true,
                pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
              })}
              helperText={errors.email ? 'Adres E-mail nie poprawny' : ''}
              id="email"
              label="Adres E-mail"
              type="email"
              autoComplete="off"
              variant="standard"
            />
          </FormControl>
          <FormControl required={true} margin="normal">
            <StyledTextField
              {...register('password', {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}/,
              })}
              error={errors.password ? true : false}
              helperText={
                errors.password
                  ? 'Hasło musi zawierać dużą oraz małą literę, cyfrę i mieć długość co najmniej 6 znaków'
                  : ''
              }
              id="password"
              label="Hasło"
              type="password"
              autoComplete="off"
              variant="standard"
            />
          </FormControl> */}
        {/* <Button
          type="submit"
          sx={{ alignSelf: 'baseline', marginTop: 3, fontFamily: 'Poppins' }}
          variant="contained"
        >
          Zaloguj
        </Button> */}
        {/* </Form> */}
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
  min-height: calc(100vh - 76px - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
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

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  width: 96vw;

  @media ${responsive.mobile} {
    width: 80vw;
  }

  @media ${responsive.mobileM} {
    width: 65vw;
  }

  @media ${responsive.tablet} {
    width: 53vw;
  }

  @media ${responsive.laptop} {
    width: 40vw;
  }

  @media ${responsive.desktop} {
    width: 30vw;
  }
`;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const StyledTextField = styled(TextField)`
//   @media ${responsive.tablet} {
//     width: 350px;
//   }
// `;

const StyledLink = styled(Link)`
  text-decoration: underline;
  margin-left: 0.3rem;
  color: ${({ theme }) => theme.darkBlue};
`;
