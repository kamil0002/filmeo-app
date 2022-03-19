import React from 'react';
import styled from 'styled-components';
import Typography from 'components/Typography/Typography';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import { useForm } from 'react-hook-form';
import responsive from 'theme/responsive';

const UserSettings = () => {
  const {
    register: registerData,
    handleSubmit: handleSubmitData,
    formState: { errors: errors1 },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      name: 'User Name',
      surname: 'User Surname',
      address: 'Rzeszów al. Powstańców Warszawy 3A',
      date: new Date('2000-03-10').toISOString().substr(0, 10),
      email: 'user@example.com',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errors2 },
  } = useForm({ shouldFocusError: false });

  const changeUserData = (data) => {
    console.log(data);
  };

  const changeUserPassword = (data) => console.log(data);

  return (
    <Wrapper>
      <Typography fontSize={24} fontWeight={700}>
        Ustawienia
      </Typography>
      <Typography marginTop={3}>Zmiana danych</Typography>
      <Form
        submitFn={handleSubmitData(changeUserData)}
        buttonText="Zapisz ustawienia"
        buttonType="outlined"
      >
        <FormInput
          settings="true"
          validator={{
            ...registerData('name', {
              required: true,
              minLength: 2,
            }),
          }}
          id="name"
          label="Imię"
          isValid={errors1.name ? true : false}
          helperText="Nie podane imienia"
        />
        <FormInput
          settings="true"
          validator={{
            ...registerData('surname', {
              required: true,
              minLength: 2,
            }),
          }}
          id="surname"
          label="Nazwisko"
          isValid={errors1.surname ? true : false}
          helperText="Nie podane nazwisko"
        />
        <FormInput
          settings="true"
          validator={{
            ...registerData('address', {
              required: true,
              minLength: 2,
            }),
          }}
          id="address"
          label="Adres zamieszkania"
          isValid={errors1.address ? true : false}
          helperText="Nie podane adresu"
        />
        <FormInput
          settings="true"
          validator={{
            ...registerData('date', {
              required: true,
            }),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          id="date"
          label="Data urodzenia"
          type="date"
          isValid={errors1.birthDate ? true : false}
          helperText="Nie podane daty urodzenia"
        />
        <FormInput
          settings="true"
          validator={{
            ...registerData('email', {
              required: true,
              pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
            }),
          }}
          id="email"
          label="Adres E-Mail"
          type="email"
          isValid={errors1.email ? true : false}
          helperText="Adres E-mail nie poprawny"
        />
      </Form>
      <Separator></Separator>
      <Typography marginTop={3}>Zmiana hasła</Typography>
      <Form
        submitFn={handleSubmitPassword(changeUserPassword)}
        buttonText="Zmień hasło"
        buttonType="outlined"
      >
        <FormInput
          validator={{
            ...registerPassword('password', {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}/,
            }),
          }}
          id="actPassword"
          label="Aktualne hasło"
          type="password"
          isValid={errors2.password ? true : false}
          helperText="Hasło musi zawierać dużą oraz małą literę, cyfrę i mieć długość co najmniej 6 znaków"
        />
        <FormInput
          validator={{
            ...registerPassword('password', {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}/,
            }),
          }}
          id="newPassword"
          label="Nowe hasło"
          type="password"
          isValid={errors2.password ? true : false}
          helperText="Hasło musi zawierać dużą oraz małą literę, cyfrę i mieć długość co najmniej 6 znaków"
        />
        <FormInput
          validator={{
            ...registerPassword('password', {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}/,
            }),
          }}
          id="repeatPassword"
          label="Powtórz hasło"
          type="password"
          isValid={errors2.password ? true : false}
          helperText="Hasło musi zawierać dużą oraz małą literę, cyfrę i mieć długość co najmniej 6 znaków"
        />
      </Form>
    </Wrapper>
  );
};

export default UserSettings;

const Wrapper = styled.div`
  margin: auto;
  @media ${responsive.tablet} {
    margin-left: 2rem;
  }
`;

const Separator = styled.div`
  height: 40px;
  width: 100%;
`;
