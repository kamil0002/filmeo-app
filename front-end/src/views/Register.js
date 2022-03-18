import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Paper } from '@mui/material';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import { useForm } from 'react-hook-form';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Wrapper>
      <StyledPaper elevation={8}>
        <Heading>Zarejestruj się!</Heading>
        <Form submitFn={handleSubmit(onSubmit)} buttonText="Załóż konto">
          <FormInput
            validator={{
              ...register('name', {
                required: true,
                minLength: 2,
              }),
            }}
            id="name"
            label="Imię"
            isValid={errors.name ? true : false}
            helperText="Nie podane imienia"
          />
          <FormInput
            validator={{
              ...register('surname', {
                required: true,
                minLength: 2,
              }),
            }}
            id="surname"
            label="Nazwisko"
            isValid={errors.surname ? true : false}
            helperText="Nie podane nazwisko"
          />
          <FormInput
            validator={{
              ...register('address', {
                required: true,
                minLength: 2,
              }),
            }}
            id="address"
            label="Adres zamieszkania"
            isValid={errors.address ? true : false}
            helperText="Nie podane adresu"
          />
          <FormInput
            validator={{
              ...register('birthDate', {
                required: true,
              }),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            id="birthDate"
            label="Data urodzenia"
            type="date"
            isValid={errors.birthDate ? true : false}
            helperText="Nie podane daty urodzenia"
          />
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
