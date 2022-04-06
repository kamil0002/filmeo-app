/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import { useForm } from 'react-hook-form';
import axios from 'utils/axios';
import Alert from 'components/Alert/Alert';
import clearAsyncMessages from 'utils/clearAsyncMessages';

const AdminPanel = () => {
  const [processingUserBan, setProcessingUserBan] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errMessage, setErrMessage] = useState();
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectUnban, setSelectUnban] = useState('');
  const [deleteMod, setDeleteMod] = useState('');
  const [bannedUsers, setBannedUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moderators, setModerators] = useState([]);

  useEffect(async () => {
    try {
      const users = await axios.get('/api/v1/users');

      const bannedUsers = users.data.data[0]
        .filter((user) => user.banned === 1)
        .map((user) => ({
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
        }));
      setBannedUsers(bannedUsers);

      const movies = await axios.get('/api/v1/movies');
      setMovies(movies.data.data[0]);

      const moderators = await axios.get('/api/v1/users?moderators=true');
      setModerators(moderators.data.data[0]);
      console.log(moderators.data.data[0]);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const {
    register: registerUserBlock,
    handleSubmit: handleSubmitUserBlock,
    formState: { errors: errors1 },
  } = useForm({ shouldFocusError: false });

  const {
    register: registerAddModerator,
    handleSubmit: handleSubmitAddModerator,
    formState: { errors: errors2 },
  } = useForm({ shouldFocusError: false });

  const blockUser = async (data) => {
    try {
      setProcessingUserBan(true);
      await axios.put('/api/v1/admin/ban', data);
      setSuccessMessage(
        `Użytkownik o adresie email ${data.email} został zbanowany`
      );
    } catch (err) {
      setErrMessage(err.message);
    } finally {
      clearAsyncMessages(
        setSuccessMessage,
        setErrMessage,
        setProcessingUserBan
      );
    }
  };

  const addModerator = (data) => console.log(data);

  return (
    <>
      {errMessage && <Alert>{errMessage}</Alert>}
      {successMessage && <Alert type="success">{successMessage}</Alert>}
      <Typography fontWeight={700}>Panel Admina</Typography>
      <StyledForm>
        <Typography marginTop={3}>Usuwanie Filmów</Typography>
        <FormControl sx={{ marginY: 2 }}>
          <InputLabel id="movie">Film</InputLabel>
          <StyledSelect
            labelId="movie"
            id="movie-select"
            value={selectedMovie}
            label="Film"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
            onChange={(e) => setSelectedMovie(e.target.value)}
          >
            {movies.map((movie) => (
              <MenuItem key={movie.id} value={movie.id}>
                {movie.title}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <StyledButton variant="outlined">Usuń film</StyledButton>
        <Typography
          color="#C02020"
          sx={{ marginTop: 2, fontWeight: 600, fontSize: 11 }}
        >
          Uwaga! Film zostanie usunięty łącznie z wszystkimi wypożyczeniami oraz
          recenzjami!
        </Typography>
      </StyledForm>
      <BlockUserWrapper>
        <Typography marginTop={3}>Zablokuj użytkownika</Typography>
        <Form
          submitFn={handleSubmitUserBlock(blockUser)}
          buttonText="Wykonaj"
          buttonType="outlined"
          spinnerDark={true}
          processing={processingUserBan}
        >
          <FormInput
            validator={{
              ...registerUserBlock('email', {
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
      </BlockUserWrapper>
      <UnblockUserWrapper>
        <Typography marginTop={3} marginBottom={3}>
          Odblokuj użytkownika
        </Typography>
        <FormControl>
          <InputLabel id="blocked-user">Wybierz</InputLabel>

          <StyledSelect
            labelId="blocked-user"
            id="blocked-users"
            value={selectUnban}
            label="Wybierz"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
            onChange={(e) => setSelectUnban(e.target.value)}
          >
            {bannedUsers.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name} {user.surname} ({user.email})
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <StyledButton sx={{ marginTop: 2 }} variant="outlined">
          Wykonaj
        </StyledButton>
      </UnblockUserWrapper>
      <AddModeratorWrapper>
        <Typography marginTop={3}>Dodaj moderatora</Typography>
        <Form
          submitFn={handleSubmitAddModerator(addModerator)}
          buttonText="Dodaj"
          buttonType="outlined"
        >
          <FormInput
            validator={{
              ...registerAddModerator('email', {
                required: true,
                pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
              }),
            }}
            id="email"
            label="Adres E-Mail"
            type="email"
            isValid={errors2.email ? true : false}
            helperText="Adres E-mail nie poprawny"
          />
        </Form>
      </AddModeratorWrapper>
      <DeleteModeratorWrapper>
        <Typography marginTop={3} marginBottom={3}>
          Usuń moderatora
        </Typography>
        <FormControl>
          <InputLabel id="moderators">Wybierz</InputLabel>

          <StyledSelect
            labelId="moderator"
            id="modeerator"
            value={deleteMod}
            label="Wybierz"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
            onChange={(e) => setDeleteMod(e.target.value)}
          >
            {moderators.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name} {user.surname} ({user.email})
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <StyledButton sx={{ marginTop: 2 }} variant="outlined">
          Wykonaj
        </StyledButton>
      </DeleteModeratorWrapper>
    </>
  );
};

export default AdminPanel;

const StyledForm = styled.form`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;

  &:not(:nth-of-type(0)) {
    margin-top: 2rem;
  }
`;

const StyledButton = styled(Button)`
  && {
    align-self: baseline;
    font-family: 'Poppins';
    display: block;
    font-size: ${({ theme }) => theme.fontSize.xs};

    @media ${responsive.mobile} {
      font-size: ${({ theme }) => theme.fontSize.s};
    }
  }
`;

const StyledSelect = styled(Select)`
  && {
    width: 150px;

    @media ${responsive.mobileM} {
      width: 200px;
    }
  }
`;

const BlockUserWrapper = styled.div`
  margin-left: 1rem;
  margin-top: 5rem;
`;

const AddModeratorWrapper = styled(BlockUserWrapper)``;

const UnblockUserWrapper = styled(BlockUserWrapper)``;

const DeleteModeratorWrapper = styled(BlockUserWrapper)``;
